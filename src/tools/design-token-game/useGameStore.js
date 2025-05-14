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
  // 'init': Before anything, show start button for game
  // 'playing': Actively in a level, timer running
  // 'levelTransition': Briefly after a level is complete, before next one starts automatically
  // 'allLevelsComplete': All levels finished, show total time
  // 'error': Error state
  gameStatus: 'init', 
  elapsedTime: 0, // Stores total milliseconds for the entire game session
  elapsedTimeAtLevelStart: 0,
  lastLevelTimeTaken: 0,
  score: 0, // Score might be less relevant now, or based on total time
  targetColor: '#FFFFFF',
  timerIntervalId: null,

  // --- ACTIONS ---
  stopTimer: () => {
    const { timerIntervalId } = get();
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      set({ timerIntervalId: null });
    }
  },

  // Called when the user clicks the very first "Start Game" button
  startGameSession: () => {
    get().stopTimer(); // Ensure any previous timer is stopped
    const firstLevelConfig = initialLevels[0];
    set({
      currentLevelIndex: 0,
      score: 0,
      elapsedTime: 0,
      elapsedTimeAtLevelStart: 0,
      lastLevelTimeTaken: 0,
      // currentLevelConfig will be set by playLevel, but we can prepare it for loadingFirstLevel display
      currentLevelConfig: firstLevelConfig, 
      gameStatus: 'loadingFirstLevel',
      cards: [],
    });
    // playLevel will be called from GameBoard after this, or we can call it here.
    // For consistency with goToNextLevel, let's have it called from GameBoard or an effect.
  },

  // Called to load cards, set target, and START/RESUME timer for a level
  playLevel: (levelConfigToPlay) => {
    if (!levelConfigToPlay) {
      console.error("playLevel called with no levelConfig!");
      set({ gameStatus: 'error' });
      return;
    }
    console.log("[DEBUG store] playLevel - Setting currentLevelConfig to:", levelConfigToPlay);
    set({ elapsedTimeAtLevelStart: get().elapsedTime });

    // Timer is only stopped if it's a full game restart or all levels complete.
    // If timerIntervalId is null (e.g. first level, or after a full stop), start it.
    if (!get().timerIntervalId) {
        const intervalId = setInterval(() => {
            set((state) => ({ elapsedTime: state.elapsedTime + TIMER_INTERVAL }));
        }, TIMER_INTERVAL);
        set({ timerIntervalId: intervalId });
    }

    const newCards = Array.from({ length: levelConfigToPlay.cardCount }, (_, i) => {
      const initialColor = levelConfigToPlay.colorPalette && levelConfigToPlay.colorPalette.length > 0
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
      currentLevelConfig: levelConfigToPlay, // Crucially set currentLevelConfig here
      cards: newCards,
      targetColor: levelConfigToPlay.targetColor,
      gameStatus: 'playing',
      // elapsedTime continues, not reset here
    });
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
    const { cards, gameStatus, elapsedTime, elapsedTimeAtLevelStart } = get();
    if (gameStatus !== 'playing') return;

    const allMatched = cards.every(card => card.isMatched);
    if (allMatched && cards.length > 0) {
      const timeForLevel = elapsedTime - elapsedTimeAtLevelStart;
      set({
        lastLevelTimeTaken: timeForLevel,
        gameStatus: 'levelCompleteModal',
      });
    }
  },
  
  // Called after 'levelTransition' to move to the next level or end the game
  proceedToNextOrEnd: () => {
    const { currentLevelIndex, levels } = get();
    const nextLevelIndex = currentLevelIndex + 1;

    if (nextLevelIndex < levels.length) {
      const nextLevelConfig = levels[nextLevelIndex];
      console.log('[DEBUG store] proceedToNextOrEnd - Preparing nextLevelConfig:', nextLevelConfig, 'nextLevelIndex:', nextLevelIndex);
      set({
        currentLevelIndex: nextLevelIndex,
        // DO NOT set currentLevelConfig here. It will be set by playLevel.
        // currentLevelConfig: null, // Explicitly ensure it's not stale if necessary, or just remove
        gameStatus: 'loadingNextLevel',
        cards: [],
      });
      return nextLevelConfig; // Return the config for GameBoard to use
    } else {
      get().stopTimer(); // All levels are complete, now stop the timer
      set({ gameStatus: 'allLevelsComplete' });
      return null; // No next level
    }
  },
})); 