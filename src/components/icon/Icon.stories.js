import React, { useContext } from 'react'
// Local
import { DocMain } from '../../doc/DocMain'
import { Icon } from './'
import ClipboardCopyContext from '../../doc/ClipboardCopyContext' // Import ClipboardCopyContext
// Local Logo Data
import data from './data.json'

export default {
  title: 'Components/General/Icons',
  component: Icon,
  parameters: { 
    docs: { 
      page: null ,
    },
  },
}

const DsIconListItems = () => {
  const clipboardCopy = useContext(ClipboardCopyContext); // Use useContext to get clipboardCopy
  
  return data.map((iconGroup, key) => {
    const iconItem = iconGroup.Icons[key]
    const iconName = iconItem.name.replace(/_/g, ' ')
    const copyIconTxt = `<Icon type='${iconItem.name}' ${iconItem.size ? `size='${iconItem.size}'` : ''} ${iconItem.color ? `color='${iconItem.color}'` : ''} />`

    const iconsListItems = iconGroup.Icons.map((iconItem, key) => {
      const iconName = iconItem.name.replace(/_/g, ' ')
      const copyIconTxt = `<Icon type='${iconItem.name}' ${iconItem.size ? `size='${iconItem.size}'` : ''} ${iconItem.color ? `color='${iconItem.color}'` : ''} />`

      return (
        <button
          type='button'
          key={key}
          className='card-list__item card-list__item__flexible card-list__item__flexible--sm'
          onClick={() => clipboardCopy(copyIconTxt)}
        >
          <Icon
            type={`${iconItem.name}`}
            size={iconItem.size}
            color={iconItem.color}
          /><br/>
          {iconName}
          {iconItem.size ?
            <div>size: &apos;{iconItem.size}&apos;</div>
          : null}
          {iconItem.color ?
            <div>color: &apos;{iconItem.color}&apos;</div>
          : null}
        </button>
      )
    })

    return (
      <div key={iconGroup.Title} className='render-list'>
        <h3 className='sbdocs-h3'>{iconGroup.Title}</h3>
        <ul className='card-list'>
          {iconsListItems}
        </ul>
      </div>
    )
  })
}

const Template = () => (
  <DocMain>
    <h1 className='sbdocs-h1'>Icons</h1>
    <p>An icon is a graphical representation of meaning. Icons can be used to express actions,
      state, and even to categorize data. aww Design System&apos;s icons adhere to the
      following two principles and are designed for cross-platform consistency:
    </p>
    <h2 className='sbdocs-h2'>System Icons</h2>
    <code>
      {'import { Icon } from \'@awwd\''}
    </code>
    <h6 className='sbdocs-h6'>Use tag to create an icon and set its type in the type prop, for example:</h6>
    <code>
      {'<Icon type=\'home\' />'}
    </code>
    <h6 className='sbdocs-h6'>* Defining varients</h6>
    <code>
      {'<Icon type=\'home\' size=\'lg\' color=\'#ccc\' />'}
    </code>
    <br /><br />
    {/* Icon List */}
    <DsIconListItems />
  </DocMain>
);

export const Icons = Template.bind({})