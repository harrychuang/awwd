```markdown
# awwd

## Project Overview

`awwd` 是一個使用 Next.js 和 Storybook 開發的項目。此項目包含了開發和構建應用程序所需的各種腳本和依賴。

## Getting Started

### Prerequisites

- Node.js (建議使用最新穩定版)
- npm 或 Yarn (已包含在 Node.js 中)

### Installation

首先，克隆此倉庫到本地：

```bash
git clone git@github.com:harrychuang/awwd.git
cd awwd
```

然後，安裝所有必要的依賴：

使用 npm:

```bash
npm install
```

或者，使用 Yarn:

```bash
yarn install
```

### Available Scripts

#### `npm run lint` / `yarn lint`

運行 ESLint 來檢查代碼。

使用 npm:

```bash
npm run lint
```

或者，使用 Yarn:

```bash
yarn lint
```

#### `npm run storybook` / `yarn storybook`

在開發模式下運行 Storybook。打開 [http://localhost:6006](http://localhost:6006) 查看。

使用 npm:

```bash
npm run storybook
```

或者，使用 Yarn:

```bash
yarn storybook
```

#### `npm run build-storybook` / `yarn build-storybook`

構建 Storybook 以進行生產環境使用。生成的文件將存儲在 `storybook-static` 文件夾中。

使用 npm:

```bash
npm run build-storybook
```

或者，使用 Yarn:

```bash
yarn build-storybook
```

#### `npm run chromatic` / `yarn chromatic`

運行 Chromatic 進行視覺回歸測試。

使用 npm:

```bash
npm run chromatic
```

或者，使用 Yarn:

```bash
yarn chromatic
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