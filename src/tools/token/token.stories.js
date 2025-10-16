import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import MaterialIcon from 'material-icons-react'
// Local
import { DocMain } from '../../doc/DocMain'
import ClipboardCopyContext from '../../doc/ClipboardCopyContext' // Import ClipboardCopyContext

import './doc.scss'
import data from './data.json'

export default {
  title: 'Tools/Token',
  parameters: { 
    docs: { 
      page: null,
    },
  },
}

const STORAGE_KEY = 'awwd-token-tool-state'
const DISABLED_TYPES = ['ref', 'sys']

const cloneTokenGroups = (groups = []) =>
  groups.map((group) => ({
    Title: group.Title,
    Tokens: Array.isArray(group.Tokens)
      ? group.Tokens.map((token) =>
          typeof token === 'string' ? { name: token } : { name: token?.name ?? '' },
        ).filter((token) => token.name !== '')
      : [],
  }))

const ensureSelections = (groups, selections = {}) => {
  const nextSelections = {}

  groups.forEach((group) => {
    const tokenNames = group.Tokens.map((token) => token.name)
    const candidate = selections[group.Title]

    if (candidate && tokenNames.includes(candidate)) {
      nextSelections[group.Title] = candidate
    } else if (tokenNames.length > 0) {
      nextSelections[group.Title] = tokenNames[0]
    } else {
      nextSelections[group.Title] = ''
    }
  })

  return nextSelections
}

const createDefaultState = () => {
  const tokenGroups = cloneTokenGroups(data)
  const selectedTokens = ensureSelections(tokenGroups)

  return {
    tokenGroups,
    selectedTokens,
    separator: '-',
  }
}

const normalizeImportedState = (source, fallbackState) => {
  const fallbackGroups = cloneTokenGroups(fallbackState.tokenGroups)
  const fallbackSelected = ensureSelections(fallbackGroups, fallbackState.selectedTokens)
  const fallbackSeparator = fallbackState.separator

  if (!source || typeof source !== 'object') {
    return {
      tokenGroups: fallbackGroups,
      selectedTokens: fallbackSelected,
      separator: fallbackSeparator,
    }
  }

  const parsedGroups = Array.isArray(source.tokenGroups)
    ? cloneTokenGroups(source.tokenGroups).filter((group) => Boolean(group.Title))
    : fallbackGroups

  const groups = parsedGroups.length > 0 ? parsedGroups : fallbackGroups
  const selectedTokens =
    source.selectedTokens && typeof source.selectedTokens === 'object'
      ? ensureSelections(groups, source.selectedTokens)
      : ensureSelections(groups, fallbackSelected)

  const separator = source.separator === '/' ? '/' : '-'

  return { tokenGroups: groups, selectedTokens, separator }
}

const DsIconListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy
  const defaultState = useMemo(() => createDefaultState(), [])
  const [tokenGroups, setTokenGroups] = useState(defaultState.tokenGroups)
  const [selectedTokens, setSelectedTokens] = useState(defaultState.selectedTokens)
  const [separator, setSeparator] = useState(defaultState.separator)
  const [isComponentDisabled, setIsComponentDisabled] = useState(
    DISABLED_TYPES.includes(defaultState.selectedTokens.Type),
  ) // Initially set to true
  const [isInitialized, setIsInitialized] = useState(false)
  const fileInputRef = useRef(null)

  // Load stored configuration (if available)
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsInitialized(true)
      return
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)

      if (stored) {
        const parsed = JSON.parse(stored)
        const normalized = normalizeImportedState(parsed, defaultState)

        setTokenGroups(normalized.tokenGroups)
        setSelectedTokens(normalized.selectedTokens)
        setSeparator(normalized.separator)
        setIsComponentDisabled(DISABLED_TYPES.includes(normalized.selectedTokens.Type))
      }
    } catch (error) {
      console.error('Failed to load token tool state:', error)
    } finally {
      setIsInitialized(true)
    }
  }, [defaultState])

  // Persist configuration to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') {
      return
    }

    try {
      const payload = JSON.stringify({ tokenGroups, selectedTokens, separator })
      window.localStorage.setItem(STORAGE_KEY, payload)
    } catch (error) {
      console.error('Failed to persist token tool state:', error)
    }
  }, [isInitialized, tokenGroups, selectedTokens, separator])

  useEffect(() => {
    setIsComponentDisabled(DISABLED_TYPES.includes(selectedTokens.Type))
  }, [selectedTokens.Type])

  const ensureComponentFallback = (nextSelectedTokens, nextTokenGroups = tokenGroups) => {
    if (!DISABLED_TYPES.includes(nextSelectedTokens.Type)) {
      return nextSelectedTokens
    }

    const componentGroup = nextTokenGroups.find((group) => group.Title === 'Component')

    if (!componentGroup) {
      return nextSelectedTokens
    }

    const fallbackComponent = componentGroup.Tokens[0]?.name ?? ''

    if (nextSelectedTokens.Component === fallbackComponent) {
      return nextSelectedTokens
    }

    return {
      ...nextSelectedTokens,
      Component: fallbackComponent,
    }
  }

  const handleTokenClick = (groupTitle, tokenName) => {
    if (groupTitle === 'Component' && isComponentDisabled) {
      return
    }

    setSelectedTokens((prevTokens) => {
      const updatedTokens = {
        ...prevTokens,
        [groupTitle]: tokenName,
      }

      const shouldDisable = groupTitle === 'Type' && DISABLED_TYPES.includes(tokenName)

      if (groupTitle === 'Type') {
        setIsComponentDisabled(shouldDisable)
      }

      return ensureComponentFallback(updatedTokens)
    })
  }

  const handleInputChange = (groupTitle, value) => {
    setSelectedTokens((prevTokens) => {
      const nextTokens = {
        ...prevTokens,
        [groupTitle]: value,
      }

      if (groupTitle === 'Type') {
        const shouldDisable = DISABLED_TYPES.includes(value)
        setIsComponentDisabled(shouldDisable)
      }

      return ensureComponentFallback(nextTokens)
    })
  }

  const handleAddToken = (groupTitle) => {
    const rawValue = selectedTokens[groupTitle]
    const value = (rawValue || '').trim()

    if (!value) {
      return
    }

    setTokenGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.Title !== groupTitle) {
          return group
        }

        const exists = group.Tokens.some((token) => token.name === value)

        if (exists) {
          return group
        }

        return {
          ...group,
          Tokens: [...group.Tokens, { name: value }],
        }
      }),
    )
  }

  const handleRemoveToken = (groupTitle, tokenName) => {
    setTokenGroups((prevGroups) => {
      const nextGroups = prevGroups.map((group) => {
        if (group.Title !== groupTitle) {
          return group
        }

        return {
          ...group,
          Tokens: group.Tokens.filter((token) => token.name !== tokenName),
        }
      })

      setSelectedTokens((prevTokens) => {
        if (prevTokens[groupTitle] !== tokenName) {
          return ensureComponentFallback(prevTokens, nextGroups)
        }

        const targetGroup = nextGroups.find((group) => group.Title === groupTitle)
        const fallbackToken = targetGroup?.Tokens[0]?.name ?? ''

        const updatedTokens = {
          ...prevTokens,
          [groupTitle]: fallbackToken,
        }

        return ensureComponentFallback(updatedTokens, nextGroups)
      })

      return nextGroups
    })
  }

  const handleExport = () => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const payload = JSON.stringify({ tokenGroups, selectedTokens, separator }, null, 2)
      const blob = new Blob([payload], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'token-configuration.json'
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export token tool configuration:', error)
    }
  }

  const handleImport = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = (loadEvent) => {
      try {
        const content = loadEvent.target?.result

        if (typeof content !== 'string') {
          throw new Error('Invalid file content')
        }

        const parsed = JSON.parse(content)
        const normalized = normalizeImportedState(parsed, defaultState)

        setTokenGroups(normalized.tokenGroups)
        setSelectedTokens(normalized.selectedTokens)
        setSeparator(normalized.separator)
        setIsComponentDisabled(DISABLED_TYPES.includes(normalized.selectedTokens.Type))
      } catch (error) {
        console.error('Failed to import token tool configuration:', error)
        if (typeof window !== 'undefined') {
          window.alert('Import failed. Please make sure the file format is correct.')
        }
      } finally {
        event.target.value = ''
      }
    }

    reader.readAsText(file)
  }

  const handleReset = () => {
    const defaultConfiguration = createDefaultState()

    setTokenGroups(defaultConfiguration.tokenGroups)
    setSelectedTokens(defaultConfiguration.selectedTokens)
    setSeparator(defaultConfiguration.separator)
    setIsComponentDisabled(DISABLED_TYPES.includes(defaultConfiguration.selectedTokens.Type))

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch (error) {
        console.error('Failed to clear stored token tool state:', error)
      }
    }
  }

  const selectedTokensString = tokenGroups
    .map((group) => selectedTokens[group.Title])
    .filter(
      (token) => token !== null && token !== undefined && token !== 'null' && token !== '',
    )
    .join(separator)

  return (
    <div>
      <div className='token-toolbar'>
        <div className='token-toolbar__primary'>
          <h4 className='token-name' onClick={() => clipboardCopy(selectedTokensString)}>
            {selectedTokensString || '--'} <MaterialIcon icon='content_copy' />
          </h4>
          <div className='token-toolbar__separator'>
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
          </div>
        </div>
        <div className='token-actions'>
          <button type='button' className='token-actions__button' onClick={handleExport}>
            <MaterialIcon icon='file_download' />
            Export
          </button>
          <button
            type='button'
            className='token-actions__button'
            onClick={() => fileInputRef.current?.click()}
          >
            <MaterialIcon icon='file_upload' />
            Import
          </button>
          <button type='button' className='token-actions__button' onClick={handleReset}>
            <MaterialIcon icon='refresh' />
            Reset
          </button>
          <input
            ref={fileInputRef}
            type='file'
            accept='application/json'
            className='token-actions__file-input'
            onChange={handleImport}
          />
        </div>
      </div>
      <section className='doc-token'>
        {tokenGroups.map((tokenGroup, groupKey) => {
          const isComponentGroup = tokenGroup.Title === 'Component';
          const tokensListItems = tokenGroup.Tokens.map((tokenItem, key) => {
            const tokenName = tokenItem.name;
            const isSelected = selectedTokens[tokenGroup.Title] === tokenName;
            const isDisabled = isComponentGroup && isComponentDisabled;

            const allowDelete = tokenName !== 'null'

            return (
              <li
                key={key}
                className={`token-option ${isSelected ? 'token-option--active' : ''}`}
              >
                <button
                  type='button'
                  className={`card-list__item card-list__item__flexible card-list__item__flexible--sm ${isSelected ? 'active' : ''}`}
                  onClick={() => handleTokenClick(tokenGroup.Title, tokenName)}
                  disabled={isDisabled}
                  style={isDisabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                >
                  {tokenName}
                </button>
                {allowDelete && (
                  <button
                    type='button'
                    className='token-option__delete'
                    onClick={(event) => {
                      event.stopPropagation()
                      handleRemoveToken(tokenGroup.Title, tokenName)
                    }}
                    aria-label={`Remove ${tokenName} from ${tokenGroup.Title}`}
                  >
                    <MaterialIcon icon='close' />
                  </button>
                )}
              </li>
            )
          });

          return (
            <div key={groupKey} className='render-list'>
              <h3 className='sbdocs-h3'>{tokenGroup.Title}</h3>
              <div className='token-input'>
                <input
                  type='text'
                  className='custom-token-input'
                  placeholder={`Custom ${tokenGroup.Title}`}
                  value={selectedTokens[tokenGroup.Title] || ''}
                  onChange={(e) => handleInputChange(tokenGroup.Title, e.target.value)}
                />
                <button
                  type='button'
                  className='token-input__add'
                  onClick={() => handleAddToken(tokenGroup.Title)}
                  aria-label={`Add ${selectedTokens[tokenGroup.Title] || 'token'}`}
                >
                  <MaterialIcon icon='add' />
                </button>
              </div>
              <ul className='card-list token-option-list'>
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
