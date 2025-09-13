import React, { useState, useMemo, useContext } from 'react';
import MaterialIcon from 'material-icons-react';
// Local
import { DocMain } from '../../doc/DocMain';
import ClipboardCopyContext from '../../doc/ClipboardCopyContext';

import './doc.scss';

export default {
  title: 'Tools/CSS Variables Analyzer',
  parameters: { 
    docs: { 
      page: null,
    },
    options: {
      showPanel: true,
    },
  },
};

// 將 px 轉換為 rem（假設 1rem = 16px）
const pxToRem = (px) => px / 16;

// 將 rem 轉換為 px（假設 1rem = 16px）
const remToPx = (rem) => rem * 16;

// CSS Variables 解析函數
const parseCSSVariables = (cssText) => {
  const variables = {};
  const inheritanceMap = {};
  const numericValues = {};
  
  // 移除註釋並按行分割
  const lines = cssText
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('--'));
  
  // 解析每一行變量
  lines.forEach(line => {
    const match = line.match(/^(--[^:]+):\s*(.+);$/);
    if (match) {
      const varName = match[1].trim();
      const varValue = match[2].trim();
      
      variables[varName] = varValue;
      
      // 檢查是否引用其他變量
      const varMatch = varValue.match(/var\((--[^)]+)\)/);
      if (varMatch) {
        const referencedVar = varMatch[1];
        if (!inheritanceMap[referencedVar]) {
          inheritanceMap[referencedVar] = [];
        }
        inheritanceMap[referencedVar].push(varName);
      } else {
        // 提取數值
        const numMatch = varValue.match(/^(-?\d*\.?\d+)(px|rem|em|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh|rlh|vmin|vmax)?$/);
        if (numMatch) {
          const numValue = parseFloat(numMatch[1]);
          const unit = numMatch[2] || '';
          
          // 將所有 px 和 rem 統一為基礎數值（以 px 為基準）
          let baseValue = numValue;
          let displayKey = `${numValue}${unit}`;
          
          if (unit === 'rem') {
            baseValue = remToPx(numValue);
            const pxDisplay = Number.isInteger(baseValue) ? baseValue : baseValue.toFixed(2);
            displayKey = `${pxDisplay}px / ${numValue}rem`;
          } else if (unit === 'px') {
            const remEquivalent = Math.round(pxToRem(numValue) * 1000) / 1000; // 保留3位小數
            displayKey = `${numValue}px / ${remEquivalent}rem`;
          }
          
          // 使用基礎數值作為 key 來合併 px 和 rem
          const key = unit === 'px' || unit === 'rem' ? `${baseValue}px-rem` : `${numValue}${unit}`;
          
          if (!numericValues[key]) {
            numericValues[key] = {
              baseValue: baseValue,
              displayValue: displayKey,
              unit: unit === 'px' || unit === 'rem' ? 'px/rem' : unit,
              variables: []
            };
          } else {
            // 如果已經存在相同 key，優先顯示 px 格式
            if (unit === 'px' && numericValues[key].unit === 'px/rem') {
              numericValues[key].displayValue = displayKey;
            }
          }
          numericValues[key].variables.push(varName);
        }
      }
    }
  });
  
  return { variables, inheritanceMap, numericValues };
};

// 獲取變量的完整繼承鏈
const getInheritanceChain = (varName, variables, inheritanceMap, visited = new Set()) => {
  if (visited.has(varName)) return []; // 避免循環引用
  visited.add(varName);
  
  const chain = [];
  const value = variables[varName];
  
  if (value) {
    const varMatch = value.match(/var\((--[^)]+)\)/);
    if (varMatch) {
      const referencedVar = varMatch[1];
      chain.push(referencedVar);
      chain.push(...getInheritanceChain(referencedVar, variables, inheritanceMap, visited));
    }
  }
  
  return chain;
};

// 獲取變數的層級（距離最終數值的步數）
const getVariableLevel = (varName, variables, cache = new Map()) => {
  if (cache.has(varName)) return cache.get(varName);
  
  const value = variables[varName];
  if (!value) return 0;
  
  const varMatch = value.match(/var\((--[^)]+)\)/);
  if (!varMatch) {
    // 直接包含數值，是第0層
    cache.set(varName, 0);
    return 0;
  }
  
  const referencedVar = varMatch[1];
  const level = 1 + getVariableLevel(referencedVar, variables, cache);
  cache.set(varName, level);
  return level;
};

// 按層級分組變數
const groupVariablesByLevel = (variables, numericVariables) => {
  const levelGroups = {};
  const maxLevel = Math.max(
    ...Object.keys(variables).map(varName => getVariableLevel(varName, variables))
  );
  
  Object.keys(variables).forEach(varName => {
    const level = getVariableLevel(varName, variables);
    
    // 只有與數值相關的變數才計入統計
    const chain = getInheritanceChain(varName, variables);
    const hasNumericRoot = chain.some(chainVar => 
      numericVariables.includes(chainVar)
    ) || numericVariables.includes(varName);
    
    if (hasNumericRoot) {
      if (!levelGroups[level]) {
        levelGroups[level] = [];
      }
      levelGroups[level].push(varName);
    }
  });
  
  return { levelGroups, maxLevel };
};

const CSSVariablesAnalyzer = () => {
  const clipboardCopy = useContext(ClipboardCopyContext);
  const [cssInput, setCssInput] = useState(`:root {
  /* REF TOKENS */
  --abcd-ref-size-4: 4px;
  --abcd-ref-size-4-rem: 0.25rem;
  --abcd-ref-size-8: 8px;
  --abcd-ref-size-8-rem: 0.5rem;
  --abcd-ref-size-12: 12px;
  --abcd-ref-size-12-rem: 0.75rem;
  --abcd-ref-size-16: 16px;
  --abcd-ref-size-16-rem: 1rem;
  --abcd-ref-size-24: 24px;
  --abcd-ref-size-24-rem: 1.5rem;
  --abcd-ref-size-32: 32px;
  --abcd-ref-size-32-rem: 2rem;
  
  /* SYS TOKENS */
  --abcd-sys-spacing-xs: var(--abcd-ref-size-4);
  --abcd-sys-spacing-sm: var(--abcd-ref-size-8);
  --abcd-sys-spacing-rg: var(--abcd-ref-size-12);
  --abcd-sys-spacing-med: var(--abcd-ref-size-16);
  --abcd-sys-spacing-lg: var(--abcd-ref-size-24);
  --abcd-sys-spacing-xl: var(--abcd-ref-size-32);
  
  /* FONT TOKENS */
  --abcd-sys-font-size-sm: var(--abcd-ref-size-12-rem);
  --abcd-sys-font-size-rg: var(--abcd-ref-size-16-rem);
  --abcd-sys-font-size-lg: var(--abcd-ref-size-24-rem);
  
  /* COMPONENT TOKENS (Third Level) */
  --abcd-comp-button-padding: var(--abcd-sys-spacing-rg);
  --abcd-comp-card-gap: var(--abcd-sys-spacing-lg);
  --abcd-comp-input-padding: var(--abcd-sys-spacing-sm);
  --abcd-comp-modal-padding: var(--abcd-sys-spacing-xl);
  --abcd-comp-text-heading: var(--abcd-sys-font-size-lg);
  --abcd-comp-text-body: var(--abcd-sys-font-size-rg);
  --abcd-comp-text-caption: var(--abcd-sys-font-size-sm);
}`);
  
  const [copiedText, setCopiedText] = useState('');
  const [showCopied, setShowCopied] = useState(false);

  // 解析結果
  const analysisResult = useMemo(() => {
    if (!cssInput.trim()) return null;
    return parseCSSVariables(cssInput);
  }, [cssInput]);

  const handleCopy = (text) => {
    clipboardCopy(text);
    setCopiedText(text);
    setShowCopied(true);
    
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  const clearInput = () => {
    setCssInput('');
  };

  // 獲取數值使用統計（支援多層級）
  const getValueStats = () => {
    if (!analysisResult) return { stats: [], maxLevel: 1 };
    
    const { variables, inheritanceMap, numericValues } = analysisResult;
    const numericVariables = Object.values(numericValues).flatMap(data => data.variables);
    const { levelGroups, maxLevel } = groupVariablesByLevel(variables, numericVariables);
    
    const stats = Object.entries(numericValues)
      .sort((a, b) => {
        // 按基礎數值大小排序
        return a[1].baseValue - b[1].baseValue;
      })
      .map(([valueKey, data]) => {
        const levelUsage = {};
        
        // 為每個層級初始化空數組
        for (let i = 0; i <= maxLevel; i++) {
          levelUsage[i] = [];
        }
        
        // 分析每個變數的層級使用情況
        const processedVars = new Set();
        
        const analyzeVariable = (varName, visited = new Set()) => {
          if (visited.has(varName) || processedVars.has(varName)) return;
          visited.add(varName);
          
          const level = getVariableLevel(varName, variables);
          
          // 檢查這個變數是否與當前數值相關
          const chain = getInheritanceChain(varName, variables);
          const isRelated = data.variables.includes(varName) || 
                           chain.some(chainVar => data.variables.includes(chainVar));
          
          if (isRelated) {
            levelUsage[level].push(varName);
            processedVars.add(varName);
            
            // 分析繼承這個變數的其他變數
            if (inheritanceMap[varName]) {
              inheritanceMap[varName].forEach(childVar => {
                analyzeVariable(childVar, new Set(visited));
              });
            }
          }
        };
        
        // 從直接使用數值的變數開始分析
        data.variables.forEach(varName => {
          analyzeVariable(varName);
        });
        
        // 計算總使用次數
        const totalUsage = Object.values(levelUsage).reduce((sum, vars) => sum + vars.length, 0);
        
        return {
          value: data.displayValue,
          baseValue: data.baseValue,
          unit: data.unit,
          levelUsage,
          totalUsage
        };
      });
    
    return { stats, maxLevel };
  };

  const valueStatsResult = getValueStats();
  const { stats: valueStats, maxLevel } = valueStatsResult;

  // 生成表格標題
  const generateTableHeaders = () => {
    const headers = ['數值'];
    
    for (let i = 0; i <= maxLevel; i++) {
      if (i === 0) {
        headers.push('第1層使用 (REF)');
      } else if (i === 1) {
        headers.push('第2層使用 (SYS)');
      } else if (i === 2) {
        headers.push('第3層使用 (COMP)');
      } else {
        headers.push(`第${i + 1}層使用`);
      }
    }
    
    headers.push('使用次數');
    return headers;
  };

  // 生成變數標籤的樣式類別
  const getVariableTagClass = (level) => {
    if (level === 0) return 'direct'; // REF tokens
    if (level === 1) return 'indirect'; // SYS tokens  
    return 'tertiary'; // COMP tokens 或更高層級
  };

  // 導出 CSV 功能
  const downloadCSV = () => {
    if (!valueStats.length) return;
    
    // 建立 CSV 標題
    const headers = generateTableHeaders();
    const csvContent = [
      headers.join(','),
      ...valueStats.map(stat => {
        const row = [stat.value];
        
        // 添加每個層級的變數（用分號分隔同層級內的變數）
        for (let level = 0; level <= maxLevel; level++) {
          const variables = (stat.levelUsage[level] || []).join('; ');
          row.push(`"${variables}"`);
        }
        
        row.push(stat.totalUsage);
        return row.join(',');
      })
    ].join('\n');
    
    // 添加 BOM 以確保中文正確顯示
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 創建下載連結
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `css-variables-analysis-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="css-variables-analyzer">
      <div className="input-section">
        <div className="input-controls">
          <h3 className="sbdocs-h3">CSS Variables 輸入</h3>
          <div className="button-group">
            <button 
              className="clear-button"
              onClick={clearInput}
              title="清空輸入"
            >
              <MaterialIcon icon="clear" />
              清空
            </button>
          </div>
        </div>
        
        <textarea
          className="css-input"
          value={cssInput}
          onChange={(e) => setCssInput(e.target.value)}
          placeholder="請貼上你的 CSS Variables..."
          rows={12}
        />
      </div>

      {analysisResult && (
        <div className="analysis-results">          
          {valueStats.length === 0 ? (
            <div className="no-results">
              <p>未找到數值類型的 CSS Variables</p>
            </div>
          ) : (
            <>
              <div className="table-actions">
                <div className="action-group">
                  <h3>數值使用分析表</h3>
                  <button 
                    className="download-button"
                    onClick={downloadCSV}
                    title="下載 CSV 檔案"
                  >
                    <MaterialIcon icon="file_download" />
                    下載報表
                  </button>
                </div>
              </div>
              
              <div className="value-stats-table">
              <table>
                <thead>
                  <tr>
                    {generateTableHeaders().map((header, index) => (
                      <th key={index} className={index === generateTableHeaders().length - 1 ? '' : ''}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {valueStats.map((stat, index) => (
                    <tr key={index} className="value-row">
                      <td className="value-cell">
                        <span 
                          className="value-display"
                          onClick={() => handleCopy(stat.value)}
                          title={`點擊複製: ${stat.value}`}
                        >
                          {stat.value}
                        </span>
                      </td>
                      
                      {/* 動態生成每個層級的使用情況 */}
                      {Array.from({ length: maxLevel + 1 }, (_, level) => (
                        <td key={level} className="usage-cell">
                          <div className="variable-list">
                            {(stat.levelUsage[level] || []).map((varName, idx) => (
                              <span 
                                key={idx} 
                                className={`variable-tag ${getVariableTagClass(level)}`}
                                onClick={() => handleCopy(varName)}
                                title={`點擊複製: ${varName} (第${level + 1}層)`}
                              >
                                {varName}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                      
                      <td className="total-cell">
                        <strong>{stat.totalUsage}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
          )}

        </div>
      )}
      
      {showCopied && (
        <div className="copied-notification">
          已複製: {copiedText}
        </div>
      )}
    </div>
  );
};

const Template = () => (
  <DocMain>
    <h1 className='sbdocs-h1'>CSS Variables Analyzer</h1>
    <p>
      分析 CSS Variables 中的數值使用情況。這個工具可以幫助你：
    </p>
    <ul>
      <li>快速了解設計系統中各個數值的使用頻率</li>
      <li>查看哪些變量直接使用特定數值，哪些變量間接引用</li>
      <li>識別可能需要整合或簡化的數值</li>
      <li>優化設計 token 的結構</li>
    </ul>
    
    <h2 className='sbdocs-h2'>使用方法</h2>
    <ol>
      <li>將你的 CSS Variables 代碼貼到輸入框中</li>
      <li>工具會自動解析並顯示數值使用統計</li>
      <li>點擊任何變量名稱可以快速複製</li>
      <li>查看直接使用和間接引用的變量分布</li>
    </ol>
    
    <h2 className='sbdocs-h2'>分析工具</h2>
    <CSSVariablesAnalyzer />
  </DocMain>
);

export const Default = Template.bind({});
Default.storyName = 'CSS Variables Analyzer';
