import { addons } from '@storybook/manager-api';
import awwdtheme from './awwdtheme';

addons.setConfig({
  theme: awwdtheme,
  panelPosition: 'right',
  showPanel: false,
});