import React, { useState, useEffect, useRef } from 'react';
import './style.scss'; // 共用 GameBoard 的樣式檔案

// 根據您的需求，Framer Motion 可以在之後加入以實現動畫效果
// import { motion } from "framer-motion";

const TokenCard = ({ 
  id, 
  color, 
  onCardClick, 
  locked, 
  isMatched, 
  isEditing, 
  onColorSubmit,
  targetColor // For default input value
}) => {
  const [inputValue, setInputValue] = useState(color);
  const [hasAnimated, setHasAnimated] = useState(false);
  const inputRef = useRef(null); // To focus the input when it appears
  const cardRef = useRef(null); // Reference to the card element for animation

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

  // 添加匹配成功時的動畫效果
  useEffect(() => {
    if (isMatched && !hasAnimated && cardRef.current) {
      cardRef.current.classList.add('bounce-animation');
      setHasAnimated(true);
      
      // 動畫結束後移除動畫類別
      const timeoutId = setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.classList.remove('bounce-animation');
        }
      }, 1000); // 動畫持續時間
      
      return () => clearTimeout(timeoutId);
    }
  }, [isMatched, hasAnimated]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (isEditing) { // Only submit if it was in editing mode
        onColorSubmit(inputValue);
        // No need to set isEditing to false here, GameBoard will handle it via editingCardId
    }
  };

  const handleKeyDown = (event) => {
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
  };

  if (isEditing) {
    return (
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
    );
  }

  return (
    <button
      ref={cardRef}
      className={`token-card ${isMatched ? 'matched' : ''} ${isEditing ? 'editing' : ''}`}
      style={{ backgroundColor: !isEditing ? color : 'transparent' }} // Hide card color if editing
      onClick={() => onCardClick(id)}
      disabled={locked || isMatched || isEditing} // Also disable click if currently editing this card
    >
      {/* Content of the button, maybe show color hex if not editing? */}
      {!isEditing && (
        // Optional: Display the color hex value on the card if not editing
        // <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>{color}</span>
        null
      )}
    </button>
  );
};

export default TokenCard; 