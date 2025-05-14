import React from 'react';
import GameBoard from './GameBoard'; // 引入我們剛剛建立的 GameBoard 組件
import './style.scss'; // 確保樣式被載入

export default {
  title: 'Tools/Design Token Game/GameBoard', // 在 Storybook 中的路徑
  component: GameBoard,
  // 可以加入 parameters 或 args (如果 GameBoard 需要 props 的話)
};

// 基礎的 Story
const Template = (args) => <GameBoard {...args} />;

export const DefaultGameBoard = Template.bind({});
DefaultGameBoard.storyName = 'Default Game Board';
// 如果 GameBoard 有 props，可以在這裡設定預設值
// DefaultGameBoard.args = {
//   someProp: 'someValue',
// }; 