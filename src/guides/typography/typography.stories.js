import React, { useContext } from 'react';
import MaterialIcon from 'material-icons-react'
// Local Components
import { DocMain } from '../../doc/DocMain'
import ClipboardCopyContext from '../../doc/ClipboardCopyContext' // Import ClipboardCopyContext
// Json
import data from './data.json'

export default {
  title: 'Guides/Typography',
  parameters: { 
    docs: { 
      page: null ,
    } 
  }
}

const DsFontSizeCardListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy

  return data.fontSize.map((fontData, index) => (
    <div className='card-list__item' key={index.toString()}>
      <div
        className={`
          ${fontData.class} card-list__item__typo font-w--semibold
        `} 
      >
        {fontData.Title}
      </div>
      <div className='card-list__item__info'>
        <span className='info info--mixin'>
          @include {fontData.helper}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(`@include ${fontData.helper}`)}
          >
            <MaterialIcon icon='content_copy' /></button>
        </span>
        <span className='info info--classname'>
          .{fontData.class}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(fontData.class)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--style'>
          {fontData.style}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(fontData.style)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
      </div>
    </div>
  ))
}

const DsFontFamilyCardListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy

  return data.fontFamily.map((fontData, index) => (
    <div className='card-list__item' key={index.toString()}>
      <div
        className='font-h1 card-list__item__typo'
        style={{ fontFamily: `${fontData.fontFamily}` }}
      >
        &apos;{fontData.Title}&apos;
      </div>
      <div className='card-list__item__info'>
        <span className='info info--style'>
          font-family: {fontData.fontFamily}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(`font-family: '${fontData.fontFamily}'`)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--classname'>
          .{fontData.class}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(`${fontData.class}`)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
      </div>
    </div>
  ))
}

const Template = () => (
  <DocMain>
    <h1 className='sbdocs-h1'>Typography</h1>
    <p>
      Typography is used to create clear hierarchies, 
      useful organisations, and purposeful alignments that guide users
      through our product. Using a modern design system we need to
      make sure our typography is consistent across all pages.
    </p>
    <h2 className='sbdocs-h2'>Base Font Size</h2>
    <p>The base font size is 16px.</p>
    <h2 className='sbdocs-h2'>Usage</h2>
    <h6 className='sbdocs-h6'>* Font mixin from &apos;styles/font/_settings.scss&apos;</h6>
    <code>
      {'.heading{ @include mixin-font-size-xxl; }'}
    </code>
    <h6 className='sbdocs-h6'>* Font css from &apos;styles/font.scss&apos;</h6>
    <code>
      {'<h1 class=\'awwd-sys-font-heading-xxl\'>Heading</h1>'}
    </code>
    <h2 className='sbdocs-h2'>Font Family with Weight</h2>
    <div className='card-list'>
      <DsFontFamilyCardListItems />
    </div>
    <h2 className='sbdocs-h2'>Font Size</h2>
    <div className='card-list'>
      <DsFontSizeCardListItems />
    </div>
  </DocMain>
);

export const Typography = Template.bind({})