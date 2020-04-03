import React from 'react';
import classnames from 'classnames';

import {
  Paper,
  Button,
} from 'components';

import './style.scss';

const TextField = ({
  size,
  value,
  textarea,
  darkMode,
  onChange,
  className,
  withButton,
  buttonClick,
  buttonText,
  withRadius,
  ...restProps
}) => {
  return (
    textarea
      ? <textarea
        onChange={onChange}
        value={value}
        className={classnames('Textarea', {
          [className]: className,
          'darkMode': darkMode,
        })}
        {...restProps}
      />

    : <Paper flexName="flexible grow" className="TextFieldComponent">
        <input
            onChange={onChange}
            value={value}
            className={classnames('TextField', {
              [className]: className,
              [size || 'small']: size || 'small',
              'withRadius': withRadius,
              'withButton' : withButton,
              'darkMode': darkMode,
            })}
            {...restProps}
          />
          { withButton &&
            <Button
            onClick={buttonClick}
            size="medium"
            >
              {buttonText || 'Button'}
            </Button>
          }
      </Paper>
  )
};

export default TextField;
