import React from 'react';
import './style.scss';

const MiniComponent = ({ elementType, color }) => {
  // 防禦性編程：確保 elementType 和 color 有默認值
  const safeElementType = elementType || '';
  const safeColor = color || '#CCCCCC';

  // 根據元素類型選擇對應的元件
  const renderMiniComponent = () => {
    switch (safeElementType) {
      case "Icon 顏色":
      case "Icon color":
        return (
          <div className="mini-icon" style={{ color: safeColor }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );
        
      case "卡片背景色":
      case "Card background":
        return (
          <div className="mini-card" style={{ backgroundColor: safeColor }}>
            <div className="mini-card-content">
              {safeElementType.includes('Card') ? 'Card' : '卡'}
            </div>
          </div>
        );
        
      case "按鈕顏色":
      case "Button color":
        return (
          <button className="mini-button" style={{ backgroundColor: safeColor }}>
            {safeElementType.includes('Button') ? 'Btn' : '按鈕'}
          </button>
        );
        
      case "標題顏色":
      case "Heading color":
        return (
          <h3 className="mini-heading" style={{ color: safeColor }}>
            {safeElementType.includes('Heading') ? 'H1' : '標題'}
          </h3>
        );
        
      case "連結文字顏色":
      case "Link text color":
        return (
          <a href="#" className="mini-link" style={{ color: safeColor }}>
            {safeElementType.includes('Link') ? 'Link' : '連結'}
          </a>
        );
        
      case "邊框顏色":
      case "Border color":
        return (
          <div className="mini-border-box" style={{ borderColor: safeColor }}>
            {safeElementType.includes('Border') ? 'Box' : '邊框'}
          </div>
        );
        
      case "訊息顏色":
      case "Message color":
        return (
          <div className="mini-message" style={{ color: safeColor }}>
            {safeElementType.includes('Message') ? 'Msg' : '訊息'}
          </div>
        );
        
      case "成功訊息顏色":
      case "Success message color":
        return (
          <div className="mini-success" style={{ color: safeColor }}>
            {safeElementType.includes('Success') ? '✓ OK' : '✓ 成功'}
          </div>
        );
        
      case "分隔線顏色":
      case "Divider color":
        return (
          <div className="mini-divider-container">
            <hr className="mini-divider" style={{ borderColor: safeColor }} />
          </div>
        );
        
      case "輸入框邊框色":
      case "Input border color":
        return (
          <input 
            className="mini-input" 
            style={{ borderColor: safeColor }} 
            placeholder={safeElementType.includes('Input') ? 'Input' : '輸入'}
            readOnly
          />
        );
        
      case "進度條顏色":
      case "Progress bar color":
        return (
          <div className="mini-progress-container">
            <div className="mini-progress-bar" style={{ backgroundColor: safeColor }}></div>
          </div>
        );
        
      default:
        return (
          <div className="mini-default" style={{ backgroundColor: safeColor }}>
            {safeElementType.includes('color') || safeElementType.includes('background') ? 'UI' : '元件'}
          </div>
        );
    }
  };

  return (
    <div className="mini-component-wrapper">
      {renderMiniComponent()}
    </div>
  );
};

export default MiniComponent; 