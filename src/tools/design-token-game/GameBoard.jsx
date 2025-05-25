/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import TokenCard from './TokenCard';
import { useGameStore } from './useGameStore';
import html2canvas from 'html2canvas';
import './style.scss';

// 導入獎勵圖示 - 支援獨立構建和 Storybook 環境
const getIconPath = (name) => {
  if (window.gameIcons && window.gameIcons[name]) {
    return window.gameIcons[name];
  }
  return `https://noeinoi.com/storybook/game/${name}-icon.png`;
};

const MagicianIcon = getIconPath('magician');
const DiamondIcon = getIconPath('diamond');
const HeartIcon = getIconPath('heart');
const SwordIcon = getIconPath('sword');
const GrassIcon = getIconPath('grass');

// 語言切換按鈕樣式
const LanguageToggleButton = ({ onClick, currentLanguage }) => (
  <button 
    onClick={onClick}
    style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
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
  const [errorMessage, setErrorMessage] = useState('');
  // 用於追蹤所有 setTimeout 的 IDs
  const timeoutIds = useRef([]);
  // 用於引用DOM元素，避免直接的DOM查詢
  const systemInputRef = useRef(null);
  const cardElementsRef = useRef({});

  // 添加一個清理timeout的函數
  const clearAllTimeouts = useCallback(() => {
    if (timeoutIds.current.length > 0) {
      timeoutIds.current.forEach((id) => clearTimeout(id));
      timeoutIds.current = [];
    }
  }, []);

  // 安全的setTimeout函數，會自動追蹤並在需要時清理
  const safeTimeout = useCallback((callback, delay) => {
    const id = setTimeout(() => {
      // 執行回調，並從清單中移除此ID
      callback();
      timeoutIds.current = timeoutIds.current.filter(timeoutId => timeoutId !== id);
    }, delay);
    timeoutIds.current.push(id);
    return id;
  }, []);

  // 組件卸載時的清理函數
  useEffect(() => {
    return () => {
      // 清理所有計時器
      clearAllTimeouts();
      // 確保遊戲計時器停止
      const { stopTimer } = useGameStore.getState();
      stopTimer();
    };
  }, [clearAllTimeouts]);

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

  const showErrorModal = useCallback((message) => {
    setErrorMessage(message);
    
    safeTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [safeTimeout]);

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

  const handleCardInteraction = useCallback((cardId) => {
    if (currentLevelConfig?.type === 'reference' && gameStatus === 'playing' && !cards.find(c => c.id === cardId)?.isMatched) {
      setEditingCardId(cardId);
    }
  }, [currentLevelConfig, gameStatus, cards]);

  const handleSystemColorInputChange = useCallback((event) => {
    setSystemColorInput(event.target.value);
  }, []);

  const handleUpdateSystemColor = useCallback(() => {
    const trimmedSystemColor = systemColorInput.trim();
    
    // 檢查色碼格式是否有效
    if (/^#[0-9A-F]{6}$/i.test(trimmedSystemColor) || /^#[0-9A-F]{3}$/i.test(trimmedSystemColor)) {
      // 檢查是否與目標色碼匹配
      if (trimmedSystemColor.toLowerCase() !== targetColor.toLowerCase()) {
        // 色碼有效但不匹配
        const inputElement = systemInputRef.current;
        
        // 顯示錯誤訊息
        const errorMessage = t('colorMismatch', { enteredColor: trimmedSystemColor, targetColor });
        setErrorMessage(errorMessage);
        
        // 添加定時器使錯誤訊息自動消失
        safeTimeout(() => {
          setErrorMessage('');
        }, 3000);
        
        // 為輸入框添加抖動動畫
        if (inputElement) {
          inputElement.classList.add('shake-animation');
          safeTimeout(() => {
            inputElement.classList.remove('shake-animation');
          }, 600);
        }
        
        // 為所有卡片添加抖動動畫
        Object.values(cardElementsRef.current).forEach(cardEl => {
          if (cardEl) {
            cardEl.classList.add('shake-animation');
            safeTimeout(() => {
              cardEl.classList.remove('shake-animation');
            }, 600);
          }
        });
        
        // 在動畫結束後再更新色碼
        safeTimeout(() => {
          updateSystemTokenColor(trimmedSystemColor);
        }, 600);
      } else {
        // 色碼匹配，直接更新
        updateSystemTokenColor(trimmedSystemColor);
      }
    } else {
      // 色碼格式無效
      const inputElement = systemInputRef.current;
      
      if (inputElement) {
        // 顯示錯誤訊息
        const errorMessage = t('invalidSystemToken', { colorCode: systemColorInput });
        setErrorMessage(errorMessage);
        
        // 添加定時器使錯誤訊息自動消失
        safeTimeout(() => {
          setErrorMessage('');
        }, 3000);
        
        // 為輸入框添加抖動動畫
        inputElement.classList.add('shake-animation');
        safeTimeout(() => {
          inputElement.classList.remove('shake-animation');
        }, 600);
        
        // 為所有卡片添加抖動動畫
        Object.values(cardElementsRef.current).forEach(cardEl => {
          if (cardEl) {
            cardEl.classList.add('shake-animation');
            safeTimeout(() => {
              cardEl.classList.remove('shake-animation');
            }, 600);
          }
        });
      } else {
        // 找不到輸入元素，退回到只顯示錯誤訊息
        setErrorMessage(t('invalidSystemToken', { colorCode: systemColorInput }));
        safeTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
  }, [systemColorInput, targetColor, t, safeTimeout, updateSystemTokenColor]);

  const showCustomError = useCallback((element, message) => {
    setErrorMessage(message);
    
    safeTimeout(() => {
      setErrorMessage('');
    }, 3000);
    
    if (element) {
      // 找到當前卡片元素（如果存在）
      let cardElement = null;
      if (element.closest) {
        // 先嘗試查找 .token-card，如果找不到再查找 .token-card-container
        const tokenCard = element.closest('.token-card');
        const tokenCardContainer = element.closest('.token-card-container');
        if (tokenCard) {
          cardElement = tokenCard;
        } else if (tokenCardContainer) {
          // 如果在容器中，尋找容器內的實際卡片元素
          const cardInContainer = tokenCardContainer.querySelector('.token-card');
          cardElement = cardInContainer || tokenCardContainer;
        } else {
          // 處理輸入框可能不在卡片內部的情況
          const activeCardId = editingCardId;
          if (activeCardId && cardElementsRef.current[activeCardId]) {
            cardElement = cardElementsRef.current[activeCardId];
          }
        }
      }
      
      // 添加抖動動畫效果
      element.classList.add('shake-animation');
      if (cardElement) {
        cardElement.classList.add('shake-animation');
      }
      
      // 延遲移除動畫效果
      safeTimeout(() => {
        if (element) element.classList.remove('shake-animation');
        if (cardElement) cardElement.classList.remove('shake-animation');
      }, 600);
    }
  }, [safeTimeout, editingCardId]);

  const handleCardColorSubmit = useCallback((cardId, enteredColor) => {
    const trimmedColor = enteredColor.trim();
    if (/^#[0-9A-F]{6}$/i.test(trimmedColor) || /^#[0-9A-F]{3}$/i.test(trimmedColor)) {
      // 先檢查是否與目標顏色匹配
      if (trimmedColor.toLowerCase() !== targetColor.toLowerCase()) {
        // 顏色不匹配時，添加抖動動畫和錯誤消息
        
        // 找到當前活動的卡片
        const cardElement = cardElementsRef.current[cardId];
        let currentInput = document.activeElement;
        if (currentInput && !currentInput.classList.contains('token-card-input')) {
          currentInput = document.querySelector('.token-card-input');
        }
        
        // 使用 showCustomError 函數顯示錯誤訊息並讓它自動消失
        const errorMessage = t('colorMismatch', { enteredColor: trimmedColor, targetColor });
        if (currentInput) {
          // 不使用 showCustomError 避免重複添加動畫效果
          setErrorMessage(errorMessage);
          // 添加定時器使錯誤訊息自動消失
          safeTimeout(() => {
            setErrorMessage('');
          }, 3000);
          
          currentInput.classList.add('shake-animation');
        } else {
          setErrorMessage(errorMessage);
          // 添加定時器使錯誤訊息自動消失
          safeTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
        
        // 如果找到了卡片元素，為其添加抖動動畫
        if (cardElement) {
          cardElement.classList.add('shake-animation');
        }
        
        // 延遲更新狀態，確保動畫效果有時間顯示
        safeTimeout(() => {
          // 移除動畫類別
          if (currentInput) {
            currentInput.classList.remove('shake-animation');
          }
          if (cardElement) {
            cardElement.classList.remove('shake-animation');
          }
          
          // 更新卡片顏色並關閉編輯模式
          updateCardColor(cardId, trimmedColor);
          setEditingCardId(null);
        }, 600); // 與動畫持續時間相同
        
        return; // 提前返回，避免執行後面的代碼
      }
      
      // 如果顏色匹配，直接更新卡片顏色並關閉編輯模式
      updateCardColor(cardId, trimmedColor);
      setEditingCardId(null);
    } else {
      // 處理無效色碼格式的情況
      let currentInput = document.activeElement;
      if (currentInput && !currentInput.classList.contains('token-card-input')) {
        currentInput = document.querySelector('.token-card-input');
      }
      
      if (currentInput) {
        showCustomError(currentInput, t('invalidColorCode', { colorCode: enteredColor }));
      } else {
        setErrorMessage(t('invalidColorCode', { colorCode: enteredColor }));
        // 添加定時器使錯誤訊息自動消失
        safeTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
  }, [targetColor, t, showCustomError, safeTimeout, updateCardColor]);

  // 使用 useMemo 優化 formatTime 函數計算
  const formatTime = useCallback((milliseconds) => {
    if (typeof milliseconds !== 'number' || isNaN(milliseconds)) return '0.00';
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hundredths = Math.floor((milliseconds % 1000) / 10);
    return `${totalSeconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  }, []);

  // 優化格式化的時間顯示
  const formattedTime = useMemo(() => formatTime(elapsedTime), [formatTime, elapsedTime]);

  // 優化截圖與下載功能
  const captureAndDownload = useCallback(() => {
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
    safeTimeout(() => {
      html2canvas(resultRef.current, {
        scale: 2, // 提高截圖質量
        backgroundColor: '#2a2a42', // 使用明確的背景顏色而非透明
        logging: false,
        useCORS: true,
        allowTaint: true,
        removeContainer: false, // 確保不移除容器，避免渲染問題
        imageTimeout: 0, // 防止圖像超時
      }).then(canvas => {
        // 處理截圖並下載...
        // 處理完成後釋放資源
        try {
          const link = document.createElement('a');
          link.download = `design-token-game-${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          
          // 釋放資源
          safeTimeout(() => {
            URL.revokeObjectURL(link.href);
            canvas.width = 0;
            canvas.height = 0;
            
            // 恢復原始樣式
            if (rewardImg) rewardImg.style.animation = originalAnimation;
            resultRef.current.style.filter = originalFilter;
            resultRef.current.style.background = originalBackground;
            resultRef.current.classList.remove('taking-screenshot');
          }, 1000);
        } catch (err) {
          // 確保恢復原始樣式
          if (rewardImg) rewardImg.style.animation = originalAnimation;
          resultRef.current.style.filter = originalFilter;
          resultRef.current.style.background = originalBackground;
          resultRef.current.classList.remove('taking-screenshot');
        }
      }).catch(err => {
        // 確保恢復原始樣式
        if (rewardImg) rewardImg.style.animation = originalAnimation;
        resultRef.current.style.filter = originalFilter;
        resultRef.current.style.background = originalBackground;
        resultRef.current.classList.remove('taking-screenshot');
      });
    }, 100);
  }, [safeTimeout]);

  // 創建光點並確保從顯示位置立即開始向上飄動
  const renderPixelStars = () => {
    // 計算適合的星星數量，根據設備性能調整
    const starCount = Math.min(60, window.innerWidth > 1200 ? 60 : window.innerWidth > 768 ? 40 : 30);
    
    // 預先計算所有星星的位置，避免重複計算隨機值
    const starsConfig = Array.from({ length: starCount }).map(() => ({
      bottom: Math.random() * 100,
      left: Math.random() * 100
    }));
    
    // 批量建立星星元素，只設置必要的內聯樣式，其餘使用 CSS 類
    return starsConfig.map((config, index) => (
      <div 
        key={`star-${index}`} 
        className="pixel-star"
        style={{
          bottom: `${config.bottom}%`,
          left: `${config.left}%`
          // 不再內聯設置 animationDelay 和 willChange，這些已在 CSS 設置
        }}
      />
    ));
  };

  // 使用 useMemo 並設置為空依賴，確保只在組件初次渲染時生成一次
  const pixelStars = useMemo(() => renderPixelStars(), []);
  
  // 添加窗口調整大小和頁面可見性變化的處理
  useEffect(() => {
    // 頁面不可見時暫停動畫，提高效能
    const handleVisibilityChange = () => {
      const starsContainer = document.querySelector('.pixel-stars-container');
      if (!starsContainer) return;
      
      if (document.hidden) {
        // 頁面不可見時暫停所有動畫
        starsContainer.style.animationPlayState = 'paused';
        starsContainer.querySelectorAll('.pixel-star').forEach(star => {
          star.style.animationPlayState = 'paused';
        });
      } else {
        // 頁面可見時恢復動畫
        starsContainer.style.animationPlayState = 'running';
        starsContainer.querySelectorAll('.pixel-star').forEach(star => {
          star.style.animationPlayState = 'running';
        });
      }
    };
    
    // 註冊事件監聽器
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 組件卸載時清理
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (gameStatus === 'init') {
    return (
      <div className="design-token-game-wrapper">
        
        {/* 背景像素光點 */}
        <div className="pixel-stars-container">
          {pixelStars}
        </div>
        
        {/* 錯誤訊息浮動提示 */}
        {errorMessage && (
          <div className="error-message-floating">
            {errorMessage}
          </div>
        )}
        
        <div className="game-board-container game-board-centered">
          <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }
  
  if (gameStatus === 'error') {
    return (
      <div className="design-token-game-wrapper">
        
        
        {/* 背景像素光點 */}
        <div className="pixel-stars-container">
          {pixelStars}
        </div>
        
        {/* 錯誤訊息浮動提示 */}
        {errorMessage && (
          <div className="error-message-floating">
            {errorMessage}
          </div>
        )}
        
        <div className="game-board-container game-board-centered">
          <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
          <p>{t('error')}</p>
          <button onClick={handleRestartGame}>{t('retry')}</button>
        </div>
      </div>
    );
  }

  if (gameStatus === 'loadingFirstLevel' && currentLevelConfig) {
    return (
      <div className="design-token-game-wrapper">
        
        
        {/* 背景像素光點 */}
        <div className="pixel-stars-container">
          {pixelStars}
        </div>
        
        {/* 錯誤訊息浮動提示 */}
        {errorMessage && (
          <div className="error-message-floating">
            {errorMessage}
          </div>
        )}
        
        <div className="game-board-container game-board-centered">
          <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
          {/* LOGO + 標題橫向排列 */}
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', gap: '30px', marginBottom: '16px' }}>
            <img src="https://noeinoi.com/storybook/game/logo.png?v=2" alt="Logo" style={{ width: '240px', height: 'auto', display: 'block' }} />
          </div>
          <p className="level-description-ready" style={{ 
            marginBottom: '30px',
            whiteSpace: 'pre-line',
            lineHeight: '1.5',
            textAlign: 'left',
            padding: '0 20px'
          }}>
            {t('introDescription')}
          </p>
          
          <div className="rewards-explanation" style={{ width: '90%', marginBottom: '30px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px' }}>
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
          
          <a 
            href="https://academy.aapd.com.tw/courses/ds?affcode=harry" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="aapd-link-button"
          >
            <img 
              src={MagicianIcon} 
              alt="魔法師" 
              style={{ 
                width: '36px', 
                height: '36px', 
                marginRight: '10px', 
                verticalAlign: 'middle',
                display: 'inline-block'
              }} 
            />
            {t('learnMoreAAPD')}
          </a>
        </div>
      </div>
    );
  }
  
  if (currentLevelConfig && (gameStatus === 'playing' || gameStatus === 'levelCompleteScreen')) {
    const isGamePlaying = gameStatus === 'playing';
    const isLevelComplete = gameStatus === 'levelCompleteScreen';
    const levelTypeDisplay = currentLevelConfig.type === 'reference' ? 'Hardcoded Value' : currentLevelConfig.type === 'system' ? 'Design Token' : 'Component Token';

    return (
      <div className="design-token-game-wrapper">
        
        
        {/* 背景像素光點 - 關卡完成時添加 celebrating 類，但保持使用相同的光點 */}
        <div className={`pixel-stars-container ${isLevelComplete ? 'celebrating' : ''}`}>
          {pixelStars}
        </div>
        
        {/* 錯誤訊息浮動提示 */}
        {errorMessage && (
          <div className="error-message-floating">
            {errorMessage}
          </div>
        )}
        
        <>
          <div className="game-board-container">
            <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
            <div className="game-info-panel">
              <h2>{t(currentLevelConfig.name)}</h2>
              <h3 className="level-subtitle">{levelTypeDisplay} {t('challenge')} - {t('level')} {currentLevelIndex + 1} {t('levelSuffix')}</h3>
              <div className="info-item game-timer"><strong>{t('time')}</strong><span className="game-timer-value">{formattedTime}</span> {t('seconds')}</div>
              <div className="info-item"><strong>{t('targetColor')}</strong>
                <span className="color-swatch" style={{ backgroundColor: targetColor }}></span> {targetColor}
              </div>
              {isGamePlaying && <div className="info-item"><strong>{t('description')}</strong> {t(currentLevelConfig.description)}</div>}
              
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
                  <input
                    ref={systemInputRef}
                    type="text"
                    value={systemColorInput}
                    onChange={handleSystemColorInputChange}
                    className="system-token-input"
                  />
                  <button onClick={handleUpdateSystemColor} className="update-button">
                    {t('updateColor')}
                  </button>
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
                  ref={(el) => {
                    if (el) cardElementsRef.current[card.id] = el;
                  }}
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
          
          
          {/* 背景像素光點 - 全部關卡完成時也使用相同的光點，只添加慶祝效果 */}
          <div className="pixel-stars-container celebrating">
            {pixelStars}
          </div>
          
          {/* 錯誤訊息浮動提示 */}
          {errorMessage && (
            <div className="error-message-floating">
              {errorMessage}
            </div>
          )}
          
            <div className="game-board-container game-board-centered">
                <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
                <div ref={resultRef} className="all-levels-complete-message"
                  style={{
                    background: 'linear-gradient(160deg, #282840 0%, #191925 100%)',
                    padding: '30px',
                    borderRadius: '8px',
                    border: '2px solid #2f2f46',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                    maxWidth: '90%',
                    marginTop: '-20px',
                    marginBottom: '-20px'
                  }}>
                    <div className="screenshot-header" style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div className="pixel-logo" style={{ fontSize: '1.2em', color: '#FFCC00', fontWeight: 'bold', letterSpacing: '1px' }}>{t('designTokenMaster')}</div>
                    </div>
                    
                    {/* LOGO + 標題橫向排列 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '16px' }}>
                      <img src="https://noeinoi.com/storybook/game/logo.png?v=2" alt="Logo" style={{ width: '180px', height: 'auto', display: 'block' }} />
                    </div>
                    <h2 style={{ fontSize: '2em' }}>{t('gameCompleted')}</h2><br/>
                    <p>{t('greatPerformance')}</p><br/>
                    <div className="final-time" style={{ fontSize: '1.5em' }}>{t('totalTime')} <span className="game-timer-value" style={{ fontSize: '2em', color: 'yellow' }}>{formattedTime}</span> {t('seconds')}</div><br/>
                    
                    <div className="reward-display" style={{ marginTop: '0px', marginBottom: '30px', textAlign: 'center' }}>
                      <h3 style={{ color: '#FFCC00', marginBottom: '10px' }}>{t('youEarned')}</h3>
                      <img 
                        src={reward.icon} 
                        alt={reward.name} 
                        style={{ 
                          width: '120px', 
                          height: '120px', 
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
                    
                    <a 
                      href="https://academy.aapd.com.tw/courses/ds?affcode=harry" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="aapd-link-button"
                    >
                      <img 
                        src={MagicianIcon} 
                        alt="魔法師" 
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          padding: '0px 8px',
                          marginRight: '10px', 
                          verticalAlign: 'middle',
                          display: 'inline-block'
                        }} 
                      />
                      {t('learnMoreAAPD')}
                    </a>
                    
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
  
  return (
    <div className="design-token-game-wrapper">
      
      
      {/* 背景像素光點 */}
      <div className="pixel-stars-container">
        {pixelStars}
      </div>
      
      {errorMessage && (
        <div className="error-message-floating">
          {errorMessage}
        </div>
      )}
      
      <div className="game-board-container game-board-centered">
       <LanguageToggleButton onClick={toggleLanguage} currentLanguage={language} />
        <p>{t('loadingOrError')}</p>
      </div>
    </div>
  );
};

export default GameBoard; 