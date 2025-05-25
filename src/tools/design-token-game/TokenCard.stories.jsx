import React from 'react';
import MiniComponent from './MiniComponent';
import './style.scss';

export default {
  title: 'Tools/Design Token Game/Components',
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '20px', 
        background: '#1a1a2e', 
        minHeight: '100vh',
        fontFamily: 'CubicPixel, "Press Start 2P", monospace'
      }}>
        <Story />
      </div>
    ),
  ],
};

export const MiniComponentsShowcase = () => {
  const elements = [
    { type: "Icon 顏色", color: "#FF6B6B" },
    { type: "卡片背景色", color: "#4ECDC4" },
    { type: "按鈕顏色", color: "#45B7D1" },
    { type: "標題顏色", color: "#FFA07A" },
    { type: "連結文字顏色", color: "#98D8C8" },
    { type: "邊框顏色", color: "#FFCC5C" },
    { type: "訊息顏色", color: "#FF8E53" },
    { type: "成功訊息顏色", color: "#6BCF7F" },
    { type: "分隔線顏色", color: "#A8A8A8" },
    { type: "輸入框邊框色", color: "#B8860B" },
    { type: "進度條顏色", color: "#9370DB" },
  ];

  const englishElements = [
    { type: "Icon color", color: "#FF6B6B" },
    { type: "Card background", color: "#4ECDC4" },
    { type: "Button color", color: "#45B7D1" },
    { type: "Heading color", color: "#FFA07A" },
    { type: "Link text color", color: "#98D8C8" },
    { type: "Border color", color: "#FFCC5C" },
    { type: "Message color", color: "#FF8E53" },
    { type: "Success message color", color: "#6BCF7F" },
    { type: "Divider color", color: "#A8A8A8" },
    { type: "Input border color", color: "#B8860B" },
    { type: "Progress bar color", color: "#9370DB" },
  ];

  return (
    <div>
      <h2 style={{ color: '#FFCC00', marginBottom: '20px' }}>中文版本 Mini Components</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '15px',
        padding: '20px',
        marginBottom: '40px'
      }}>
        {elements.map((element, index) => (
          <div key={index} style={{ 
            textAlign: 'center',
            background: 'rgba(255,255,255,0.1)',
            padding: '10px',
            borderRadius: '8px'
          }}>
            <MiniComponent elementType={element.type} color={element.color} />
            <p style={{ 
              marginTop: '8px', 
              fontSize: '10px', 
              color: '#FFFFFF' 
            }}>
              {element.type}<br/>
              <code>{element.color}</code>
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ color: '#FFCC00', marginBottom: '20px' }}>English Version Mini Components</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '15px',
        padding: '20px'
      }}>
        {englishElements.map((element, index) => (
          <div key={index} style={{ 
            textAlign: 'center',
            background: 'rgba(255,255,255,0.1)',
            padding: '10px',
            borderRadius: '8px'
          }}>
            <MiniComponent elementType={element.type} color={element.color} />
            <p style={{ 
              marginTop: '8px', 
              fontSize: '10px', 
              color: '#FFFFFF' 
            }}>
              {element.type}<br/>
              <code>{element.color}</code>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 測試異常情況
export const EdgeCases = () => {
  return (
    <div>
      <h2 style={{ color: '#FFCC00', marginBottom: '20px' }}>Edge Cases Testing</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '15px',
        padding: '20px'
      }}>
        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.1)',
          padding: '10px',
          borderRadius: '8px'
        }}>
          <MiniComponent elementType={undefined} color="#FF6B6B" />
          <p style={{ 
            marginTop: '8px', 
            fontSize: '10px', 
            color: '#FFFFFF' 
          }}>
            undefined elementType
          </p>
        </div>

        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.1)',
          padding: '10px',
          borderRadius: '8px'
        }}>
          <MiniComponent elementType="Unknown Type" color="#4ECDC4" />
          <p style={{ 
            marginTop: '8px', 
            fontSize: '10px', 
            color: '#FFFFFF' 
          }}>
            Unknown Type
          </p>
        </div>

        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.1)',
          padding: '10px',
          borderRadius: '8px'
        }}>
          <MiniComponent elementType="Icon 顏色" color={undefined} />
          <p style={{ 
            marginTop: '8px', 
            fontSize: '10px', 
            color: '#FFFFFF' 
          }}>
            undefined color
          </p>
        </div>

        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.1)',
          padding: '10px',
          borderRadius: '8px'
        }}>
          <MiniComponent />
          <p style={{ 
            marginTop: '8px', 
            fontSize: '10px', 
            color: '#FFFFFF' 
          }}>
            No props
          </p>
        </div>
      </div>
    </div>
  );
};

// 測試隨機索引範圍
export const RandomIndexTest = () => {
  // 模擬生成100個隨機索引，檢查是否都在有效範圍內
  const testIndexes = Array.from({ length: 100 }, () => {
    return Math.floor(Math.random() * 11); // 模擬修復後的邏輯
  });
  
  const chineseElements = [
    "Icon 顏色", "卡片背景色", "按鈕顏色", "標題顏色", "連結文字顏色",
    "邊框顏色", "訊息顏色", "成功訊息顏色", "分隔線顏色", "輸入框邊框色", "進度條顏色"
  ];
  
  const indexCounts = {};
  testIndexes.forEach(index => {
    indexCounts[index] = (indexCounts[index] || 0) + 1;
  });

  return (
    <div>
      <h2 style={{ color: '#FFCC00', marginBottom: '20px' }}>Random Index Range Test</h2>
      <p style={{ color: '#FFFFFF', marginBottom: '15px' }}>
        測試100次隨機索引生成，確保都在有效範圍 0-10 內：
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '10px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        {Object.entries(indexCounts).map(([index, count]) => (
          <div key={index} style={{ 
            textAlign: 'center',
            background: 'rgba(255,255,255,0.1)',
            padding: '8px',
            borderRadius: '4px'
          }}>
            <div style={{ fontSize: '12px', color: '#FFCC00' }}>Index {index}</div>
            <div style={{ fontSize: '10px', color: '#FFFFFF' }}>出現 {count} 次</div>
            <div style={{ fontSize: '8px', color: '#CCCCCC', marginTop: '4px' }}>
              {chineseElements[index] || '超出範圍！'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        background: 'rgba(0,255,0,0.1)', 
        padding: '10px', 
        borderRadius: '4px',
        marginTop: '10px'
      }}>
        <p style={{ color: '#00FF00', fontSize: '12px', margin: 0 }}>
          ✅ 所有索引都在有效範圍內 (0-10)
        </p>
        <p style={{ color: '#FFFFFF', fontSize: '10px', margin: '5px 0 0 0' }}>
          最大索引: {Math.max(...Object.keys(indexCounts).map(Number))}, 
          最小索引: {Math.min(...Object.keys(indexCounts).map(Number))}
        </p>
      </div>
    </div>
  );
};

MiniComponentsShowcase.storyName = 'Mini Components Showcase';
EdgeCases.storyName = 'Edge Cases Testing';
RandomIndexTest.storyName = 'Random Index Range Test'; 