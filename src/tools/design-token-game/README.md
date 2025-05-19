# 設計代碼遊戲 (Design Token Game)

這個遊戲專案是設計系統的一部分，可以獨立構建並分享，同時也能在 Storybook 中做為 demo 使用。

## 如何開發

### 在 Storybook 中開發
```bash
# 在專案根目錄執行
yarn storybook  # 或 npm run storybook
```

### 獨立開發遊戲
```bash
# 在專案根目錄執行
yarn dev-game  # 或 npm run dev-game
```
這將啟動一個獨立的 Vite 開發服務器，專門用於遊戲開發。

## 如何構建

### 構建整個專案 (包含 Storybook)
```bash
# 在專案根目錄執行
yarn build-storybook  # 或 npm run build-storybook
```

### 構建獨立遊戲
```bash
# 在專案根目錄執行
yarn build-game  # 或 npm run build-game
```
這將構建獨立的遊戲到 `public/game` 目錄。構建完成後，你可以：
1. 通過 Web 服務器訪問此目錄
2. 將 `public/game` 目錄複製到任何 Web 服務器來部署

## 資源文件

遊戲使用以下資源：
- 圖片: `public/game/*.png` 
- 字體: `src/tools/design-token-game/fonts/`

構建過程會自動複製這些資源到構建目錄。

## 注意事項

1. 獨立構建時，圖片路徑使用相對路徑，確保在任何環境都能正常顯示
2. 在 Storybook 中時，會使用絕對路徑，確保在 Storybook 環境中正常顯示

## 技術堆疊

- React
- Vite (用於獨立構建)
- Zustand (狀態管理)
- SCSS (樣式) 