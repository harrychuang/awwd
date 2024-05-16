import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 * #### Simple rectangular container.
 * <br />
 * ### When To Use
 *  A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.
 * ### Usage
 * `import { Card } from '@awwd'`
 * <br />
 */
 export const Card = ({
  cornerSize,
  className,
  children,
  fit,
  heading,
  desc,
  style,
  shadow,
  cardPaddingSpacing,
  ...props
}) => {

  let classNameProps = `awwd-card ` +
    `${cornerSize ? `awwd-card--corner--${cornerSize}` : ''} ` +
    `${shadow ? `awwd-card--shadow--${shadow}` : ''} ` +
    `${cardPaddingSpacing ? `awwd-card--padding--${cardPaddingSpacing}` : ''} ` +
    `${fit ? `awwd-card--fit` : ''} ` +
    `${className}`

  return (
    <div
      {...props}
      className={classNameProps}
      style={style}
    >
      <div className='awwd-card__content'>
        {heading && <h3 className='awwd-card__heading'>{heading}</h3>}
        {desc && <p className='awwd-card__desc'>{desc}</p>}
        {children}
      </div>
    </div>
  )
}

Card.propTypes = {
 /**
   * It contains the content between the opening and closing tags of a component.
   */
  children: PropTypes.node,
  /**
   * Card corner's size type: `large` or omitted (meaning `default`)
   */
  cornerSize: PropTypes.string,
  /**
   * Heading of card
   */
  heading: PropTypes.string,
  /**
   * Descriptions of card
   */
  desc: PropTypes.string,
  /**
   * Make the card fit to its parent width. 
   */
  fit: PropTypes.bool,
  /**
   * Shadow of card
   */
  shadow: PropTypes.string,
  /**
   * ClassName of card
   */
  className: PropTypes.string,
  /**
   * Padding spacing of card
   */
  cardPaddingSpacing: PropTypes.bool,
  /**
   * Style properties of card, like padding, margin, width..etc
   */
  style: PropTypes.object,
}

Card.defaultProps = {
  className: '',
  cornerSize: null,
  heading: null,
  desc: null,
  style: null,
  fit: null,
  cardPaddingSpacing: false,
}
