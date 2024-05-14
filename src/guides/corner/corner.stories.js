import React, { useContext } from 'react';
import MaterialIcon from 'material-icons-react'
// Local Components
import { DocMain } from '../../doc/DocMain'
import ClipboardCopyContext from '../../doc/ClipboardCopyContext' // Import ClipboardCopyContext
// Json
import data from './data.json'

export default {
  title: 'Guides/Corner',
  parameters: { 
    docs: { 
      page: null ,
    } 
  }
}

const DsSpacingCardListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy

  return data.corner.map((cornerData, index) => ( 
    <div className='card-list__item' key={index.toString()}>
      <div
        className='card-list__item__typo font-p'
      >
        <b className='font-p-lg font-w--semibold'>{cornerData.Title}</b>
      </div>
      <div className='card-list__item__info'>
        <span className='info info--helper'>
          {cornerData.helper}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(`${cornerData.helper}`)}>
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--classname'>
          .{cornerData.class}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(cornerData.class)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--style'>
          {cornerData.style}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(cornerData.style)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
      </div>
    </div>
  ))
}

const DsCornerCardListItems = () => {
  return data.corner.map((cornerData, index) => (
    <div className='card-list__item' key={index.toString()}>
      <div
        className='card-list__item__typo font-p'
      >
        <b className='font-p-lg font-w--semibold'>{cornerData.Title}</b>
      </div>
      <div className='card-list__item__info'>
        <span className='info info--classname'>
          .{cornerData.class}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(cornerData.class)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--style'>
          {cornerData.style}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(cornerData.style)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
      </div>
    </div>
  ))
}

const boxStyle = {
  display: 'inline-block',
  minWidth: '120px',
  minHeight: '120px',
  textAlign: 'center',
  margin: '20px',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#8C89F6'
}

const CornerExampleItems = () => {
  return data.corner.map((cornerData, index) => (
    <li
      style={{
        color: 'var(--storybook-doc-color-light-a100)',
        borderRadius: cornerData.helper,
        ...boxStyle
      }}
      className='font-p' 
      key={index.toString()}
    >
      <b>{cornerData.Title}</b>
    </li>
  ))
}

const Template = () => (
  <DocMain>
    <h1 className='sbdocs-h1'>Corner</h1>
    <p>
      Apply rounded corners to an element with the border radius utility.
    </p>
    <h2 className='sbdocs-h2'>Usage</h2>
    <h6 className='sbdocs-h6'>* Corner mixin from &apos;styles/layout/_settings.scss&apos;</h6>
    <code>
      {'.corner-sm{ border-radius: var(--awwd-ref-size-corner-sm); }'}
    </code>
    <h6 className='sbdocs-h6'>* Corner css from &apos;styles/layout/_common.scss&apos;</h6>
    <code>
      {'<div class=\'awwd-size-corner--sm\'></div>'}
    </code>
    <br /><br />
    <section className='simple-theme'>
      <article>
        <h3 className='sbdocs-h3'>Corner Demo</h3>
        <ul style={{
          padding: '30px 10px',
          backgroundColor: 'var(--storybook-doc-color-example-list-box)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <CornerExampleItems />
        </ul>
      </article>
    </section>
    <DsSpacingCardListItems />
  </DocMain>
);

export const Corner = Template.bind({});