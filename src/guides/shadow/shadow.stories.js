import React, { useContext } from 'react';
import MaterialIcon from 'material-icons-react'
// Local Components
import { DocMain } from '../../doc/DocMain'
import ClipboardCopyContext from '../../doc/ClipboardCopyContext' // Import ClipboardCopyContext
// Json
import data from './data.json'

export default {
  title: 'Guides/Shadow',
  parameters: { 
    docs: { 
      page: null ,
    } 
  }
}

let DsShadowCardListItems = []

const DsSpacingCardListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy

  return data.boxShadow.map((shadowData, index) => (
    <div className='card-list__item' key={index.toString()}>
      <div
        className='card-list__item__typo font-p'
      >
        <b className='font-p-lg font-w--semibold'>{shadowData.Title}</b>
      </div>
      <div className='card-list__item__info'>
        <span className='info info--mixin'>
          @extend {shadowData.helper}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(`@extend ${shadowData.helper}`)}>
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--classname'>
          .{shadowData.class}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(shadowData.class)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--style'>
          {shadowData.style}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(shadowData.style)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
      </div>
    </div>
  ))
}

DsShadowCardListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy

  return data.boxShadow.map((shadowData, index) => (
    <div className='card-list__item' key={index.toString()}>
      <div
        className='card-list__item__typo font-p'
      >
        <b className='font-p-lg font-w--semibold'>{shadowData.Title}</b>
      </div>
      <div className='card-list__item__info'>
        <span className='info info--helper'>
          {shadowData.helper}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(shadowData.helper)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--classname'>
          .{shadowData.class}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(shadowData.class)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--style'>
          {shadowData.style}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(shadowData.style)}
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
  alignItems: 'center',
  width: '15%',
  height: '20px',
  color: 'var(--storybook-doc-color-font-heading)',
  textAlign: 'center',
  padding: '40px 10px',
  margin: '20px',
  borderRadius: '24px',
  fontSize: '12px',
  lineHeight: '16px',
  backgroundColor: 'var(--storybook-doc-color-example-shadow-box)',
}

const DsBoxShadowExampleItems = () => {
  return data.boxShadow.map((shadowData, index) => (
    <li
      className={`
        ${shadowData.class}
        font-p
      `} 
      style={boxStyle}
      key={index.toString()}
    >
      <b>{shadowData.Title}</b>
    </li>
  ))
}

const Template = () => (
  <DocMain>
    <h1 className='sbdocs-h1'>Shadow</h1>
    <p>
      Shadows provide cues about depth, direction of movement, 
      and surface edges. Use shadow effects to give 
      the illusion of perspective.
    </p>
    <h2 className='sbdocs-h2'>Usage</h2>
    <h6 className='sbdocs-h6'>* Shadow mixin from &apos;styles/color/settings.scss&apos;</h6>
    <code>
      {'.shadow{ box-shadow: var(--awwd-sys-shadow-basic-long); }'}
    </code>
    <h6 className='sbdocs-h6'>* Shadow css from &apos;styles/color/common.scss&apos;</h6>
    <code>
      {'<div class=\'awwd-shadow--light--long\' />'}
    </code>
    <br /><br />
    <section className='simple-theme'>
      <article>
        <h3 className='sbdocs-h3'>Shadow Demo</h3>
        <ul style={{
          padding: '30px 0px',
          backgroundColor: 'var(--storybook-doc-color-example-shadow-container)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <DsBoxShadowExampleItems />
        </ul>
      </article>
    </section>
    <DsShadowCardListItems />
  </DocMain>
);

export const Shadow = Template.bind({});