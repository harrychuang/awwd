/** @type { import('@storybook/react').Preview } */

import { withThemeByClassName } from '@storybook/addon-themes';

const themeBackgrounds = {
  light: '#f7f7f7',
  dark: '#0B0D12'
}

export const decorators = [
  (Story, context) => {
    // setting theme
    document.documentElement.setAttribute('data-theme', context.globals.theme);
    // setting background by theme
    document.body.style.backgroundColor = themeBackgrounds[context.globals.theme];
    return <Story />;
  },
];

export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      // The label to show for this toolbar item
      title: 'Theme',
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
};
