// 遊戲的國際化文案
const translations = {
  zh: {
    // 遊戲准備和開始
    loading: "喚醒魔法世界中...",
    error: "魔法能量混亂！載入失敗！",
    retry: "重新施法",
    gameTitle: "Design Token 的奇幻冒險",
    introDescription: `歡迎來到色彩魔法的王國！你是一位初入門的魔法學徒，即將學習兩種控制色彩的神秘力量。

第一種是「原始咒語」(Hardcoded Value)，這種古老的方法需要為每個物品單獨施法，耗費大量魔力且容易出錯。

第二種是「魔法符文」(Design Token)，這是大法師們使用的進階技巧，只需在魔法水晶上刻下一道符文，世界中所有連結的物品就會同時變化，節省魔力又精準！

在現實的設計王國中，使用原始咒語就像要跑遍100個地方改變顏色；而使用魔法符文，只需在魔法寶典的一處更改，就能影響整個王國！

準備好你的魔杖，穿越5個充滿挑戰的魔法關卡，成為設計世界的至高魔法師！`,
    startAdventure: "開始魔法冒險",

    // 獎勵系統
    rewardExplanation: "完成挑戰可獲得魔法徽章：",
    magicianLevel: "大法師徽章",
    gemLevel: "寶石法師徽章",
    heartLevel: "熱心法師徽章",
    warriorLevel: "勇者法師徽章",
    noviceLevel: "學徒法師徽章",
    rewardTip: "越快完成挑戰，獲得的魔法徽章越稀有！善用魔法符文(Design Token)來增強你的魔法效率！",

    // 獎章文案
    magicianReward: "驚人的魔力掌控！你比魔法符文還要快！魔法議會已經注意到你的天賦，你確定你不是傳說中失落的大法師轉世嗎？未來的魔法革新就靠你了！",
    diamondReward: "耀眼的魔法光芒！這就是魔法符文的強大威力，一個咒語影響全世界！你已經掌握了設計魔法的精髓，寶石法師的稱號實至名歸！",
    heartReward: "充滿熱情的完美施法！你對魔法的熱愛讓整個王國感動，持續這份熱情，你將成為設計王國的英雄法師！",
    swordReward: "你用堅韌的意志和耐心征服了這個挑戰！雖然不是最快，但勇者從不放棄！繼續練習，下次試著更靈活地運用魔法符文吧！",
    grassReward: "啊...看來你在原始咒語上花了太多時間！別灰心，每位偉大的法師都有起步的時候。記住這堂課：在廣闊的魔法王國中，魔法符文才是提高魔法效率的關鍵！",

    // 遊戲界面
    challenge: "挑戰",
    level: "第",
    levelSuffix: "關",
    time: "魔法時間:",
    targetColor: "目標色彩魔法:",
    description: "魔法指南:",

    // Design Token input
    updateSystemColor: "施放魔法符文",

    // 關卡完成和遊戲結束
    levelComplete: "魔法成功！關卡 {level} 完成！",
    nextLevel: "前往下一關",
    submitResults: "完成冒險！",
    gameCompleted: "魔法冒險完成！",
    greatPerformance: "驚人的魔法天賦！你已完成所有Design Token挑戰！",
    totalTime: "魔法施放總時間:",
    seconds: "秒",
    youEarned: "你獲得了：",
    badgeSuffix: "徽章",
    playAgain: "再次冒險",
    abandonAndRestart: "放棄並重來",
    shareResults: "分享魔法成就",
    shareHint: "點擊「分享魔法成就」下載你的成績魔法畫像",
    
    // AAPD 課程連結
    learnMoreAAPD: "到 AAPD 學習設計系統魔法",
    
    // 錯誤訊息
    invalidColorCode: "魔法色碼 \"{colorCode}\" 無效。請使用例如 #RRGGBB 或 #RGB 的魔法色碼。",
    invalidSystemToken: "魔法符文色碼 \"{colorCode}\" 無效。請使用例如 #RRGGBB 或 #RGB 的魔法色碼。",
    colorMismatch: "你的魔法色碼 \"{enteredColor}\" 與目標色碼 \"{targetColor}\" 不符！重新施法吧！",
    screenshotFailed: "魔法畫像捕捉失敗，請再試一次",
    
    // 其他
    loadingOrError: "魔法能量波動中...",
    designTokenMaster: "設計魔法大師",

    // 遊戲關卡
    levelName1: "第一關：點點相連",
    levelDesc1: "挑戰開始！請點擊每一張卡牌，在出現的輸入框中填入目標色碼，將它們的顏色都變成指定的目標顏色。",
    
    levelName2: "第二關：系統之力初顯",
    levelDesc2: "試試看魔法符文(Design Token)的威力！只需要改變上方的魔法符文，所有卡牌顏色將會同步更新為目標顏色。",
    
    levelName3: "第三關：眼明手快",
    levelDesc3: "卡牌變多了！繼續使用原始咒語(Hardcoded Value)的方式，逐一點擊卡牌，將它們都變成目標顏色。",
    
    levelName4: "第四關：效率的奧秘",
    levelDesc4: "再次感受魔法符文(Design Token)的便捷。一次調整，所有卡牌都會變成目標顏色。",
    
    levelName5: "第五關：終極挑戰",
    levelDesc5: "最後一關！面對更多的卡牌，展現你使用原始咒語的耐心與技巧，將它們全部變為目標顏色吧！",

    // 設計元素註解列表
    designElements: [
      "Icon的顏色",
      "卡片的背景色",
      "按鈕的顏色",
      "標題的顏色",
      "強調文字顏色",
      "邊框顏色",
      "連結顏色",
      "提示文字顏色",
      "訊息顏色",
      "成功訊息顏色",
      "標籤背景色",
      "頁尾文字顏色",
      "導航列背景",
      "分隔線顏色",
      "按鈕顏色",
      "輸入框邊框色",
      "焦點狀態色",
      "進度條顏色",
      "表格標頭色",
      "光暈效果"
    ],
  },
  
  en: {
    // Game preparation and start
    loading: "Awakening the magical world...",
    error: "Magical energy disrupted! Loading failed!",
    retry: "Cast Again",
    gameTitle: "The Magical Adventure of Design Tokens",
    introDescription: `Welcome to the Kingdom of Color Magic! You are an apprentice wizard about to learn two mystical powers to control colors.

The first is "Primal Spells" (Hardcoded Value), an ancient method requiring separate enchantments for each object, draining your mana and prone to errors.

The second is "Magical Runes" (Design Token), an advanced technique used by archmages. By inscribing a single rune on a magic crystal, all connected objects transform simultaneously, saving mana and ensuring precision!

In the real design kingdom, using Primal Spells is like running to 100 different places to change colors; while using Magical Runes requires changing just one entry in the spellbook to affect the entire kingdom!

Ready your wand and traverse 5 challenging magical levels to become the Supreme Archmage of the design world!`,
    startAdventure: "Begin Magical Journey",

    // Reward system
    rewardExplanation: "Complete challenges to earn magical insignias:",
    magicianLevel: "Archmage Insignia",
    gemLevel: "Gem Wizard Insignia",
    heartLevel: "Heart Wizard Insignia",
    warriorLevel: "Warrior Wizard Insignia",
    noviceLevel: "Apprentice Insignia",
    rewardTip: "The faster you complete challenges, the rarer your magical insignia! Master the Magical Runes (Design Tokens) to enhance your arcane efficiency!",

    // Badge descriptions
    magicianReward: "Astounding magical control! You're faster than Magical Runes themselves! The Wizards' Council has noticed your talent. Are you sure you're not the reincarnation of a legendary lost Archmage? The future of magical innovation depends on you!",
    diamondReward: "Dazzling magical brilliance! This is the mighty power of Magical Runes, one spell affecting the entire world! You've mastered the essence of design magic, truly deserving the title of Gem Wizard!",
    heartReward: "Perfect spellcasting filled with passion! Your love for magic has moved the entire kingdom. Maintain this enthusiasm, and you'll become a hero wizard of the design realm!",
    swordReward: "You conquered this challenge with unwavering will and patience! Though not the fastest, a warrior never gives up! Keep practicing, and try to use Magical Runes more skillfully next time!",
    grassReward: "Ah... it seems you spent too much time on Primal Spells! Don't be discouraged, every great wizard had to start somewhere. Remember this lesson: in the vast magical kingdom, Magical Runes are the key to improving your magical efficiency!",

    // Game interface
    challenge: "Challenge",
    level: "Level",
    levelSuffix: "",
    time: "Magical Time:",
    targetColor: "Target Color Magic:",
    description: "Magical Guide:",

    // System token input
    updateSystemColor: "Cast Magical Rune",

    // Level completion and game ending
    levelComplete: "Magic successful! Level {level} completed!",
    nextLevel: "To Next Level",
    submitResults: "Complete Adventure!",
    gameCompleted: "Magical Journey Completed!",
    greatPerformance: "Incredible magical talent! You've completed all Design Token challenges!",
    totalTime: "Total spellcasting time:",
    seconds: "seconds",
    youEarned: "You earned:",
    badgeSuffix: "Insignia",
    playAgain: "Adventure Again",
    abandonAndRestart: "Abandon & Restart",
    shareResults: "Share Magical Achievement",
    shareHint: "Click 'Share Magical Achievement' to download your magical portrait",
    
    // AAPD course link
    learnMoreAAPD: "Learn Design System Magic at AAPD",
    
    // Error messages
    invalidColorCode: "Magical color code \"{colorCode}\" is invalid. Please use hexadecimal color codes like #RRGGBB or #RGB.",
    invalidSystemToken: "The Magical Rune color code \"{colorCode}\" is invalid. Please use hexadecimal color codes like #RRGGBB or #RGB.",
    colorMismatch: "Your magical color code \"{enteredColor}\" doesn't match the target \"{targetColor}\"! Try casting again!",
    screenshotFailed: "Magical portrait capture failed, please try again",
    
    // Others
    loadingOrError: "Magical energy fluctuating...",
    designTokenMaster: "DESIGN MAGIC MASTER",

    // Game levels
    levelName1: "Level 1: Connect the Dots",
    levelDesc1: "Challenge begins! Click on each card, enter the target color code in the input field that appears, and change their colors to the target color.",
    
    levelName2: "Level 2: The Power of Magic Runes",
    levelDesc2: "Experience the power of Magical Runes (Design Tokens)! Simply change the magical rune above, and all cards will synchronize to the target color.",
    
    levelName3: "Level 3: Quick Eyes, Quick Hands",
    levelDesc3: "More cards appear! Continue using Primal Spells (Hardcoded Values), clicking each card individually to change them to the target color.",
    
    levelName4: "Level 4: The Secret of Efficiency",
    levelDesc4: "Feel the convenience of Magical Runes (Design Tokens) again. One adjustment, and all cards will transform to the target color.",
    
    levelName5: "Level 5: Ultimate Challenge",
    levelDesc5: "Final level! Face even more cards and demonstrate your patience and skill with Primal Spells, changing them all to the target color!",

    // Design element comments list
    designElements: [
      "Icon color",
      "Card background",
      "Button color",
      "Heading color",
      "Emphasized text color",
      "Border color",
      "Link color",
      "Hint text color",
      "Message color",
      "Success message color",
      "Tag background",
      "Footer text color",
      "Navigation bar background",
      "Divider color",
      "Button color",
      "Input field border color",
      "Focus state color",
      "Progress bar color",
      "Table header color",
      "Effect color"
    ],
  }
};

export default translations; 