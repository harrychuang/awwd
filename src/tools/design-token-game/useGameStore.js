import { create } from 'zustand';
import { createLevels } from './types'; // 我們在 types.ts 中定義的關卡
import translations from './i18n'; // 導入語言文件

// 檢測瀏覽器默認語言
const getBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('zh') ? 'zh' : 'en';
};

const initialLevels = createLevels();
const TIMER_INTERVAL = 10; // milliseconds

export const useGameStore = create((set, get) => ({
  // --- STATE ---
  levels: initialLevels,
  currentLevelIndex: 0,
  currentLevelConfig: null, // Will be set by playLevel
  cards: [],
  // 'init': Before game session starts
  // 'loadingFirstLevel': Preparing the very first level (shows initial screen in GameBoard)
  // 'playing': Actively in a level, timer running
  // 'levelCompleteScreen': Level finished, timer paused, showing completion message & next button
  // 'allLevelsComplete': All levels finished, timer stopped
  // 'error': Error state
  gameStatus: 'init', 
  elapsedTime: 0, // Stores total milliseconds for the entire game session
  score: 0, // Score might be less relevant now, or based on total time
  targetColor: '#FFFFFF',
  timerIntervalId: null,
  language: getBrowserLanguage(), // 初始語言，根據瀏覽器設定
  
  // 獲取當前語言的翻譯文本
  t: (key, params = {}) => {
    const { language } = get();
    let text = translations[language]?.[key] || key;
    
    // 如果有參數，替換掉文本中的佔位符
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
  },
  
  // 切換語言
  toggleLanguage: () => {
    const { language } = get();
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    set({ language: newLanguage });
  },

  // --- ACTIONS ---
  stopTimer: () => {
    const { timerIntervalId } = get();
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      set({ timerIntervalId: null });
      console.log("[DEBUG store] Timer stopped");
    }
  },

  startTimer: () => {
    // 先確保先前的計時器已停止，防止重複計時器
    get().stopTimer();
    
    const intervalId = setInterval(() => {
      set((state) => ({ elapsedTime: state.elapsedTime + TIMER_INTERVAL }));
    }, TIMER_INTERVAL);
    set({ timerIntervalId: intervalId });
    console.log("[DEBUG store] Timer started/resumed");
  },

  // Called when the user clicks the very first "Start Game" button
  startGameSession: () => {
    get().stopTimer(); // Ensure any previous timer is stopped
    const firstLevelConfig = initialLevels[0];
    set({
      currentLevelIndex: 0,
      score: 0,
      elapsedTime: 0, 
      currentLevelConfig: firstLevelConfig, 
      gameStatus: 'loadingFirstLevel',
      cards: [],
      timerIntervalId: null, // Ensure timer is null at the very start
    });
    console.log("[DEBUG store] startGameSession - gameStatus: loadingFirstLevel, currentLevelIndex: 0");
  },

  // Called to load cards, set target, and START/RESUME timer for a level
  playLevel: (levelConfigToPlay) => {
    if (!levelConfigToPlay) {
      console.error("[DEBUG store] playLevel called with no levelConfig!");
      set({ gameStatus: 'error' });
      return;
    }
    console.log("[DEBUG store] playLevel - Config:", levelConfigToPlay, "Playing for index:", get().currentLevelIndex);
    
    // 確保在新一輪開始前停止任何現有計時器
    get().stopTimer();
    // 然後重新啟動計時器
    get().startTimer(); // Start or resume timer

    const newCards = Array.from({ length: levelConfigToPlay.cardCount }, (_, i) => {
      const initialColor =
        levelConfigToPlay.colorPalette && levelConfigToPlay.colorPalette.length > 0
          ? levelConfigToPlay.colorPalette[i % levelConfigToPlay.colorPalette.length]
          : '#CCCCCC';
      return {
        id: `card-${levelConfigToPlay.id}-${i}`,
        initialColor: initialColor,
        currentColor: initialColor,
        isMatched: false,
      };
    });

    set({
      currentLevelConfig: levelConfigToPlay, 
      cards: newCards,
      targetColor: levelConfigToPlay.targetColor,
      gameStatus: 'playing',
    });
    console.log("[DEBUG store] playLevel - gameStatus: playing");
  },

  updateCardColor: (cardId, newColor) => {
    set((state) => ({
      cards: state.cards.map((card) => {
        if (card.id === cardId) {
          return { ...card, currentColor: newColor, isMatched: newColor.toLowerCase() === state.targetColor.toLowerCase() };
        }
        return card;
      }),
    }));
    get().checkLevelCompletion();
  },

  updateSystemTokenColor: (newColor) => {
    set((state) => ({
      cards: state.cards.map((card) => ({
        ...card,
        currentColor: newColor,
        isMatched: newColor.toLowerCase() === state.targetColor.toLowerCase(),
      })),
    }));
    get().checkLevelCompletion();
  },

  checkLevelCompletion: () => {
    const { cards, gameStatus, currentLevelConfig } = get();
    if (gameStatus !== 'playing') return;

    const allMatched = cards.every(card => card.isMatched);
    if (allMatched && cards.length > 0) {
      // 確保停止計時器，避免繼續計時
      get().stopTimer(); // Pause the timer
      
      // 保存當前狀態以防止timeouts在狀態變更時被意外執行
      const currentGameStatus = get().gameStatus;
      const currentLevelConfigLocal = currentLevelConfig;

      // 如果是系統令牌關卡，提供更長時間以顯示序列動畫
      const isSystemLevel = currentLevelConfigLocal?.type === 'system';
      // 計算序列動畫總時間 = 卡片數量 * 每卡片延遲(100ms) + 基本動畫時間(1000ms)
      const sequentialAnimationTime = isSystemLevel ? (cards.length * 100) + 1000 : 800;
      
      // 添加延遲，讓卡片動畫有時間顯示
      setTimeout(() => {
        // 再次檢查狀態是否已改變，如果改變則不執行後續操作
        if (get().gameStatus === currentGameStatus) {
          set({ gameStatus: 'levelCompleteScreen' });
          console.log("[DEBUG store] checkLevelCompletion - gameStatus: levelCompleteScreen, completed index:", get().currentLevelIndex);
        }
      }, sequentialAnimationTime); // 根據關卡類型和卡片數量調整延遲時間
    }
  },
  
  // Called after 'levelTransition' to move to the next level or end the game
  proceedToNextOrEnd: () => {
    const { currentLevelIndex, levels } = get(); // This currentLevelIndex is the one that was just completed.
    const nextLevelIndex = currentLevelIndex + 1;
    console.log(`[DEBUG store] proceedToNextOrEnd - currentLevelIndex (completed): ${currentLevelIndex}, calculated nextLevelIndex: ${nextLevelIndex}`);

    // 不管下一步是什麼，確保先停止計時器
    get().stopTimer();

    if (nextLevelIndex < levels.length) {
      const nextLevelConfig = levels[nextLevelIndex];
      console.log('[DEBUG store] proceedToNextOrEnd - Setting currentLevelIndex to:', nextLevelIndex, 'and preparing for next level cfg:', nextLevelConfig);
      
      set({ currentLevelIndex: nextLevelIndex }); // Set the index for the level that is ABOUT to be played
      
      get().playLevel(nextLevelConfig); 
    } else {
      // 最後一關結束，確保停止計時器
      get().stopTimer(); // Ensure timer is stopped for allLevelsComplete
      set({ gameStatus: 'allLevelsComplete' });
      console.log("[DEBUG store] proceedToNextOrEnd - gameStatus: allLevelsComplete");
    }
  },
})); 