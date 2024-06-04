import React, { useContext, useState, useEffect } from 'react'
import MaterialIcon from 'material-icons-react'
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
      page: null,
    },
  },
}

const DsIconListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy
  const [selectedTokens, setSelectedTokens] = useState({});
  const [isComponentDisabled, setIsComponentDisabled] = useState(true); // Initially set to true
  const [separator, setSeparator] = useState('-'); // Initially set to '-'

  // Set initial state
  useEffect(() => {
    const initialTokens = {};
    data.forEach(tokenGroup => {
      if (tokenGroup.Tokens.length > 0) {
        initialTokens[tokenGroup.Title] = tokenGroup.Tokens[0].name;
      }
    });
    setSelectedTokens(initialTokens);
  }, []);

  const handleTokenClick = (groupTitle, tokenName) => {
    setSelectedTokens((prevTokens) => ({
      ...prevTokens,
      [groupTitle]: tokenName,
    }));

    if (groupTitle === 'Type' && (tokenName === 'ref' || tokenName === 'sys')) {
      setIsComponentDisabled(true);
      setSelectedTokens((prevTokens) => ({
        ...prevTokens,
        'Component': data.find(group => group.Title === 'Component').Tokens[0].name,
      }));
    } else if (groupTitle === 'Type') {
      setIsComponentDisabled(false);
    }
  };

  const handleInputChange = (groupTitle, value) => {
    setSelectedTokens((prevTokens) => ({
      ...prevTokens,
      [groupTitle]: value,
    }));
  };

  const selectedTokensString = Object.values(selectedTokens)
    .filter(token => token !== null && token !== undefined && token !== "null" && token !== "")
    .join(separator);

  return (
    <div>
      <h4 className='token-name' onClick={() => clipboardCopy(selectedTokensString)}>
        {selectedTokensString} <MaterialIcon icon='content_copy' />
      </h4>
      <h4
        className={`token-name switch ${separator === '-' ? 'switch--actived' : ''}`}
        onClick={() => setSeparator('-')}
      >
        -
      </h4>
      <h4
        className={`token-name switch ${separator === '/' ? 'switch--actived' : ''}`}
        onClick={() => setSeparator('/')}
      >
        /
      </h4>
      <section className='doc-token'>
        {data.map((tokenGroup, groupKey) => {
          const isComponentGroup = tokenGroup.Title === 'Component';
          const tokensListItems = tokenGroup.Tokens.map((tokenItem, key) => {
            const tokenName = tokenItem.name;
            const isSelected = selectedTokens[tokenGroup.Title] === tokenName;
            const isDisabled = isComponentGroup && isComponentDisabled;

            return (
              <button
                type='button'
                key={key}
                className={`card-list__item card-list__item__flexible card-list__item__flexible--sm ${isSelected ? 'active' : ''}`}
                onClick={() => handleTokenClick(tokenGroup.Title, tokenName)}
                disabled={isDisabled}
                style={isDisabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
              >
                {tokenName}
              </button>
            )
          });

          return (
            <div key={groupKey} className='render-list'>
              <h3 className='sbdocs-h3'>{tokenGroup.Title}</h3>
              <input
                type='text'
                className='custom-token-input'
                placeholder={`Custom ${tokenGroup.Title}`}
                value={selectedTokens[tokenGroup.Title] || ''}
                onChange={(e) => handleInputChange(tokenGroup.Title, e.target.value)}
              />
              <ul className='card-list'>
                {tokensListItems}
              </ul>
            </div>
          )
        })}
      </section>
    </div>
  )
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
    <br />
    {/* Token List */}
    <h2 className='sbdocs-h2'>Token Naming</h2>
    <DsIconListItems />
  </DocMain>
);

export const Token = Template.bind({})
