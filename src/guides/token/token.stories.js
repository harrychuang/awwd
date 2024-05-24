import React, { useContext } from 'react'
// Local
import { Icon } from '../../components/icon'
import { DocMain } from '../../doc/DocMain'
import ClipboardCopyContext from '../../doc/ClipboardCopyContext' // Import ClipboardCopyContext

import './doc.scss'
import data from './data.json'

export default {
  title: 'Guides/Token',
  parameters: { 
    docs: { 
      page: null ,
    },
  },
}

const DsIconListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy
  
  return data.map((tokenGroup, key) => {
    const tokenItem = tokenGroup.Tokens[key]

    const tokensListItems = tokenGroup.Tokens.map((tokenItem, key) => {
      const tokenName = tokenItem.name

      return (
        <button
          type='button'
          key={key}
          className='card-list__item card-list__item__flexible card-list__item__flexible--sm'
        >
          {tokenName}
        </button>
      )
    })

    return (
      <div key={tokenGroup.Title} className='render-list'>
        <h3 className='sbdocs-h3'>{tokenGroup.Title}</h3>
        <ul className='card-list'>
          {tokensListItems}
        </ul>
      </div>
    )
  })
}

const Template = () => (
  <DocMain>
    <h1 className='sbdocs-h1'>Token</h1>
    <p>Design tokens are the building blocks of all UI elements. The same tokens are used in designs, tools, and code.
    </p>
    <h2 className='sbdocs-h2'>Import tokens</h2>
    <code>
      {'@import \'../style/settings\';'}
    </code>
    <h6 className='sbdocs-h6'>Use the token to CSS code, for example:</h6>
    <code>
      {'background-color: var(--awwd-sys-color-primary-surface);'}
    </code>
    {/* <h6 className='sbdocs-h6'>* Defining varients</h6>
    <code>
      {'<Icon type=\'home\' size=\'lg\' color=\'#ccc\' />'}
    </code> */}
    <br /><br />
    {/* Token List */}
    <h2 className='sbdocs-h2'>Token Naming</h2>
    <br /><br />
    <section className='doc-token'>
      <DsIconListItems />
    </section>
    {/* <DsIconListItems /> */}
  </DocMain>
);

export const Token = Template.bind({})