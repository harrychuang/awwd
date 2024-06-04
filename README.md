根據您的 `package.json`，這裡是生成的 `README.md` 內容：

```markdown
# awwd

## Project Overview

`awwd` 是一個使用 Next.js 和 Storybook 開發的項目。此項目包含了開發和構建應用程序所需的各種腳本和依賴。

## Getting Started

### Prerequisites

- Node.js (建議使用最新穩定版)
- npm (已包含在 Node.js 中)

### Installation

首先，克隆此倉庫到本地：

```bash
git clone git@github.com:harrychuang/awwd.git
cd awwd
```

然後，安裝所有必要的依賴：

```bash
npm install
```

### Available Scripts

在項目根目錄中，您可以運行以下腳本：

#### `npm run dev`

在開發模式下運行應用程序。打開 [http://localhost:3000](http://localhost:3000) 查看。

```bash
npm run dev
```

#### `npm run build`

構建應用程序以進行生產環境使用。生成的文件將存儲在 `.next` 文件夾中。

```bash
npm run build
```

#### `npm run start`

在生產模式下運行構建後的應用程序。

```bash
npm run start
```

#### `npm run lint`

運行 ESLint 來檢查代碼。

```bash
npm run lint
```

#### `npm run storybook`

在開發模式下運行 Storybook。打開 [http://localhost:6006](http://localhost:6006) 查看。

```bash
npm run storybook
```

#### `npm run build-storybook`

構建 Storybook 以進行生產環境使用。生成的文件將存儲在 `storybook-static` 文件夾中。

```bash
npm run build-storybook
```

#### `npm run chromatic`

運行 Chromatic 進行視覺回歸測試。

```bash
npm run chromatic
```

## Dependencies

- **antd**: ^5.17.0
- **next**: 14.2.3
- **react**: ^18
- **react-dom**: ^18
- **react-transition-group**: ^4.4.5

## Dev Dependencies

- **@chromatic-com/storybook**: ^1.3.5
- **@storybook/addon-designs**: ^8.0.2
- **@storybook/addon-essentials**: ^8.0.10
- **@storybook/addon-interactions**: ^8.0.10
- **@storybook/addon-links**: ^8.0.10
- **@storybook/addon-onboarding**: ^8.0.10
- **@storybook/addon-styling-webpack**: ^1.0.0
- **@storybook/addon-themes**: ^8.0.10
- **@storybook/addons**: ^7.6.17
- **@storybook/api**: ^7.6.17
- **@storybook/blocks**: ^8.0.10
- **@storybook/manager-api**: ^8.0.10
- **@storybook/nextjs**: ^8.0.10
- **@storybook/react**: ^8.0.10
- **@storybook/test**: ^8.0.10
- **@storybook/theming**: ^8.0.10
- **chromatic**: ^11.3.2
- **clipboard-copy**: ^4.0.1
- **eslint**: ^8
- **eslint-config-next**: 14.2.3
- **eslint-plugin-storybook**: ^0.8.0
- **material-icons-react**: ^1.0.4
- **npm**: ^10.7.0
- **sass**: ^1.77.1
- **storybook**: ^8.0.10