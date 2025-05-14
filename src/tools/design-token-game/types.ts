import { type } from "os";
import translations from './i18n';

export interface LevelConfig {
  id: number;
  name: string;
  type: 'system' | 'reference' | 'component';
  cardCount: number;
  timeLimit: number;
  targetColor: string;
  colorPalette: string[];
  description: string;
}

export interface TokenCardData {
  id: string; // 卡牌的唯一ID
  initialColor: string; // 卡牌的初始顏色
  currentColor: string; // 卡牌當前的顏色
  isMatched: boolean; // 卡牌顏色是否已與目標顏色匹配
}

// 用於初始狀態的顏色
export const initialColorPalettes = {
  easy: [
    "#8294C4",
    "#ACB1D6",
    "#DBDFEA",
    "#FFEAD2",
  ],
  medium: [
    "#7C73C0",
    "#9D8AC9",
    "#B9A0D9",
    "#CFB6E5",
    "#E2C7F3",
    "#EAD9F5",
  ],
  hard: [
    "#FF9494",
    "#FFB4B4",
    "#FFD6D6",
    "#FFE8E8",
    "#FFD1D1",
    "#FFF8F8",
    "#EFD9D9",
    "#F5E8E8",
  ]
};

// 這裡定義一個隨機的一組目標顏色供各關卡使用
const getRandomColorSet = () => {
  const targetColors = [
    "#FF5733", // 橙紅色
    "#00A86B", // 綠色
    "#4682B4", // 鋼藍色
    "#9370DB", // 中紫色
    "#FF69B4", // 熱粉紅
    "#FFD700", // 金黃色
    "#F08080", // 淺珊瑚色
    "#20B2AA", // 淺海綠色
    "#6495ED", // 矢車菊藍
    "#FFA07A", // 淺鮭色
  ];
  
  // 隨機打亂順序
  return [...targetColors].sort(() => Math.random() - 0.5).slice(0, 5);
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
      name: "levelName1",
      type: "reference",
      cardCount: 4,
      timeLimit: 40, // 秒
      targetColor: randomTargetColors[0], // 隨機顏色
      colorPalette: initialColorPalettes.easy,
      description: "levelDesc1",
    },
    {
      id: 2,
      name: "levelName2",
      type: "system",
      cardCount: 4,
      timeLimit: 30, // 秒
      targetColor: randomTargetColors[1], // 隨機顏色
      colorPalette: initialColorPalettes.easy,
      description: "levelDesc2",
    },
    {
      id: 3,
      name: "levelName3",
      type: "reference",
      cardCount: 6,
      timeLimit: 50, // 秒
      targetColor: randomTargetColors[2], // 隨機顏色
      colorPalette: initialColorPalettes.medium,
      description: "levelDesc3",
    },
    {
      id: 4,
      name: "levelName4",
      type: "system",
      cardCount: 6,
      timeLimit: 35, // 秒
      targetColor: randomTargetColors[3], // 隨機顏色
      colorPalette: initialColorPalettes.medium,
      description: "levelDesc4",
    },
    {
      id: 5,
      name: "levelName5",
      type: "reference", // 保持 Reference 以強調其在複雜情況下的成本
      cardCount: 8,
      timeLimit: 60, // 秒
      targetColor: randomTargetColors[4], // 隨機顏色
      colorPalette: initialColorPalettes.hard,
      description: "levelDesc5",
    },
  ];
}; 