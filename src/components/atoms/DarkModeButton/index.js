import React from 'react';
import classnames from 'classnames';

import { Paper, Icon } from 'components';

import './style.scss';

const DarkModeButton = ({
  active,
  onClick,
  isMobile,
  className,
  ...restProps
}) => {
  return (
    (
      <Paper
        onClick={() => onClick(!active)}
        className={classnames("DarkModeButton flexible aCenter jCenter", {
          'active': active,
          'isMobile': isMobile,
          ...className
        })}>
        <Icon width={isMobile ? 35 : 50} height={isMobile ? 35 : 50} name={active ? 'darkMode' : 'lightMode'}/>
      </Paper>
    )
  )
};

export default DarkModeButton;
