import { create } from 'zustand';
import { createLevels } from './types'; // 我們在 types.ts 中定義的關卡

const initialLevels = createLevels();

export const useGameStore = create((set, get) => ({
  // --- STATE ---
  levels: initialLevels,
  currentLevelIndex: 0,
  currentLevelConfig: initialLevels[0],
  cards: [], // TokenCardData[]
  gameStatus: 'loading', // 'loading', 'ready', 'playing', 'levelComplete', 'gameOver'
  timeLeft: 0,
  score: 0,
  targetColor: initialLevels[0].targetColor, // 初始化目標顏色

  // --- ACTIONS ---
  startGame: () => {
    set({ currentLevelIndex: 0, gameStatus: 'loading' });
    get().loadLevel(get().levels[0]);
  },

  loadLevel: (levelConfig) => {
    if (!levelConfig) {
      set({ gameStatus: 'allLevelsComplete' }); // Or some other final state
      return;
    }
    const newCards = Array.from({ length: levelConfig.cardCount }, (_, i) => ({
      id: `card-${levelConfig.id}-${i}`,
      initialColor: levelConfig.colorPalette[i % levelConfig.colorPalette.length],
      currentColor: levelConfig.colorPalette[i % levelConfig.colorPalette.length], // 開始時與初始顏色相同
      isMatched: false,
    }));

    set({
      currentLevelConfig: levelConfig,
      cards: newCards,
      targetColor: levelConfig.targetColor,
      timeLeft: levelConfig.timeLimit,
      gameStatus: 'playing', // 或者 'ready' 然後有個開始按鈕
    });
    // TODO: 啟動計時器
  },

  updateCardColor: (cardId) => {
    const { cards, targetColor, currentLevelConfig } = get();
    if (currentLevelConfig.type === 'reference') {
      set({
        cards: cards.map(card =>
          card.id === cardId ? { ...card, currentColor: targetColor, isMatched: card.currentColor !== targetColor } : card
        ),
      });
      get().checkLevelCompletion();
    }
    // System token logic will be handled by a different action
  },

  // Placeholder for system token update
  updateSystemTokenColor: () => {
    const { cards, targetColor, currentLevelConfig } = get();
    if (currentLevelConfig.type === 'system') {
      set({
        cards: cards.map(card => ({ ...card, currentColor: targetColor, isMatched: true })),
      });
      get().checkLevelCompletion();
    }
  },

  checkLevelCompletion: () => {
    const { cards } = get();
    const allMatched = cards.every(card => card.currentColor === get().targetColor);
    if (allMatched) {
      // TODO: 加分, 進入下一關的邏輯
      set({ gameStatus: 'levelComplete' });
      console.log("Level Complete!");
      // get().goToNextLevel(); // 之後會加入
    }
  },
  
  goToNextLevel: () => {
    const { currentLevelIndex, levels } = get();
    const nextLevelIndex = currentLevelIndex + 1;
    if (nextLevelIndex < levels.length) {
      set({ currentLevelIndex: nextLevelIndex, gameStatus: 'loading' });
      get().loadLevel(levels[nextLevelIndex]);
    } else {
      set({ gameStatus: 'allLevelsComplete' });
      console.log("All levels completed!");
    }
  },

  // TODO: tickTimer, gameOver actions
})); 