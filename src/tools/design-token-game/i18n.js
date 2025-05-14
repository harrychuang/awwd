// 遊戲的國際化文案
const translations = {
  zh: {
    // 遊戲准備和開始
    loading: "遊戲準備中...",
    error: "載入遊戲時發生錯誤！",
    retry: "重試",
    gameTitle: "Design Token 的奇幻冒險",
    introDescription: `想像你是色彩魔法師！在這個世界中有兩種魔法：一種是逐一施法(Reference Token)，一種是連鎖魔法(System Token)。

當你使用「逐一施法」時，你需要對每張卡片單獨下咒語，費時又容易出錯。而「連鎖魔法」則一次影響所有卡片，一勞永逸！

在真實專案中，直接使用Reference Token就像修改100個文件；使用System Token則只需修改1個文件就能影響所有地方。

準備好體驗魔法的差異了嗎？完成5個關卡，成為設計系統的魔法大師！`,
    startAdventure: "開始冒險",

    // 獎勵系統
    rewardExplanation: "完成任務可獲得獎章：",
    magicianLevel: "魔法師等級",
    gemLevel: "寶石等級",
    heartLevel: "熱血等級",
    warriorLevel: "勇者等級",
    noviceLevel: "新手等級",
    rewardTip: "越快完成挑戰，獲得的獎章越稀有！善用System Token來提高效率！",

    // 獎章文案
    magicianReward: "哇！你的速度比System Token還快！你確定你不是Design System的魔法師轉世？設計系統的未來就靠你了！",
    diamondReward: "閃閃發光的表現！這就是連鎖魔法的威力，一次修改影響全局，你已經掌握了Design Token的精髓！",
    heartReward: "漂亮的完成時間！你對設計系統的愛護讓人感動，繼續保持這份熱情，你會成為團隊的設計英雄！",
    swordReward: "你用勇氣與耐心征服了這個挑戰！還不夠快？別擔心，熟能生巧，下次試著更多使用System Token吧！",
    grassReward: "嗯...看來Reference Token讓你浪費了不少時間啊？別灰心！記住這個教訓：在大型專案中，System Token才是提高效率的關鍵！",

    // 遊戲界面
    challenge: "挑戰",
    level: "第",
    levelSuffix: "關",
    time: "時間:",
    targetColor: "目標顏色:",
    description: "說明:",

    // 系統令牌輸入
    updateSystemColor: "更新系統顏色",

    // 關卡完成和遊戲結束
    levelComplete: "太棒了！關卡 {level} 完成！",
    nextLevel: "下一關",
    submitResults: "通關完成送出結果!",
    gameCompleted: "遊戲完成！",
    greatPerformance: "太強了！你已完成所有Design Token挑戰！",
    totalTime: "總共用時:",
    seconds: "秒",
    youEarned: "你獲得了：",
    badgeSuffix: "獎章",
    playAgain: "再玩一次",
    abandonAndRestart: "放棄並重來",
    shareResults: "分享成績",
    shareHint: "點擊「分享成績」下載遊戲成績截圖",
    
    // 錯誤訊息
    invalidColorCode: "提交的色碼 \"{colorCode}\" 格式無效。請使用例如 #RRGGBB 或 #RGB 的 16 進位色碼。",
    invalidSystemToken: "系統 Token 色碼 \"{colorCode}\" 格式無效。請使用例如 #RRGGBB 或 #RGB 的 16 進位色碼。",
    screenshotFailed: "截圖失敗，請再試一次",
    
    // 其他
    loadingOrError: "載入中或狀態錯誤...",
    designTokenMaster: "DESIGN TOKEN MASTER",
  },
  
  en: {
    // Game preparation and start
    loading: "Loading game...",
    error: "Error loading the game!",
    retry: "Retry",
    gameTitle: "The Magic Adventure of Design Tokens",
    introDescription: `Imagine you're a color wizard! In this world, there are two types of magic: individual spells (Reference Token) and chain magic (System Token).

When you use "individual spells", you need to cast a spell on each card separately, which is time-consuming and error-prone. "Chain magic" affects all cards at once, making it efficient!

In real projects, using Reference Tokens is like modifying 100 files; using System Tokens requires modifying only 1 file to affect everything.

Are you ready to experience the difference? Complete 5 levels to become a Design System master!`,
    startAdventure: "Start Adventure",

    // Reward system
    rewardExplanation: "Complete tasks to earn badges:",
    magicianLevel: "Magician Level",
    gemLevel: "Gem Level",
    heartLevel: "Hot Blood Level",
    warriorLevel: "Warrior Level",
    noviceLevel: "Novice Level",
    rewardTip: "The faster you complete challenges, the rarer your badge! Use System Tokens for better efficiency!",

    // Badge descriptions
    magicianReward: "Wow! You're faster than System Tokens! Are you sure you're not a Design System wizard reincarnated? The future of design systems depends on you!",
    diamondReward: "Brilliant performance! This is the power of chain magic, where one change affects everything. You've mastered the essence of Design Tokens!",
    heartReward: "Beautiful timing! Your love for design systems is touching. Keep up this passion, and you'll become a design hero for your team!",
    swordReward: "You conquered this challenge with courage and patience! Not fast enough? Don't worry, practice makes perfect. Try using System Tokens more next time!",
    grassReward: "Hmm...looks like Reference Tokens wasted your time? Don't be discouraged! Remember this lesson: in large projects, System Tokens are key to improving efficiency!",

    // Game interface
    challenge: "Challenge",
    level: "Level",
    levelSuffix: "",
    time: "Time:",
    targetColor: "Target Color:",
    description: "Description:",

    // System token input
    updateSystemColor: "Update System Color",

    // Level completion and game ending
    levelComplete: "Great! Level {level} completed!",
    nextLevel: "Next Level",
    submitResults: "Submit Results!",
    gameCompleted: "Game Completed!",
    greatPerformance: "Amazing! You've completed all Design Token challenges!",
    totalTime: "Total time:",
    seconds: "seconds",
    youEarned: "You earned:",
    badgeSuffix: "Badge",
    playAgain: "Play Again",
    abandonAndRestart: "Abandon & Restart",
    shareResults: "Share Results",
    shareHint: "Click 'Share Results' to download a screenshot of your game result",
    
    // Error messages
    invalidColorCode: "The color code \"{colorCode}\" is invalid. Please use hexadecimal color codes like #RRGGBB or #RGB.",
    invalidSystemToken: "The System Token color code \"{colorCode}\" is invalid. Please use hexadecimal color codes like #RRGGBB or #RGB.",
    screenshotFailed: "Screenshot failed, please try again",
    
    // Others
    loadingOrError: "Loading or error state...",
    designTokenMaster: "DESIGN TOKEN MASTER",
  }
};

export default translations; 