import React from 'react';
import { createPortal } from 'react-dom';

import {
  Icon,
  Paper,
} from 'components';

import './style.scss';

const Modal = ({
  closeModal,
  children
}) => (
    createPortal(
      <Paper className="fon">
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