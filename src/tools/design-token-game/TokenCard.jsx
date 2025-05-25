import React, { useState, useEffect, useRef, forwardRef, useCallback } from 'react';
import './style.scss'; // 共用 GameBoard 的樣式檔案
import { useGameStore } from './useGameStore'; // 導入 useGameStore 以取得當前語言與翻譯功能
import MiniComponent from './MiniComponent'; // 導入迷你元件

// 根據您的需求，Framer Motion 可以在之後加入以實現動畫效果
// import { motion } from "framer-motion";

const TokenCard = forwardRef(({ 
  id, 
  color, 
  onCardClick, 
  locked, 
  isMatched, 
  isEditing, 
  onColorSubmit,
  targetColor, // For default input value
  animationDelay = 0 // 新增動畫延遲參數，默認為0
}, ref) => {
  const { language, t } = useGameStore(); // 取得當前語言與翻譯功能
  
  // 動態獲取設計元素數量並生成隨機索引
  const getRandomCommentIndex = useCallback(() => {
    const designElements = t('designElements');
    if (Array.isArray(designElements) && designElements.length > 0) {
      return Math.floor(Math.random() * designElements.length);
    }
    return 0; // 如果沒有元素，返回0作為默認值
  }, [t]);
  
  const [inputValue, setInputValue] = useState(color);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [elementCommentIndex] = useState(() => getRandomCommentIndex()); // 使用函數初始化
  const inputRef = useRef(null); // To focus the input when it appears
  const cardRef = useRef(null); // Reference to the card element for animation
  const timeoutRef = useRef(null); // 用於存儲timeout ID以便在組件卸載時清理

  // 組件卸載時清理timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // When isEditing becomes true, update inputValue to current card color and focus the input
  useEffect(() => {
    if (isEditing) {
      setInputValue(color); // Or use targetColor as default: setInputValue(targetColor) or an empty string
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select(); // Select the text for easy replacement
      }
    }
  }, [isEditing, color, targetColor]);

  // 添加匹配成功時的動畫效果，加入延遲
  useEffect(() => {
    if (isMatched && !hasAnimated && cardRef.current) {
      // 清理先前的timeout（如果有）
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // 使用延遲時間
      timeoutRef.current = setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.classList.add('bounce-animation');
          setHasAnimated(true);
          
          // 動畫結束後移除動畫類別
          const cleanupTimeoutId = setTimeout(() => {
            if (cardRef.current) {
              cardRef.current.classList.remove('bounce-animation');
            }
            // 在內部清理此timeout
            timeoutRef.current = null;
          }, 1000); // 動畫持續時間
          
          // 保存最新的timeout ID供清理
          timeoutRef.current = cleanupTimeoutId;
        }
      }, animationDelay); // 使用傳入的延遲時間
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isMatched, hasAnimated, animationDelay]);

  const handleChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (isEditing) { // Only submit if it was in editing mode
        onColorSubmit(inputValue);
        // No need to set isEditing to false here, GameBoard will handle it via editingCardId
    }
  }, [isEditing, inputValue, onColorSubmit]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
    if (event.key === 'Escape') {
        // Optionally, revert inputValue to original color and then submit/blur
        // For now, just submit current value which will then clear editing state in GameBoard
        // Or, we can have a separate onCancelEdit prop if needed.
        setInputValue(color); // Revert to original color before blur/submit
        handleSubmit(); // Or directly call a cancel function if GameBoard handles it
    }
  }, [color, handleSubmit]);

  // 將DOM引用傳遞到外部
  React.useImperativeHandle(ref, () => cardRef.current);

  // 使用當前語言取得對應的設計元素註解文字
  const designElements = t('designElements');
  const elementComment = Array.isArray(designElements) && designElements[elementCommentIndex] 
    ? designElements[elementCommentIndex] 
    : designElements?.[0] || '預設元件'; // 提供備用值

  return (
    <div className="token-card-container">
      {/* 迷你元件預覽 */}
      <MiniComponent elementType={elementComment} color={color} />
      
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleSubmit} // Submit when input loses focus
          onKeyDown={handleKeyDown} // Submit on Enter, potentially cancel on Escape
          className="token-card-input"
          // Apply some basic styling to make it look like it's part of the card
          // These styles would ideally be in style.scss for better management
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            textAlign: 'center',
            backgroundColor: '#fff', // Or a light color suitable for input
            color: '#333',
            fontSize: '12px', // Adjust as needed
            boxSizing: 'border-box',
            fontFamily: 'inherit' // Inherit 8-bit font if set on parent
          }}
          placeholder={targetColor}
        />
      ) : (
        <button
          ref={cardRef}
          id={id}
          className={`token-card ${isMatched ? 'matched' : ''} ${isEditing ? 'editing' : ''}`}
          style={{ backgroundColor: !isEditing ? color : 'transparent' }} // Hide card color if editing
          onClick={() => onCardClick(id)}
          disabled={locked || isMatched || isEditing} // Also disable click if currently editing this card
        >
          {/* 在卡片上顯示隨機設計元素註解 */}
          <div className="element-comment">
            {elementComment}
          </div>
        </button>
      )}
    </div>
  );
});

// 添加展示名稱，方便除錯
TokenCard.displayName = 'TokenCard';

export default TokenCard; 