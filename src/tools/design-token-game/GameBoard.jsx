/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import TokenCard from './TokenCard';
import { useGameStore } from './useGameStore';
import html2canvas from 'html2canvas';
import './style.scss';

// 導入獎勵圖示
const MagicianIcon = 'https://noeinoi.com/storybook/game/magician-icon.png';
const DiamondIcon = 'https://noeinoi.com/storybook/game/diamond-icon.png';
const HeartIcon = 'https://noeinoi.com/storybook/game/heart-icon.png';
const SwordIcon = 'https://noeinoi.com/storybook/game/sword-icon.png';
const GrassIcon = 'https://noeinoi.com/storybook/game/grass-icon.png';

// 語言切換按鈕樣式
const LanguageToggleButton = ({ onClick, currentLanguage }) => (
  <button 
    onClick={onClick}
    style={{
      position: 'absolute',
      top: '50px',
      right: '50px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: '#FFCC00',
      border: '2px solid #76767F',
      borderRadius: '0px',
      padding: '4px 8px',
      fontFamily: 'CubicPixel, "Press Start 2P", monospace',
      fontSize: '0.8em',
      cursor: 'pointer',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }}
  >
    <span>🌐</span>
    {currentLanguage === 'zh' ? 'EN' : '中'}
  </button>
);

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
    updateSystemTokenColor,
    language,
    toggleLanguage,
    t
  } = useGameStore();

  const [systemColorInput, setSystemColorInput] = useState('#FFFFFF');
  const [editingCardId, setEditingCardId] = useState(null);
  const resultRef = useRef(null);

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
      showErrorModal(t('invalidColorCode', { colorCode: enteredColor }));
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
      showErrorModal(t('invalidSystemToken', { colorCode: systemColorInput }));
    }
  };

  const formatTime = (milliseconds) => {
    if (typeof milliseconds !== 'number' || isNaN(milliseconds)) return '0.00';
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hundredths = Math.floor((milliseconds % 1000) / 10);
    return `${totalSeconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  // 添加截圖與下載功能
  const captureAndDownload = () => {
    if (!resultRef.current) return;
    
    // 添加視覺反饋
    resultRef.current.classList.add('taking-screenshot');
    
    // 暫時移除動畫，使截圖更清晰
    const rewardImg = resultRef.current.querySelector('.reward-display img');
    const originalAnimation = rewardImg ? rewardImg.style.animation : '';
    if (rewardImg) {
      rewardImg.style.animation = 'none';
    }
    
    // 暫時提高亮度來解決截圖偏暗問題
    const originalFilter = resultRef.current.style.filter;
    resultRef.current.style.filter = 'brightness(1.5) contrast(1.2) saturate(1.3)';
    
    // 暫時設置亮一點的背景色
    const originalBackground = resultRef.current.style.background;
    resultRef.current.style.background = 'linear-gradient(160deg, #363652 0%, #282840 100%)';

    // 截圖前增加一個小延遲，確保樣式變更已應用
    setTimeout(() => {
      html2canvas(resultRef.current, {
        scale: 2, // 提高截圖質量
        backgroundColor: '#2a2a42', // 使用明確的背景顏色而非透明
        logging: false,
        useCORS: true,
        allowTaint: true,
        removeContainer: false, // 確保不移除容器，避免渲染問題
        imageTimeout: 0, // 防止圖像超時
      }).then(canvas => {
        // 增強畫布亮度
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 稍微提高亮度和對比度
        for (let i = 0; i < data.length; i += 4) {
          // 提高亮度，但要保持顏色平衡
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // 亮度提升但保持平衡
          data[i] = Math.min(255, r * 1.3);       // R
          data[i + 1] = Math.min(255, g * 1.3);   // G
          data[i + 2] = Math.min(255, b * 1.3);   // B
          
          // 提高飽和度 (如果不是灰色的話)
          if (Math.abs(r - g) > 5 || Math.abs(g - b) > 5 || Math.abs(r - b) > 5) {
            const avg = (r + g + b) / 3;
            data[i] = Math.min(255, r + (r - avg) * 0.3);
            data[i + 1] = Math.min(255, g + (g - avg) * 0.3);
            data[i + 2] = Math.min(255, b + (b - avg) * 0.3);
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // 添加像素風格框架
        const frameCanvas = document.createElement('canvas');
        const frameSize = 12; // 框架寬度
        frameCanvas.width = canvas.width + frameSize * 2;
        frameCanvas.height = canvas.height + frameSize * 2;
        const frameCtx = frameCanvas.getContext('2d');
        
        // 填充框架背景 (亮一點的藍色漸變)
        const gradient = frameCtx.createLinearGradient(0, 0, frameCanvas.width, frameCanvas.height);
        gradient.addColorStop(0, '#4a4a7a');
        gradient.addColorStop(1, '#363660');
        frameCtx.fillStyle = gradient;
        frameCtx.fillRect(0, 0, frameCanvas.width, frameCanvas.height);
        
        // 在框架上繪製像素風格邊框
        frameCtx.strokeStyle = '#ffcc00';
        frameCtx.lineWidth = 2;
        frameCtx.strokeRect(frameSize/2, frameSize/2, frameCanvas.width - frameSize, frameCanvas.height - frameSize);
        
        // 添加陰影效果
        frameCtx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        frameCtx.shadowBlur = 5;
        frameCtx.shadowOffsetX = 2;
        frameCtx.shadowOffsetY = 2;
        
        // 將原始畫布內容繪製到框架上
        frameCtx.drawImage(canvas, frameSize, frameSize);
        
        // 添加遊戲標題到框架頂部
        frameCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        frameCtx.shadowBlur = 3;
        frameCtx.font = 'bold 24px CubicPixel, "Press Start 2P", monospace';
        frameCtx.fillStyle = '#ffcc00';
        frameCtx.textAlign = 'center';
        frameCtx.fillText(t('designTokenMaster'), frameCanvas.width / 2, frameSize - 3);
        
        // 創建下載連結
        const link = document.createElement('a');
        link.download = `design-token-master-${formatTime(elapsedTime).replace('.', '-')}.jpg`;
        link.href = frameCanvas.toDataURL('image/jpeg', 0.95); // 使用JPG格式，質量95%
        link.click();
        
        // 還原動畫和樣式
        if (rewardImg) {
          rewardImg.style.animation = originalAnimation;
        }
        resultRef.current.style.filter = originalFilter;
        resultRef.current.style.background = originalBackground;
        
        // 移除視覺反饋
        resultRef.current.classList.remove('taking-screenshot');
      }).catch(err => {
        console.error('截圖失敗:', err);
        alert(t('screenshotFailed'));
        
        // 還原動畫和樣式
        if (rewardImg) {
          rewardImg.style.animation = originalAnimation;
        }
        resultRef.current.style.filter = originalFilter;
        resultRef.current.style.background = originalBackground;
        
        // 移除視覺反饋
        resultRef.current.classList.remove('taking-screenshot');
      });
    }, 100); // 小延遲確保樣式已應用
  };

  if (gameStatus === 'init') {
    return (
      <div className="design-token-game-wrapper">
        <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
        <div className="game-board-container game-board-centered">
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }
  
  if (gameStatus === 'error') {
    return (
      <div className="design-token-game-wrapper">
        <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
        <div className="game-board-container game-board-centered">
          <p>{t('error')}</p>
          <button onClick={handleRestartGame}>{t('retry')}</button>
        </div>
      </div>
    );
  }

  if (gameStatus === 'loadingFirstLevel' && currentLevelConfig) {
    return (
      <div className="design-token-game-wrapper">
        <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
        <div className="game-board-container game-board-centered">
          <h2 style={{ fontSize: '2.5em', color: '#FFCC00', marginBottom: '10px' }}>{t('gameTitle')}</h2>
          <p className="level-description-ready" style={{ marginBottom: '30px' }}>
            {t('introDescription')}
          </p>
          
          <div className="rewards-explanation" style={{ width: '80%', marginBottom: '30px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '15px', color: '#FFCC00' }}>{t('rewardExplanation')}</h3>
            <div className="rewards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={MagicianIcon} alt={t('magicianLevel')} style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>0-12 {t('seconds')}</p>
                <p style={{ fontSize: '0.7em', color: '#CCCCCC' }}>{t('magicianLevel')}</p>
              </div>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={SwordIcon} alt={t('warriorLevel')} style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>13-16 {t('seconds')}</p>
                <p style={{ fontSize: '0.7em', color: '#CCCCCC' }}>{t('warriorLevel')}</p>
              </div>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={DiamondIcon} alt={t('gemLevel')} style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>17-20 {t('seconds')}</p>
                <p style={{ fontSize: '0.7em', color: '#CCCCCC' }}>{t('gemLevel')}</p>
              </div>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={HeartIcon} alt={t('heartLevel')} style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>21-40 {t('seconds')}</p>
                <p style={{ fontSize: '0.7em', color: '#CCCCCC' }}>{t('heartLevel')}</p>
              </div>
              <div className="reward-item" style={{ textAlign: 'center' }}>
                <img src={GrassIcon} alt={t('noviceLevel')} style={{ width: '40px', height: '40px', marginBottom: '8px' }} />
                <p>40+ {t('seconds')}</p>
                <p style={{ fontSize: '0.7em', color: '#CCCCCC' }}>{t('noviceLevel')}</p>
              </div>
            </div>
            <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.9em' }}>{t('rewardTip')}</p>
          </div>
          
          <button onClick={handleInitialGameStart} className="start-level-button" style={{ fontSize: '1.4em', padding: '15px 30px' }}>{t('startAdventure')}</button>
        </div>
      </div>
    );
  }
  
  if (currentLevelConfig && (gameStatus === 'playing' || gameStatus === 'levelCompleteScreen')) {
    const isGamePlaying = gameStatus === 'playing';
    const levelTypeDisplay = currentLevelConfig.type === 'reference' ? 'Reference Token' : currentLevelConfig.type === 'system' ? 'System Token' : 'Component Token';

    return (
      <div className="design-token-game-wrapper">
        <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
        <>
          <div className="game-board-container">
            <div className="game-info-panel">
              <h2>{currentLevelConfig.name}</h2>
              <h3 className="level-subtitle">{levelTypeDisplay} {t('challenge')} - {t('level')} {currentLevelIndex + 1} {t('levelSuffix')}</h3>
              <div className="info-item game-timer"><strong>{t('time')}</strong><span className="game-timer-value">{formatTime(elapsedTime)}</span> {t('seconds')}</div>
              <div className="info-item"><strong>{t('targetColor')}</strong>
                <span className="color-swatch" style={{ backgroundColor: targetColor }}></span> {targetColor}
              </div>
              {isGamePlaying && <div className="info-item"><strong>{t('description')}</strong> {currentLevelConfig.description}</div>}
              
              {gameStatus === 'levelCompleteScreen' && (
                <div className="level-complete-message-inline">
                  <h4>{t('levelComplete', { level: currentLevelIndex + 1 })}</h4>
                  <button onClick={handleGoToNextLevel} className="next-level-button-inline">
                    {currentLevelIndex === 4 ? t('submitResults') : t('nextLevel')}
                  </button>
                </div>
              )}

              {currentLevelConfig.type === 'system' && isGamePlaying && (
                <div className="system-color-input-area">
                  <p style={{ marginBottom: '15px' }}>
                    <span style={{ fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.2)', padding: '4px 8px', borderRadius: '4px' }}>awwd-color-primary-50:</span>
                  </p>
                  <input type="text" value={systemColorInput} style={{ width: '100%', padding: '10px 10px' }} onChange={handleSystemColorInputChange} placeholder="#RRGGBB" />
                  <button onClick={handleUpdateSystemColor} className="system-token-button">{t('updateSystemColor')}</button>
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
            {isGamePlaying && <button onClick={handleRestartGame} className="restart-game-button-ingame">{t('abandonAndRestart')}</button>}
          </div>
        </>
      </div>
    );
  }

  if (gameStatus === 'allLevelsComplete') {
     // 根據完成時間決定獎章
     const getRewardIcon = (time) => {
       if (time < 12000) return { 
         icon: MagicianIcon, 
         name: t('magicianLevel'),
         description: t('magicianReward')
       };
       if (time < 16000) return { 
         icon: SwordIcon, 
         name: t('warriorLevel'),
         description: t('swordReward')
       };
       if (time < 20000) return { 
         icon: DiamondIcon, 
         name: t('gemLevel'),
         description: t('diamondReward')
       };
       if (time < 40000) return { 
         icon: HeartIcon, 
         name: t('heartLevel'),
         description: t('heartReward')
       };
       return { 
         icon: GrassIcon, 
         name: t('noviceLevel'),
         description: t('grassReward')
       };
     };
     
     const reward = getRewardIcon(elapsedTime);
     
     return (
        <div className="design-token-game-wrapper">
          <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
            <div className="game-board-container game-board-centered">
                <div ref={resultRef} className="all-levels-complete-message"
                  style={{
                    background: 'linear-gradient(160deg, #282840 0%, #191925 100%)',
                    padding: '30px',
                    borderRadius: '8px',
                    border: '2px solid #2f2f46',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                    maxWidth: '90%'
                  }}>
                    <div className="screenshot-header" style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div className="pixel-logo" style={{ fontSize: '1.2em', color: '#FFCC00', fontWeight: 'bold', letterSpacing: '1px' }}>{t('designTokenMaster')}</div>
                    </div>
                    
                    <h2 style={{ fontSize: '2em' }}>{t('gameCompleted')}</h2><br/>
                    <p>{t('greatPerformance')}</p><br/>
                    <div className="final-time" style={{ fontSize: '1.5em' }}>{t('totalTime')} <span className="game-timer-value" style={{ fontSize: '2em', color: 'yellow' }}>{formatTime(elapsedTime)}</span> {t('seconds')}</div><br/>
                    
                    <div className="reward-display" style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}>
                      <h3 style={{ color: '#FFCC00', marginBottom: '15px' }}>{t('youEarned')}</h3>
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
                      <p style={{ fontSize: '1.2em', color: '#FFCC00', marginBottom: '20px' }}>{reward.name} {t('badgeSuffix')}</p>
                      <p style={{ 
                        fontSize: '1em', 
                        backgroundColor: 'rgba(0,0,0,0.3)', 
                        padding: '15px', 
                        borderRadius: '8px',
                        maxWidth: '80%',
                        margin: '0 auto 20px'
                      }}>{reward.description}</p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button onClick={handleRestartGame} className="restart-game-button-main" style={{ fontSize: '1.5em' }}>{t('playAgain')}</button>
                      <button 
                        onClick={captureAndDownload} 
                        className="share-button" 
                        style={{ 
                          fontSize: '1.5em', 
                          backgroundColor: '#4169E1',
                          border: '2px solid #76767F',
                          padding: '10px 20px',
                          borderRadius: '0px',
                          color: 'white',
                          cursor: 'pointer',
                          fontFamily: 'CubicPixel, "Press Start 2P", monospace',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px'
                        }}
                      >
                        <span style={{ fontSize: '1.2em' }}>📷</span>
                        {t('shareResults')}
                      </button>
                    </div>
                    <p style={{ 
                      marginTop: '15px', 
                      fontSize: '0.8em', 
                      color: '#CCCCCC',
                      opacity: 0.8
                    }}>
                      {t('shareHint')}
                    </p>
                </div>
            </div>
        </div>
     );
  }
  
  console.log('[DEBUG GameBoard] Fallback render - gameStatus:', gameStatus, 'currentLevelConfig from store:', currentLevelConfig);
  return (
    <div className="design-token-game-wrapper">
      <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
      <div className="game-board-container game-board-centered">
        <p>{t('loadingOrError')}</p>
      </div>
    </div>
  );
};

export default GameBoard; 