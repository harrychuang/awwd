/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import MaterialIcon from 'material-icons-react'
// Local
import { DocMain } from '../../doc/DocMain'
import ClipboardCopyContext from '../../doc/ClipboardCopyContext' // Import ClipboardCopyContext
// Json
import data from './data.json'

export default {
  title: 'Guides/Color',
  component: DocMain,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
}

const DsColorsListItems = () => { // Add clipboardCopy as a prop
  const clipboardCopy = useContext(ClipboardCopyContext)
  const theme = document.documentElement.getAttribute('data-theme')

  return data.map((colorData) => {
    const colorsListItems = Object.keys(colorData.Colors).map((key) => {
      const colorItem = colorData.Colors[key]
      const colorHex = theme === 'dark' ? colorItem.hexDarkTheme : colorItem.hex

      // Color hex section without gradient color
      const colorHexList = (
        <div className='info info--value'>
          {colorHex}
          <button type='button' className='copy' onClick={() => clipboardCopy(colorHex)}>
            <MaterialIcon icon='content_copy' />
          </button>
        </div>
      )

      // Color helper, need add '@extend' for gradient color
      const colorHelper = colorData.Gradient ? `@extend ${colorItem.helper}` : colorItem.helper

      return (
        <div
          key={colorItem.helper}
          className={`card-list__item  ${colorData.DarkTheme ? 'card-list__item--dark-theme' : ''} `}
        >
          <div
            style={{ backgroundColor: colorItem.helper }}
            className={`
              card-list__item__color
              ${colorItem.bgColorCss}
            `}
          />
          <div className='card-list__item__info'>
            {colorData.Gradient ? null : colorHexList}
            <div className='info info--helper'>
              {colorItem.helper}
              <button type='button' className='copy' onClick={() => clipboardCopy(colorHelper)}>
                <MaterialIcon icon='content_copy' />
              </button>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div key={colorData.Title} className='render-list'>
        <h3  className='sbdocs-h3'>{colorData.Title}</h3>
        <div className={`card-list ${colorData.DarkTheme ? 'card-list--dark-theme' : ''}`}>
          { colorsListItems }
        </div>
      </div>
    )
  })
}

const Template = () => (
  <DocMain>
    <h1 className='sbdocs-h1'>Color</h1>
    <p>awwd Design System uses colors purposefully to communicate how things function in the interface.
    This helps us create visual patterns that can make interacting with our product
    easier and more predictable for merchants. Although we value an aesthetically pleasing
    use of colour, we place a higher value on
    clear communication. Use of colour should be purposeful, rational,
    and should serve to support the purpose of the content.
    </p>
    <h2 className='sbdocs-h2'>Usage</h2>
    <h6 className='sbdocs-h6'>* Color setting from &apos;styles/color/_settings.scss&apos;</h6>
    <code>
      {`background-color: var(--awwd-sys-color-primary-surface);`}
    </code>
    <br /><br />
    <DsColorsListItems />
  </DocMain>
);

export const Color = Template.bind({})