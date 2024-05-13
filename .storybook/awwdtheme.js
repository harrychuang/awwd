import { create } from '@storybook/theming';
import logoUrl from './logo-awwd.svg';

export default create({
  // Base
  base: 'dark',
  brandTitle: 'awwd | aww Design System',
  brandUrl: 'https://noeinoi.com/storybook',
  brandImage: logoUrl,
  brandTarget: '_blank',
  
  // Typography
  fontBase: 'Gotham, sans-serif',
  fontCode: 'monospace',

  //
  colorPrimary: '#FF1755',
  colorSecondary: '#5652F2',

  // UI
  appBg: '#0B0D12',
  appContentBg: '#0B0D12',
  appPreviewBg: '#F3F3F3',
  appBorderColor: 'rgb(33,43,54)',
  appBorderRadius: 12,

  // Text colors
  textColor: '#FFFFFF99',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barHoverColor: '#585C6D',
  barBg: '#0B0D12',

  // Form colors
  inputBg: '#0B0D12',
  inputBorder: 'rgba(255,255,255,0.2)',
  inputTextColor: '#ccc',
  inputBorderRadius: 2,
});