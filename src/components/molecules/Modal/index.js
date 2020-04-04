import React from 'react';
import classnames from 'classnames';
import { createPortal } from 'react-dom';

import {
  Icon,
  Paper,
} from 'components';

import './style.scss';

const Modal = ({
  closeModal,
  className,
  children
}) => (
    createPortal(
      <Paper className={classnames('fon', className)}>
        <Paper className="Modal-container">
          <Paper className="Modal">
            <Paper className="modal-content">
              <Paper className="size">
                <Paper onClick={() => closeModal()} className="close-btn">
                  <Icon name="close" />
                </Paper>
                <Paper flexName="flexible jCenter vertical" className="text-field-container">
                  {children}
                </Paper>
              </Paper>
            </Paper>
          </Paper>
        </Paper>
      </Paper>,
      document.querySelector('#root-portal')
    )
  )

export default Modal;
