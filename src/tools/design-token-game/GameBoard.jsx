import React, { useEffect } from 'react';
import TokenCard from './TokenCard';
import { useGameStore } from './useGameStore';
import './style.scss';

const GameBoard = () => {
  const {
    currentLevelConfig,
    cards,
    gameStatus,
    targetColor,
    loadLevel,
    updateCardColor,
    startGame,
    goToNextLevel,
    updateSystemTokenColor
  } = useGameStore();

  useEffect(() => {
    const unsubscribe = useGameStore.subscribe(
        (state) => console.log("Game state changed:", state.gameStatus, state.cards)
    );
    startGame();
    return unsubscribe;
  }, [startGame]);

  const handleCardClick = (cardId) => {
    if (gameStatus === 'playing') {
      updateCardColor(cardId);
    }
  };
  
  const handleSystemTokenChange = () => {
    if (gameStatus === 'playing' && currentLevelConfig.type === 'system') {
      updateSystemTokenColor();
    }
  };

  if (gameStatus === 'loading' && !currentLevelConfig) {
    return <div>Loading game...</div>;
  }
  
  if (!currentLevelConfig) {
      return <div>Error: Level configuration not found.</div>;
  }

  return (
    <div className="game-board-container">
      <div className="game-info-panel">
        <h2>Design Token Game</h2>
        <div className="info-item">
          <strong>關卡:</strong> {currentLevelConfig.name}
        </div>
        <div className="info-item">
          <strong>類型:</strong> {currentLevelConfig.type === 'reference' ? 'Reference Token' : 'System Token'}
        </div>
        <div className="info-item">
          <strong>目標顏色:</strong>
          <div
            className="color-swatch"
            style={{ backgroundColor: targetColor }}
          />
          ({targetColor})
        </div>
        <div className="info-item">
          <strong>時間限制:</strong> {currentLevelConfig.timeLimit} 秒
        </div>
        <div className="info-item">
          <strong>說明:</strong> {currentLevelConfig.description}
        </div>
        <div className="info-item">
          <strong>狀態:</strong> {gameStatus}
        </div>

        {currentLevelConfig.type === 'system' && gameStatus === 'playing' && (
          <button onClick={handleSystemTokenChange} className="system-token-button">
            將所有卡片變為目標色 ({targetColor})
          </button>
        )}

        {gameStatus === 'levelComplete' && (
            <button onClick={goToNextLevel}>太棒了！下一關</button>
        )}
         {gameStatus === 'allLevelsComplete' && (
            <div>恭喜！你已完成所有關卡！</div>
        )}
      </div>
      <div className="cards-grid-container">
        {cards.map((card) => (
          <TokenCard
            key={card.id}
            id={card.id}
            color={card.currentColor}
            onClick={() => handleCardClick(card.id)}
            locked={card.isMatched && currentLevelConfig.type === 'reference'}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard; 