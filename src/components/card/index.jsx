import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
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
  align,
  actions,
  fixedActions,
  cornerSize,
  className,
  children,
  fit,
  heading,
  desc,
  style,
  photoStyle,
  shadow,
  type,
  photo,
  cardPaddingSpacing,
  ...props
}) => {
  // Container classname
  let cardContainerClassNameProps = `awwd-card ` +
    `${cornerSize ? `awwd-card--corner--${cornerSize}` : ''} ` +
    `${shadow ? `awwd-card--shadow--${shadow}` : ''} ` +
    `${fit ? `awwd-card--fit` : ''} ` +
    `${(type === 'row' || (!!type && !!photo)) ? `awwd-card--type--${type}` : ''} ` +
    `${!!photo ? `has-photo` : ''} ` +
    `${align ? `awwd-card--align--${align}` : ''} ` +
    `${fixedActions ? 'fixed-actions' : ''} ` +
    `${className}`

  // Content classname
  let cardContentClassNameProps = `awwd-card__content ` +
    `${cardPaddingSpacing ? `awwd-card__content--padding--${cardPaddingSpacing}` : ''} `

  return (
    <div
      {...props}
      className={cardContainerClassNameProps}
      style={style}
    >
      {photo &&
        <div className='awwd-card__photo' style={photoStyle}>
          <Image src={photo} width={300} height={200} alt='photo' />
        </div>
      }
      <div
        className={cardContentClassNameProps}
      >
        {heading || desc ?
          <section className='awwd-card__content__body'>
            {heading && <h3 className='awwd-card__heading'>{heading}</h3>}
            {desc && <p className='awwd-card__desc'>{desc}</p>}
          </section>
        : null}
        {children}
      </div>
      {actions && <div className='awwd-card__actions'>{actions}</div>}
    </div>
  )
}

Card.propTypes = {
  /**
   * Align of card.
   */
  align: PropTypes.string,
  /**
   * Fixed the Actions on bottom.
   */
  fixedActions: PropTypes.bool,
  /**
   * Actions of card.
   */
  actions: PropTypes.node,
  /**
   * It contains the content between the opening and closing tags of a component.
   */
  children: PropTypes.node,
  /**
   * Card corner's size type: `large` or omitted (meaning `default`)
   */
  cornerSize: PropTypes.string,
  /**
   * Types of card. type: `cover` `row` or omitted (meaning `default`)
   */
  type: PropTypes.string,
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
   * Photo of card
   */
  photo: PropTypes.string,
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
  /**
   * Photo style properties of photo, like width, height..etc
   */
  photoStyle: PropTypes.object,
}

Card.defaultProps = {
  align: null,
  fixedActions: false,
  className: '',
  cornerSize: 'default',
  heading: null,
  desc: null,
  style: null,
  photoStyle: null,
  type: null,
  fit: null,
  shadow: 'default',
  photo: null,
  cardPaddingSpacing: 'default',
}
