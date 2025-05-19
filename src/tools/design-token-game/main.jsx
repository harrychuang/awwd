import React from 'react';
import { createRoot } from 'react-dom/client';
import GameBoard from './GameBoard';
import './style.scss';

// 導入圖標資源，這樣 Vite 會複製它們到 dist 目錄
// 注意：logo.png 可能不在 imgs 目錄，這裡先不導入
import diamondImg from './imgs/diamond-icon.png';
import grassImg from './imgs/grass-icon.png';
import heartImg from './imgs/heart-icon.png';
import swordImg from './imgs/sword-icon.png';
import magicianImg from './imgs/magician-icon.png';

// 設置圖標路徑
const fixIconPaths = () => {
  // 在開發環境中 Vite 會將上面導入的圖片作為 URL 處理
  // 在生產環境中我們使用相對路徑
  window.gameIcons = {
    magician: magicianImg,
    diamond: diamondImg,
    heart: heartImg,
    sword: swordImg,
    grass: grassImg,
    // logo 使用相對路徑，因為我們沒有直接導入它
    logo: './logo.png'
  };
};

// 初始化應用
const initApp = () => {
  fixIconPaths();
  
  const container = document.getElementById('root');
  if (!container) {
    console.error('Root container not found!');
    return;
  }
  
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <GameBoard />
    </React.StrictMode>
  );
};

// 啟動應用
initApp(); 