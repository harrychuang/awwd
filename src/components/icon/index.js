// Node
import React, {useEffect, useState} from 'react'
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
  const [iconSizeXs, setIconSizeXs] = useState('')
  const [iconSizeSm, setIconSizeSm] = useState('')
  const [iconSizeLg, setIconSizeLg] = useState('')

  useEffect(() => {
    const root = document.documentElement;
    setIconSizeXs(getComputedStyle(root).getPropertyValue('--awwd-sys-size-element-xxs').trim());
    setIconSizeSm(getComputedStyle(root).getPropertyValue('--awwd-sys-size-element-sm').trim());
    setIconSizeLg(getComputedStyle(root).getPropertyValue('--awwd-sys-size-element-rg').trim());
  }, []);

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
      sizeStyle = { fontSize: iconSizeLg }
      break
    case 'med':
      sizeStyle = { fontSize: iconSizeSm }
      break
    case 'sm':
      sizeStyle = { fontSize: iconSizeXs }
      break
    default:
      sizeStyle = {
        fontSize: size === null ? iconSizeSm : size,
        fontSize: size === null ? iconSizeSm : size,
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
