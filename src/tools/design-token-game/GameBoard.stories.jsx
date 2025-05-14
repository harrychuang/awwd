import React from 'react';
import GameBoard from './GameBoard'; // 引入我們剛剛建立的 GameBoard 組件
import './style.scss'; // 確保樣式被載入

export default {
  title: 'Tools/Design Token Game', // 在 Storybook 中的路徑
};

// 基礎的 Story
const Template = (args) => <GameBoard {...args} />;

export const DesignTokenGame = Template.bind({});