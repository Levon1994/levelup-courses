import React from 'react';
import classnames from 'classnames';

import "./style.scss"

const Text = ({
  darkMode,
  children,
  className,
  ...restProps
}) => {
  return(
    <span
      className={classnames('Text',{
        [className]: className,
        'darkMode': darkMode,
      })}
      {...restProps}
    >
      {children}
    </span>
  )
};

export default Text;
