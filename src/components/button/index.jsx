import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * #### To trigger an operation.
 * <br />
 * ### When To Use
 *  A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.
 * ### Usage
 * `import { Button, Icon } from 'ds'`
 * <br />
 */
 export const Button = ({
  type,
  fit,
  size,
  icon,
  round,
  style,
  className,
  children,
  ...props
}) => {

  let classNameProps = `awwd-button ` +
    `${type ? `awwd-button--${type}` : ''} ` +
    `${size ? `awwd-button--${size}` : ''} ` +
    `${fit ? `awwd-button--fit` : ''} ` +
    `${icon ? 'awwd-button--icon' : ''} ` +
    `${round ? 'awwd-button--round' : ''} ` +
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
   * Can be set to `ghost` `dangerous` or omitted (meaning `default`)
   */
  type: PropTypes.string,
  /**
   * Round Styling Button
   */
  round: PropTypes.bool,
  /**
   * Make the button fit to its parent width. 
   */
  fit: PropTypes.bool,
  /**
   * Button size type: `med` or omitted (meaning `default`)
   */
  size: PropTypes.string,
  /**
   * Disabled state of button
   */
  disabled: PropTypes.bool,
  /**
   * ClassName of Button
   */
  className: PropTypes.string,
  /**
   * Style properties of button, like padding, margin, width
   */
  style: PropTypes.object,
}

Button.defaultProps = {
  className: '',
  children: null,
  type: null,
  icon: false,
  round: false,
  size: null,
  style: null,
  disabled: false,
}
