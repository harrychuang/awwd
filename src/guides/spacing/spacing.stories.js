import React, { useContext } from 'react';
import MaterialIcon from 'material-icons-react'
// Local Components
import { DocMain } from '../../doc/DocMain'
import ClipboardCopyContext from '../../doc/ClipboardCopyContext' // Import ClipboardCopyContext
// Json
import data from './data.json'

export default {
  title: 'Guides/Spacing',
  parameters: { 
    docs: { 
      page: null ,
    } 
  }
}

const DsSpacingCardListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy
  
  return data.boxSpacing.map((spacingData, index) => (
    <div className='card-list__item' key={index.toString()}>
      <div
        className='card-list__item__typo font-p'
      >
        <b className='font-p-lg font-w--semibold'>{spacingData.Title}</b>
      </div>
      <div className='card-list__item__info'>
        <span className='info info--helper'>
          {spacingData.helper}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(`${spacingData.helper}`)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--classname'>
          .{spacingData.class}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(spacingData.class)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
        <span className='info info--value'>
          {spacingData.value}
          <button
            type='button'
            className='copy'
            onClick={() => clipboardCopy(spacingData.value)}
          >
            <MaterialIcon icon='content_copy' />
          </button>
        </span>
      </div>
    </div>
  ))
}

const DsSpacingExampleItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy

  return data.boxSpacing.map((spacingData, index) => (
    <div
      className={`
        ${spacingData.class}
        spacing-box
        font-p
        DarkColor
      `}
      key={index.toString()}
    >
      <div className='spacing-label'>{`${spacingData.Title} : ${spacingData.value}`}</div>
      <span className='spacing-line' style={{backgroundColor: '#8C89F6', width: `${spacingData.value}`}} />
    </div>
  ))
}

const Template = () => (
  <DocMain>
    <h1 className='sbdocs-h1'>Spacing</h1>
    <p>
      When several items are in close proximity to each other,
      they become one visual unit rather than several separate units.
      Otherwise, their distance should be larger and look more like several visual units.
      The basic purpose of proximity is to organize.
      To give an apparent view of the page structure and the hierarchy of information to users.
    </p>
    <h2 className='sbdocs-h2'>The relation of vertical spacing</h2>
    <p>
      Divide the hierarchy of information through 7 formats:<br />
      <h6 className='sbdocs-h6'>
        {`Spacing {xxl} / Spacing {xl} / Spacing {lg} / Spacing {med} / Spacing {rg} / Spacing {sm} / Spacing {xs}`}
      </h6>
    </p>
    <h2 className='sbdocs-h2'>Usage</h2>
    <h6 className='sbdocs-h6'>* Spacing setting from &apos;styles/layout/_settings.scss&apos;</h6>
    <code>
      {'.box{ margin: var(--awwd-ref-spacing-rg); padding: var(--awwd-ref-spacing-rg); }'}
    </code>
    <h6 className='sbdocs-h6'>* Spacing css from &apos;styles/layout/common.scss&apos;</h6>
    <code>
      {'<hr class=\'awwd-spacing-vertical--rg\' />'}
    </code>
    <br /><br />
    <section className='simple-theme'>
      <article>
        <h3 className='sbdocs-h3'>Row Spacing Example</h3>
        <ul style={{ margin: '0 0 30px 0', padding: '0 0' }}>
          <DsSpacingExampleItems />
        </ul>
      </article>
    </section>
    <br />
    <DsSpacingCardListItems />
  </DocMain>
);

export const Spacing = Template.bind({});
