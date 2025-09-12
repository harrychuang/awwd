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

  // 獲取數值使用統計
  const getValueStats = () => {
    if (!analysisResult) return [];
    
    const { variables, inheritanceMap, numericValues } = analysisResult;
    
    return Object.entries(numericValues)
      .sort((a, b) => {
        // 按基礎數值大小排序
        return a[1].baseValue - b[1].baseValue;
      })
      .map(([valueKey, data]) => {
        const directUsage = data.variables;
        const indirectUsage = [];
        
        // 查找間接使用（繼承關係）
        directUsage.forEach(varName => {
          if (inheritanceMap[varName]) {
            indirectUsage.push(...inheritanceMap[varName]);
          }
        });
        
        return {
          value: data.displayValue,
          baseValue: data.baseValue,
          unit: data.unit,
          directUsage,
          indirectUsage: [...new Set(indirectUsage)], // 去重
          totalUsage: directUsage.length + [...new Set(indirectUsage)].length
        };
      });
  };

  const valueStats = getValueStats();

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
            <div className="value-stats-table">
              <table>
                <thead>
                  <tr>
                    <th>數值</th>
                    <th>第1層使用</th>
                    <th>第2層使用 (繼承)</th>
                    <th>使用次數</th>
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
                      <td className="usage-cell">
                        <div className="variable-list">
                          {stat.directUsage.map((varName, idx) => (
                            <span 
                              key={idx} 
                              className="variable-tag direct"
                              onClick={() => handleCopy(varName)}
                              title={`點擊複製: ${varName}`}
                            >
                              {varName}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="usage-cell">
                        <div className="variable-list">
                          {stat.indirectUsage.map((varName, idx) => (
                            <span 
                              key={idx} 
                              className="variable-tag indirect"
                              onClick={() => handleCopy(varName)}
                              title={`點擊複製: ${varName}`}
                            >
                              {varName}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="total-cell">
                        <strong>{stat.totalUsage}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
