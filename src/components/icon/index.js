// Node
import React from 'react'
import PropTypes from 'prop-types'
// Style
import './index.scss'
import '../style/layout/_settings.scss'

export const Icon = ({
  type,
  style,
  className,
  id,
  color,
  size,
  prefix,
  surfix
}) => {
  let fixIconPosition = '-5px'
  let iconMargin = '5px'

  let colorStyle = {
    color: color === null ? null : color
  }
  let sizeStyle = {}

  // Prefix and Surfix Fixing
  let preFixStyle = prefix ? {
    marginLeft: fixIconPosition,
    marginRight: iconMargin
  } : ''

  let surFixStyle = surfix ? {
    marginLeft: iconMargin,
    marginRight: fixIconPosition
  } : ''

  switch(size){
    case 'lg':
      sizeStyle = { fontSize: 'var(--awwd-sys-size-element-rg)' }
      break
    case 'default':
      sizeStyle = { fontSize: 'var(--awwd-sys-size-element-sm)' }
      break
    case 'sm':
      sizeStyle = { fontSize: 'var(--awwd-sys-size-element-xs)' }
      break
    default:
      sizeStyle = {
        fontSize: size === null ? 'var(--awwd-sys-size-element-sm)' : size,
        fontSize: size === null ? 'var(--awwd-sys-size-element-sm)' : size,
      }
      break
  }

  const propsStyle = { ...sizeStyle, ...colorStyle, ...preFixStyle, ...surFixStyle, ...style }

  return(
    <i
      id={id}
      className={`awwd-icon awwd-icon-${type} ${className}`}
      style={propsStyle}
    />
  )
}

// Prop Types
Icon.defaultProps = {
  type: null,
  style: null,
  className: '',
  id: null,
  color: null,
  size: null,
  prefix: false,
  surfix: false
}

Icon.propTypes = {
  type: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  prefix: PropTypes.bool,
  surfix: PropTypes.bool
}
