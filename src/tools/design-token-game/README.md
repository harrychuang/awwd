# Design Token Game 設計代幣遊戲

## 新功能：迷你元件預覽

### 功能描述
每個 TokenCard 卡片上方現在都會顯示一個對應的迷你 UI 元件，讓玩家更直覺地理解每張卡片代表的設計元素：

- **卡片寬度**：迷你元件寬度控制在 80px 以內
- **視覺反饋**：迷你元件會根據卡片顏色實時更新
- **雙語支援**：支援中文和英文介面
- **匹配狀態**：當卡片匹配成功時，迷你元件也會有相應的視覺反饋

### 支援的元件類型（已優化為11種核心元件）

1. **Icon 圖示** - 顯示星形圖示
2. **Card 卡片** - 顯示迷你卡片背景  
3. **Button 按鈕** - 顯示迷你按鈕
4. **Heading 標題** - 顯示標題文字
5. **Link 連結** - 顯示連結文字
6. **Border 邊框** - 顯示邊框樣式
7. **Message 訊息** - 顯示訊息文字
8. **Success 成功** - 顯示成功狀態
9. **Divider 分隔線** - 顯示分隔線
10. **Input 輸入框** - 顯示輸入框
11. **Progress 進度條** - 顯示進度條

### 技術實現

#### 新增檔案
- `MiniComponent.jsx` - 迷你元件主檔案
- 更新 `TokenCard.jsx` - 整合迷你元件
- 更新 `style.scss` - 添加迷你元件樣式

#### 結構變更
```jsx
// 舊結構
<TokenCard />

// 新結構
<div className="token-card-container">
  <MiniComponent elementType={elementComment} color={color} />
  <TokenCard />
</div>
```

### 使用方式

迷你元件會自動根據卡片的 `elementComment` 屬性選擇對應的 UI 元件類型，並使用卡片的 `color` 屬性來渲染相應的顏色效果。

### 樣式特色

- **像素風格**：保持與遊戲整體 8-bit 風格一致
- **響應式設計**：在不同螢幕尺寸下都能正常顯示
- **動畫效果**：支援匹配成功時的視覺反饋
- **無障礙設計**：保持良好的可讀性和對比度

---

## 遊戲玩法

透過實際操作體驗 Design Token 與 Hardcoded Value 的差異：

1. **原始咒語關卡** - 逐一點擊卡片修改顏色
2. **魔法符文關卡** - 一次性修改所有卡片顏色
3. **效率對比** - 感受兩種方法的效率差異

## 開發與部署

```bash
# 開發模式
npm run dev

# 建置 Storybook
npm run build-storybook

# 建置專案
npm run build
```

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