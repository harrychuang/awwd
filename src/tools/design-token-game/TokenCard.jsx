import React from 'react';
import './style.scss'; // 共用 GameBoard 的樣式檔案

// 根據您的需求，Framer Motion 可以在之後加入以實現動畫效果
// import { motion } from "framer-motion";

const TokenCard = ({ id, color, onClick, locked }) => {
  // locked 屬性之後可以用來禁用已匹配或在 System 模式下不應單獨點擊的卡牌
  return (
    <button
      className="token-card"
      style={{ backgroundColor: color }}
      onClick={() => onClick(id)}
      disabled={locked}
      // Framer Motion 範例:
      // whileTap={{ scale: 0.95 }}
    >
      {/* 可以考慮顯示卡牌ID或顏色值，但目前保持簡潔 */}
    </button>
  );
};

export default TokenCard; 