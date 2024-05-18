import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { Button } from '../button';
import { Icon } from '../icon';
import { Card } from '../card';
import './index.scss';

/**
 * #### Modal dialogs.
 * <br />
 * ### When To Use
 *  When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information. Additionally, if you need show a simple confirmation dialog, you can use antd.Modal.confirm(), and so on.
 * ### Usage
 * `import { Modal } from '@awwd'`
 * <br />
 */
export const Modal = ({
  className,
  closeButton,
  children,
  style,
  show,
  onClose,
  ...props
}) => {
  // Container classname
  let modalClassNameProps = `awwd-modal ` +
    `${closeButton ? 'has-close-button' : ''}` +
    `${className}`

  return (
    <div>
      <CSSTransition
        in={show}
        timeout={300}
        classNames="awwd-modal-overlay"
        unmountOnExit
      >
        <div className="awwd-modal-overlay" onClick={onClose} />
      </CSSTransition>
      <CSSTransition
        in={show}
        timeout={300}
        classNames="awwd-modal-content"
        unmountOnExit
      >
        <div className={modalClassNameProps} style={style} {...props}>
          <div className="awwd-modal-content">
            {closeButton ?
              <Button className='awwd-modal-close' iconType type='gray' rounded onClick={onClose}>
                <Icon type='close' />
              </Button>
            : null}
            {children}
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

Modal.propTypes = {
  /**
   * Close button of modal
   */
  closeButton: PropTypes.string,
  /**
   * ClassName of modal
   */
  className: PropTypes.string,
  /**
   * Style properties of modal, like padding, margin, width..etc
   */
  style: PropTypes.object,
  /**
   * Whether the modal is shown or not
   */
  show: PropTypes.bool.isRequired,
  /**
   * Function to call when the modal should be closed
   */
  onClose: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  className: '',
  style: null,
  closeButton: false,
}
