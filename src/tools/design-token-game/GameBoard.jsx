/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import TokenCard from './TokenCard';
import { useGameStore } from './useGameStore';
import './style.scss';

// 導入獎勵圖示
const MagicianIcon = '/game/magician-icon.png';
const DiamondIcon = '/game/diamond-icon.png';
const HeartIcon = '/game/heart-icon.png';
const SwordIcon = '/game/sword-icon.png';
const GrassIcon = '/game/grass-icon.png';

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
          <h2 style={{ fontSize: '2.5em', color: '#FFCC00', marginBottom: '10px' }}>Design Token 的奇幻冒險</h2>
          {/* <h3 className="level-subtitle" style={{ fontSize: '1.3em', marginBottom: '20px' }}>Design Token 的奇幻冒險</h3> */}
          <p className="level-description-ready" style={{ marginBottom: '30px' }}>
            想像你是色彩魔法師！在這個世界中有兩種魔法：一種是逐一施法(Reference Token)，一種是連鎖魔法(System Token)。
            <br/><br/>
            當你使用「逐一施法」時，你需要對每張卡片單獨下咒語，費時又容易出錯。而「連鎖魔法」則一次影響所有卡片，一勞永逸！
            <br/><br/>
            在真實專案中，直接使用Reference Token就像修改100個文件；使用System Token則只需修改1個文件就能影響所有地方。
            <br/><br/>
            準備好體驗魔法的差異了嗎？完成5個關卡，成為設計系統的魔法大師！
          </p>
          
          <div className="rewards-explanation" style={{ width: '80%', marginBottom: '30px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '15px', color: '#FFCC00' }}>完成任務可獲得獎章：</h3>
            <div className="rewards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={MagicianIcon} alt="魔法師" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>0-9 秒</p>
              </div>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={DiamondIcon} alt="鑽石" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>10-15 秒</p>
              </div>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={HeartIcon} alt="愛心" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>16-20 秒</p>
              </div>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={SwordIcon} alt="劍" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>21-40 秒</p>
              </div>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={GrassIcon} alt="草地" style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>40+ 秒</p>
              </div>
            </div>
            <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.9em' }}>越快完成挑戰，獲得的獎章越稀有！</p>
          </div>
          
          <button onClick={handleInitialGameStart} className="start-level-button" style={{ fontSize: '1.4em', padding: '15px 30px' }}>開始冒險</button>
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
                  <button onClick={handleGoToNextLevel} className="next-level-button-inline">
                    {currentLevelIndex === 4 ? "通關完成送出結果!" : "下一關"}
                  </button>
                </div>
              )}

              {currentLevelConfig.type === 'system' && isGamePlaying && (
                <div className="system-color-input-area">
                  <p style={{ marginBottom: '15px' }}>
                    <span style={{ fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.2)', padding: '4px 8px', borderRadius: '4px' }}>awwd-color-primary-50:</span>
                  </p>
                  <input type="text" value={systemColorInput} style={{ width: '100%', padding: '10px 10px' }} onChange={handleSystemColorInputChange} placeholder="#RRGGBB" />
                  <button onClick={handleUpdateSystemColor} className="system-token-button">更新系統顏色</button>
                </div>
              )}
            </div>

            <div className={`cards-grid-container ${!isGamePlaying ? 'cards-locked' : ''}`}>
              {cards.map((card, index) => (
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
                  animationDelay={currentLevelConfig.type === 'system' ? index * 100 : 0}
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
     // 根據完成時間決定獎章
     const getRewardIcon = (time) => {
       if (time < 9000) return { icon: MagicianIcon, name: '魔法師'};
       if (time < 15000) return { icon: DiamondIcon, name: '鑽石'};
       if (time < 20000) return { icon: HeartIcon, name: '愛心'};
       if (time < 40000) return { icon: SwordIcon, name: '劍'};
       return { icon: GrassIcon, name: '草地'};
     };
     
     const reward = getRewardIcon(elapsedTime);
     
     return (
        <div className="design-token-game-wrapper">
            <div className="game-board-container game-board-centered">
                <div className="all-levels-complete-message">
                    <h2 style={{ fontSize: '2em' }}>遊戲完成！</h2><br/>
                    <p>太強了！你已完成所有Design Token挑戰！</p><br/>
                    <div className="final-time" style={{ fontSize: '1.5em' }}>總共用時: <span className="game-timer-value" style={{ fontSize: '2em', color: 'yellow' }}>{formatTime(elapsedTime)}</span> 秒</div><br/>
                    
                    <div className="reward-display" style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}>
                      <h3 style={{ color: '#FFCC00', marginBottom: '15px' }}>你獲得了：</h3>
                      <img 
                        src={reward.icon} 
                        alt={reward.name} 
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          marginBottom: '10px',
                          animation: 'reward-pulse 1.5s infinite ease-in-out'
                        }} 
                      />
                      <p style={{ fontSize: '1.2em', color: '#FFCC00' }}>{reward.name}獎章</p>
                    </div>
                    
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