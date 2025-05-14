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

export const createLevels = (): LevelConfig[] => [
  {
    id: 1,
    name: "第一關：點點相連",
    type: "reference",
    cardCount: 4,
    timeLimit: 40, // 秒
    targetColor: "#FF3B30", // 紅色
    colorPalette: initialColorPalettes.easy,
    description: "挑戰開始！請點擊每一張卡牌，將它們的顏色都變成指定的紅色。",
  },
  {
    id: 2,
    name: "第二關：系統之力初顯",
    type: "system",
    cardCount: 4,
    timeLimit: 30, // 秒
    targetColor: "#007AFF", // 藍色
    colorPalette: initialColorPalettes.easy,
    description: "試試看 System Token 的威力！只需要改變上方的「系統顏色」，所有卡牌顏色將會同步更新為藍色。",
  },
  {
    id: 3,
    name: "第三關：眼明手快",
    type: "reference",
    cardCount: 6,
    timeLimit: 50, // 秒
    targetColor: "#34C759", // 綠色
    colorPalette: initialColorPalettes.medium,
    description: "卡牌變多了！繼續使用 Reference Token 的方式，逐一點擊卡牌，將它們都變成綠色。",
  },
  {
    id: 4,
    name: "第四關：效率的奧秘",
    type: "system",
    cardCount: 6,
    timeLimit: 35, // 秒
    targetColor: "#AF52DE", // 紫色
    colorPalette: initialColorPalettes.medium,
    description: "再次感受 System Token 的便捷。一次調整，所有卡牌都會變成漂亮的紫色。",
  },
  {
    id: 5,
    name: "第五關：終極挑戰",
    type: "reference", // 保持 Reference 以強調其在複雜情況下的成本
    cardCount: 8,
    timeLimit: 60, // 秒
    targetColor: "#FF9500", // 橘色
    colorPalette: initialColorPalettes.hard,
    description: "最後一關！面對更多的卡牌，展現你修改 Reference Token 的耐心與技巧，將它們全部變為橘色吧！",
  },
]; 