import React from 'react'
import PropTypes from 'prop-types'
import copy from 'clipboard-copy'
// Antd
import { message } from 'antd'
// Style
import '../components/style/color/color.scss'
import '../components/style/font/font.scss'
import '../components/style/layout/layout.scss'
import "./style/index.scss"
import ClipboardCopyContext from './ClipboardCopyContext' // Import ClipboardCopyContext

const DocMain = ({
  children
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const clipboardCopy = (clipboardTxt) => { // Move clipboardCopy into DocMain
    copy(clipboardTxt)
    messageApi.open({
      type: 'success',
      content: `${clipboardTxt} is Copied!`,
    })
  }

  return(
    <div className='sbdocs-main'>
      {contextHolder}
      <ClipboardCopyContext.Provider value={clipboardCopy}> {/* Use ClipboardCopyContext.Provider */}
        {children}
      </ClipboardCopyContext.Provider>
    </div>
  )
}


DocMain.propTypes = {
  children: PropTypes.node,
  clipboardCopy: PropTypes.func, // Add clipboardCopy to propTypes
}

DocMain.defaultProps = {
  children: <React.Fragment />,
  clipboardCopy: () => {}, // Add a default function for clipboardCopy
}

export {DocMain}
