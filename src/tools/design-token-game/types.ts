export interface LevelConfig {
  id: number;
  name: string; // 例如 "第一關：初識 Reference Token"
  type: "reference" | "system"; // 關卡類型
  cardCount: number; // 卡牌數量
  timeLimit: number; // 時間限制 (秒)
  targetColor: string; // 本關卡的目標顏色 (例如 "#FF0000")
  colorPalette: string[]; // 用於生成卡牌初始顏色的調色盤
  description: string; // 關卡說明文字
}

export interface TokenCardData {
  id: string; // 卡牌的唯一ID
  initialColor: string; // 卡牌的初始顏色
  currentColor: string; // 卡牌當前的顏色
  isMatched: boolean; // 卡牌顏色是否已與目標顏色匹配
}

const initialColorPalettes = {
  easy: ["#AEAEB2", "#8E8E93"], // 灰色系
  medium: ["#FF9500", "#FFCC00", "#FFDB5A"], // 橘黃色系
  hard: ["#34C759", "#007AFF", "#AF52DE", "#5856D6"], // 多色彩
};

// 生成隨機顏色函數
const generateRandomColor = (): string => {
  // 使用HSL色彩空間生成高亮度、高彩度的顏色
  // H: 色相 (0-360) - 隨機
  // S: 飽和度 (0-100%) - 保持高彩度 (70-100%)
  // L: 亮度 (0-100%) - 保持較高亮度 (50-70%)，避免太亮或太暗
  
  const h = Math.floor(Math.random() * 360);       // 隨機色相
  const s = Math.floor(Math.random() * 30) + 70;   // 70-100% 的飽和度
  const l = Math.floor(Math.random() * 20) + 50;   // 50-70% 的亮度
  
  // 將HSL轉換為十六進制顏色格式
  return hslToHex(h, s, l);
};

// HSL轉換為十六進制顏色格式的輔助函數
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  // 轉換為RGB值 (0-255)
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  // 轉換為16進制格式
  const toHex = (value: number): string => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// 預設目標顏色，僅在隨機生成失敗時使用
const defaultTargetColors = [
  "#FF3B30", // 紅色
  "#007AFF", // 藍色
  "#34C759", // 綠色
  "#AF52DE", // 紫色
  "#FF9500"  // 橘色
];

export const createLevels = (): LevelConfig[] => {
  // 為每個關卡生成隨機目標顏色
  const randomTargetColors = Array(5).fill(null).map(() => generateRandomColor());

  return [
    {
      id: 1,
      name: "第一關：點點相連",
      type: "reference",
      cardCount: 4,
      timeLimit: 40, // 秒
      targetColor: randomTargetColors[0], // 隨機顏色
      colorPalette: initialColorPalettes.easy,
      description: "挑戰開始！請點擊每一張卡牌，將它們的顏色都變成指定的目標顏色。",
    },
    {
      id: 2,
      name: "第二關：系統之力初顯",
      type: "system",
      cardCount: 4,
      timeLimit: 30, // 秒
      targetColor: randomTargetColors[1], // 隨機顏色
      colorPalette: initialColorPalettes.easy,
      description: "試試看 System Token 的威力！只需要改變上方的「系統顏色」，所有卡牌顏色將會同步更新為目標顏色。",
    },
    {
      id: 3,
      name: "第三關：眼明手快",
      type: "reference",
      cardCount: 6,
      timeLimit: 50, // 秒
      targetColor: randomTargetColors[2], // 隨機顏色
      colorPalette: initialColorPalettes.medium,
      description: "卡牌變多了！繼續使用 Reference Token 的方式，逐一點擊卡牌，將它們都變成目標顏色。",
    },
    {
      id: 4,
      name: "第四關：效率的奧秘",
      type: "system",
      cardCount: 6,
      timeLimit: 35, // 秒
      targetColor: randomTargetColors[3], // 隨機顏色
      colorPalette: initialColorPalettes.medium,
      description: "再次感受 System Token 的便捷。一次調整，所有卡牌都會變成目標顏色。",
    },
    {
      id: 5,
      name: "第五關：終極挑戰",
      type: "reference", // 保持 Reference 以強調其在複雜情況下的成本
      cardCount: 8,
      timeLimit: 60, // 秒
      targetColor: randomTargetColors[4], // 隨機顏色
      colorPalette: initialColorPalettes.hard,
      description: "最後一關！面對更多的卡牌，展現你修改 Reference Token 的耐心與技巧，將它們全部變為目標顏色吧！",
    },
  ];
}; 