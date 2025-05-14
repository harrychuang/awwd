import { create } from 'zustand';
import { createLevels } from './types'; // 我們在 types.ts 中定義的關卡

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
    if (get().timerIntervalId) return; // Already running
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
    const { cards, gameStatus } = get();
    if (gameStatus !== 'playing') return;

    const allMatched = cards.every(card => card.isMatched);
    if (allMatched && cards.length > 0) {
      get().stopTimer(); // Pause the timer
      set({ gameStatus: 'levelCompleteScreen' }); 
      console.log("[DEBUG store] checkLevelCompletion - gameStatus: levelCompleteScreen, completed index:", get().currentLevelIndex);
    }
  },
  
  // Called after 'levelTransition' to move to the next level or end the game
  proceedToNextOrEnd: () => {
    const { currentLevelIndex, levels } = get(); // This currentLevelIndex is the one that was just completed.
    const nextLevelIndex = currentLevelIndex + 1;
    console.log(`[DEBUG store] proceedToNextOrEnd - currentLevelIndex (completed): ${currentLevelIndex}, calculated nextLevelIndex: ${nextLevelIndex}`);

    if (nextLevelIndex < levels.length) {
      const nextLevelConfig = levels[nextLevelIndex];
      console.log('[DEBUG store] proceedToNextOrEnd - Setting currentLevelIndex to:', nextLevelIndex, 'and preparing for next level cfg:', nextLevelConfig);
      
      set({ currentLevelIndex: nextLevelIndex }); // Set the index for the level that is ABOUT to be played
      
      get().playLevel(nextLevelConfig); 
    } else {
      get().stopTimer(); // Ensure timer is stopped for allLevelsComplete
      set({ gameStatus: 'allLevelsComplete' });
      console.log("[DEBUG store] proceedToNextOrEnd - gameStatus: allLevelsComplete");
    }
  },
})); 