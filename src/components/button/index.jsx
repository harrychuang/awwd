import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * #### To trigger an operation.
 * <br />
 * ### When To Use
 *  A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.
 * ### Usage
 * `import { Button, Icon } from '@awwd'`
 * <br />
 */
 export const Button = ({
  type,
  fit,
  size,
  iconType,
  rounded,
  style,
  transparentBg,
  className,
  children,
  ...props
}) => {

  let classNameProps = `awwd-button ` +
    `${type ? `awwd-button--${type}` : ''} ` +
    `${size ? `awwd-button--${size}` : ''} ` +
    `${fit ? `awwd-button--fit` : ''} ` +
    `${iconType ? 'awwd-button--iconType' : ''} ` +
    `${transparentBg ? 'awwd-button--transparent-bg' : ''} ` +
    `${rounded ? 'awwd-button--rounded' : ''} ` +
    `${className}`

  return (
    <button
      {...props}
      type='button'
      className={classNameProps}
      style={style}
    >
      <div className='awwd-button__content'>
        {children}
      </div>
    </button>
  )
}

Button.propTypes = {
 /**
   * It contains the content between the opening and closing tags of a component.
   */
 children: PropTypes.node,
  /**
   * Can be set to `primary` `secondary` `gray` `success` `info` `warning` `error` or omitted (meaning `default`)
   */
  type: PropTypes.string,
  /**
   * Rounded Styling Button
   */
  rounded: PropTypes.bool,
  /**
   * Make the button fit to its parent width. 
   */
  fit: PropTypes.bool,
  /**
   * Button size type: `large` or omitted (meaning `default`)
   */
  size: PropTypes.string,
  /**
   * Disabled state of button
   */
  disabled: PropTypes.bool,
  /**
   * Turn to a transparent background
   */
  transparentBg: PropTypes.bool,
  /**
   * ClassName of Button
   */
  className: PropTypes.string,
  /**
   * Style properties of button, like padding, margin, width..etc
   */
  style: PropTypes.object,
}

Button.defaultProps = {
  className: '',
  children: null,
  type: null,
  iconType: false,
  rounded: false,
  size: null,
  style: null,
  transparentBg: false,
  disabled: false,
}
