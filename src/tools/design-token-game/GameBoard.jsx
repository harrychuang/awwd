import React, { useEffect, useState } from 'react';
import TokenCard from './TokenCard';
import { useGameStore } from './useGameStore';
import { Modal } from '../../components/modal';
import './style.scss';

const GameBoard = () => {
  const {
    currentLevelConfig,
    cards,
    gameStatus,
    targetColor,
    elapsedTime,
    currentLevelIndex,
    lastLevelTimeTaken,
    startGameSession,
    playLevel,
    proceedToNextOrEnd,
    updateCardColor,
    updateSystemTokenColor
  } = useGameStore();

  const [systemColorInput, setSystemColorInput] = useState('#FFFFFF');
  const [editingCardId, setEditingCardId] = useState(null);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isErrorModal, setIsErrorModal] = useState(false);

  useEffect(() => {
    if (gameStatus === 'init') {
      startGameSession();
    }
  }, [gameStatus, startGameSession]);

  useEffect(() => {
    if (gameStatus === 'levelCompleteModal') {
      setModalMessage(`關卡完成！您花了 ${formatTime(lastLevelTimeTaken)} 秒。`);
      setIsErrorModal(false);
      setModalVisible(true);
    }
  }, [gameStatus, lastLevelTimeTaken]);

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
    setModalMessage(message);
    setIsErrorModal(true);
    setModalVisible(true);
  };

  const handleInitialGameStart = () => {
    if (currentLevelConfig && gameStatus === 'loadingFirstLevel') {
      playLevel(currentLevelConfig);
    }
  };
  
  const handleRestartGame = () => {
    setModalVisible(false);
    startGameSession();
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

  const handleCloseModal = () => {
    setModalVisible(false);
    if (gameStatus === 'levelCompleteModal') {
      const nextConfig = proceedToNextOrEnd();
      if (nextConfig) {
        console.log("[DEBUG GameBoard] handleCloseModal - Received nextConfig, calling playLevel:", nextConfig);
        playLevel(nextConfig);
      } else {
        console.log("[DEBUG GameBoard] handleCloseModal - No nextConfig, game should be ending.");
      }
    }
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
        <Modal show={modalVisible && isErrorModal} onClose={handleCloseModal} closeButton>
            <div className="game-error-modal-content">
                <h4>錯誤提示</h4>
                <p>{modalMessage}</p>
                <button onClick={handleCloseModal} className="modal-confirm-button">我知道了</button>
            </div>
        </Modal>
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
        <Modal show={modalVisible && isErrorModal} onClose={handleCloseModal} closeButton>
            <div className="game-error-modal-content">
                <h4>錯誤提示</h4>
                <p>{modalMessage}</p>
                <button onClick={handleCloseModal} className="modal-confirm-button">我知道了</button>
            </div>
        </Modal>
      </div>
    );
  }
  
  const isGamePlaying = gameStatus === 'playing';
  const levelTypeDisplay = currentLevelConfig?.type === 'reference' ? 'Reference Token' : (currentLevelConfig?.type === 'system' ? 'System Token' : 'Component Token');

  if (((gameStatus === 'playing' || gameStatus === 'levelCompleteModal') && currentLevelConfig) || (gameStatus === 'loadingNextLevel' && currentLevelConfig)) {
    return (
      <div className="design-token-game-wrapper"> 
        <>
          <div className="game-board-container">
            <div className="game-info-panel">
              <h2>{currentLevelConfig.name}</h2>
              <h3 className="level-subtitle">{levelTypeDisplay} 挑戰 - 第 {currentLevelIndex + 1} 關</h3> 
              <div className="info-item"><strong>目標顏色:</strong> 
                <span className="color-swatch" style={{ backgroundColor: targetColor }}></span> {targetColor}
              </div>
              <div className="info-item"><strong>總時間:</strong> {formatTime(elapsedTime)} 秒</div>
              {isGamePlaying && <div className="info-item"><strong>說明:</strong> {currentLevelConfig.description}</div>}
              
              {currentLevelConfig.type === 'system' && isGamePlaying && (
                <div className="system-color-input-area">
                  <p>System Token 色彩:</p>
                  <input 
                    type="text" 
                    value={systemColorInput} 
                    onChange={handleSystemColorInputChange} 
                    placeholder="#RRGGBB"
                  />
                  <button onClick={handleUpdateSystemColor} className="system-token-button">更新系統顏色</button>
                </div>
              )}
            </div>

            <div className={`cards-grid-container ${!isGamePlaying && gameStatus !== 'levelCompleteModal' ? 'hidden-deck' : ''}`}>
              {cards.map(card => (
                <TokenCard 
                  key={card.id} 
                  id={card.id} 
                  color={card.currentColor} 
                  locked={!isGamePlaying || (currentLevelConfig.type === 'system' && isGamePlaying) || (editingCardId !== null && editingCardId !== card.id) || gameStatus === 'levelCompleteModal'}
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
            {gameStatus === 'allLevelsComplete' && (
                <div className="all-levels-complete-message">
                    <p>太強了！你已完成所有Design Token挑戰！總共用時: {formatTime(elapsedTime)} 秒</p>
                    <button onClick={handleRestartGame} className="restart-game-button-main">再玩一次</button>
                </div>
            )}
            {isGamePlaying && gameStatus !== 'allLevelsComplete' && 
                <button onClick={handleRestartGame} className="restart-game-button-ingame">放棄並重來</button>
            }
          </div>

          <Modal 
            show={modalVisible} 
            onClose={handleCloseModal} 
            closeButton={isErrorModal} 
          >
            {isErrorModal ? (
              <div className="game-error-modal-content">
                  <h4>錯誤提示</h4>
                  <p>{modalMessage}</p>
                  <button onClick={handleCloseModal} className="modal-confirm-button">我知道了</button>
              </div>
            ) : (
              <div className="game-level-complete-modal-content">
                  <h4>關卡 {currentLevelIndex + 1} 完成！</h4>
                  <p>{modalMessage}</p>
                  <button onClick={handleCloseModal} className="modal-confirm-button">下一關</button>
              </div>
            )}
          </Modal>
        </>
      </div>
    );
  }

  if (gameStatus === 'allLevelsComplete') {
     return (
        <div className="design-token-game-wrapper">
            <div className="game-board-container game-board-centered">
                <div className="all-levels-complete-message">
                    <p>太強了！你已完成所有Design Token挑戰！總共用時: {formatTime(elapsedTime)} 秒</p>
                    <button onClick={handleRestartGame} className="restart-game-button-main">再玩一次</button>
                </div>
            </div>
            <Modal show={modalVisible && isErrorModal} onClose={handleCloseModal} closeButton>
                <div className="game-error-modal-content">
                    <h4>錯誤提示</h4>
                    <p>{modalMessage}</p>
                    <button onClick={handleCloseModal} className="modal-confirm-button">我知道了</button>
                </div>
            </Modal>
        </div>
     );
  }
  
  // If something unexpected happens or a state isn't covered explicitly,
  // show a generic loading or error. This helps catch unhandled states.
  console.log('[DEBUG GameBoard] Fallback render - gameStatus:', gameStatus, 'currentLevelConfig:', currentLevelConfig);
  return <div className="design-token-game-wrapper"><div className="game-board-container game-board-centered"><p>載入中或狀態錯誤...</p></div></div>;
};

export default GameBoard; 