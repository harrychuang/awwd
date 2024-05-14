// Node
import React from 'react'
import PropTypes from 'prop-types'
// Style
import './index.scss'

export const Icon = ({
  type,
  style,
  className,
  id,
  color,
  size,
}) => {
  let colorStyle = {
    color: color === null ? null : color
  }
  let sizeStyle = {}

  switch(size){
    case 'lg':
      sizeStyle = { fontSize: '36px' }
      break
    case 'med':
      sizeStyle = { fontSize: '24px' }
      break
    case 'sm':
      sizeStyle = { fontSize: '18px' }
      break
    default:
      sizeStyle = {
        fontSize: size === null ? '24px' : size,
        fontSize: size === null ? '24px' : size,
      }
      break
  }

  const propsStyle = { ...sizeStyle, ...colorStyle, ...style }

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
  size: null
}

Icon.propTypes = {
  type: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string
}
