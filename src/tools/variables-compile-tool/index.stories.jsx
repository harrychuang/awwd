import React from 'react';
import { DocMain } from '../../doc/DocMain';
import Converter from './converter';
import './doc.scss';

export default {
  title: 'Tools/Variables Compile Tool',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

const Template = () => (
  <DocMain>
    <h1 className="sbdocs-h1">Variables Compile Tool</h1>
    <p>
      將 CSS Variables 轉譯成行動端可用的 Design Tokens 程式碼檔（Android Compose、iOS UIKit）。
    </p>
    <Converter />
  </DocMain>
);

export const Default = Template.bind({});
Default.storyName = 'Variables Compile Tool';


