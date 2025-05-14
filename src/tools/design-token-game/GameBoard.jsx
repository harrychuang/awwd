import React, { useEffect, useState } from 'react';
import TokenCard from './TokenCard';
import { useGameStore } from './useGameStore';
import './style.scss';

const GameBoard = () => {
  const {
    currentLevelConfig,
    cards,
    gameStatus,
    targetColor,
    elapsedTime,
    currentLevelIndex,
    startGameSession,
    playLevel,
    proceedToNextOrEnd,
    updateCardColor,
    updateSystemTokenColor
  } = useGameStore();

  const [systemColorInput, setSystemColorInput] = useState('#FFFFFF');
  const [editingCardId, setEditingCardId] = useState(null);

  useEffect(() => {
    if (gameStatus === 'init') {
      startGameSession();
    }
  }, [gameStatus, startGameSession]);

  useEffect(() => {
    if (currentLevelConfig && currentLevelConfig.type === 'system' && 
        (gameStatus === 'playing' || gameStatus === 'loadingFirstLevel')) {
      if (cards.length > 0 && cards[0].initialColor) {
        setSystemColorInput(cards[0].initialColor);
      } else if (currentLevelConfig.colorPalette && currentLevelConfig.colorPalette.length > 0) {
        setSystemColorInput(currentLevelConfig.colorPalette[0]);
      } else {
        setSystemColorInput('#CCCCCC');
      }
    }
    if (gameStatus !== 'playing') {
      setEditingCardId(null);
    }
  }, [currentLevelConfig, cards, gameStatus]);

  const showErrorModal = (message) => {
    alert(message);
  };

  const handleInitialGameStart = () => {
    if (currentLevelConfig && gameStatus === 'loadingFirstLevel') {
      playLevel(currentLevelConfig);
    }
  };
  
  const handleRestartGame = () => {
    startGameSession();
  };

  const handleGoToNextLevel = () => {
    proceedToNextOrEnd();
  };

  const handleCardInteraction = (cardId) => {
    if (currentLevelConfig?.type === 'reference' && gameStatus === 'playing' && !cards.find(c => c.id === cardId)?.isMatched) {
      setEditingCardId(cardId);
    }
  };

  const handleCardColorSubmit = (cardId, enteredColor) => {
    const trimmedColor = enteredColor.trim();
    if (/^#[0-9A-F]{6}$/i.test(trimmedColor) || /^#[0-9A-F]{3}$/i.test(trimmedColor)) {
      updateCardColor(cardId, trimmedColor);
    } else {
      showErrorModal(`提交的色碼 "${enteredColor}" 格式無效。請使用例如 #RRGGBB 或 #RGB 的 16 進位色碼。`);
    }
    setEditingCardId(null);
  };

  const handleSystemColorInputChange = (event) => {
    setSystemColorInput(event.target.value);
  };

  const handleUpdateSystemColor = () => {
    const trimmedSystemColor = systemColorInput.trim();
    if (/^#[0-9A-F]{6}$/i.test(trimmedSystemColor) || /^#[0-9A-F]{3}$/i.test(trimmedSystemColor)) {
      updateSystemTokenColor(trimmedSystemColor);
    } else {
      showErrorModal(`系統 Token 色碼 "${systemColorInput}" 格式無效。請使用例如 #RRGGBB 或 #RGB 的 16 進位色碼。`);
    }
  };

  const formatTime = (milliseconds) => {
    if (typeof milliseconds !== 'number' || isNaN(milliseconds)) return '0.00';
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hundredths = Math.floor((milliseconds % 1000) / 10);
    return `${totalSeconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  if (gameStatus === 'init') {
    return <div className="design-token-game-wrapper"><div className="game-board-container game-board-centered"><p>遊戲準備中...</p></div></div>;
  }
  if (gameStatus === 'error') {
    return (
      <div className="design-token-game-wrapper">
        <div className="game-board-container game-board-centered">
          <p>載入遊戲時發生錯誤！</p>
          <button onClick={handleRestartGame}>重試</button>
        </div>
      </div>
    );
  }

  if (gameStatus === 'loadingFirstLevel' && currentLevelConfig) {
    return (
      <div className="design-token-game-wrapper">
        <div className="game-board-container game-board-centered">
          <h2>{currentLevelConfig.name}</h2>
          <h3 className="level-subtitle">{currentLevelConfig.type === 'reference' ? 'Reference Token' : 'System Token'} 挑戰 - 第 {currentLevelIndex + 1} 關</h3>
          <p className="level-description-ready">{currentLevelConfig.description}</p>
          <button onClick={handleInitialGameStart} className="start-level-button">開始遊戲</button>
        </div>
      </div>
    );
  }
  
  if (currentLevelConfig && (gameStatus === 'playing' || gameStatus === 'levelCompleteScreen')) {
    const isGamePlaying = gameStatus === 'playing';
    const levelTypeDisplay = currentLevelConfig.type === 'reference' ? 'Reference Token' : currentLevelConfig.type === 'system' ? 'System Token' : 'Component Token';

    return (
      <div className="design-token-game-wrapper">
        <>
          <div className="game-board-container">
            <div className="game-info-panel">
              <h2>{currentLevelConfig.name}</h2>
              <h3 className="level-subtitle">{levelTypeDisplay} 挑戰 - 第 {currentLevelIndex + 1} 關</h3>
              <div className="info-item game-timer"><strong>時間:</strong><span className="game-timer-value">{formatTime(elapsedTime)}</span> 秒</div>
              <div className="info-item"><strong>目標顏色:</strong>
                <span className="color-swatch" style={{ backgroundColor: targetColor }}></span> {targetColor}
              </div>
              {isGamePlaying && <div className="info-item"><strong>說明:</strong> {currentLevelConfig.description}</div>}
              
              {gameStatus === 'levelCompleteScreen' && (
                <div className="level-complete-message-inline">
                  <h4>太棒了！關卡 {currentLevelIndex + 1} 完成！</h4>
                  <button onClick={handleGoToNextLevel} className="next-level-button-inline">下一關</button>
                </div>
              )}

              {currentLevelConfig.type === 'system' && isGamePlaying && (
                <div className="system-color-input-area">
                  <p style={{ marginBottom: '15px' }}>System Token 色彩:</p>
                  <input type="text" value={systemColorInput} style={{ width: '100%', padding: '10px 10px' }} onChange={handleSystemColorInputChange} placeholder="#RRGGBB" />
                  <button onClick={handleUpdateSystemColor} className="system-token-button">更新系統顏色</button>
                </div>
              )}
            </div>

            <div className={`cards-grid-container ${!isGamePlaying ? 'cards-locked' : ''}`}>
              {cards.map(card => (
                <TokenCard 
                  key={card.id} 
                  id={card.id} 
                  color={card.currentColor} 
                  locked={!isGamePlaying || (currentLevelConfig.type === 'system') || (editingCardId !== null && editingCardId !== card.id)}
                  isMatched={card.isMatched}
                  onCardClick={handleCardInteraction}
                  isEditing={editingCardId === card.id}
                  onColorSubmit={(enteredColor) => handleCardColorSubmit(card.id, enteredColor)}
                  targetColor={targetColor}
                />
              ))}
            </div>
          </div>
          <div className="game-controls-area">
            {isGamePlaying && <button onClick={handleRestartGame} className="restart-game-button-ingame">放棄並重來</button>}
          </div>
        </>
      </div>
    );
  }

  if (gameStatus === 'allLevelsComplete') {
     return (
        <div className="design-token-game-wrapper">
            <div className="game-board-container game-board-centered">
                <div className="all-levels-complete-message">
                    <h2 style={{ fontSize: '2em' }}>遊戲完成！</h2><br/>
                    <p>太強了！你已完成所有Design Token挑戰！</p><br/>
                    <div className="final-time" style={{ fontSize: '1.5em' }}>總共用時: <span className="game-timer-value" style={{ fontSize: '2em', color: 'yellow' }}>{formatTime(elapsedTime)}</span> 秒</div><br/>
                    <button onClick={handleRestartGame} className="restart-game-button-main" style={{ fontSize: '1.5em' }}>再玩一次</button>
                </div>
            </div>
        </div>
     );
  }
  
  console.log('[DEBUG GameBoard] Fallback render - gameStatus:', gameStatus, 'currentLevelConfig from store:', currentLevelConfig);
  return <div className="design-token-game-wrapper"><div className="game-board-container game-board-centered"><p>載入中或狀態錯誤...</p></div></div>;
};

export default GameBoard; 