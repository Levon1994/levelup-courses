import React from 'react';
import classnames from 'classnames';

import { Paper, Icon } from 'components';

import './style.scss';

const DarkModeButton = ({
  active,
  onClick,
  className,
  ...restProps
}) => {
  return (
    (
      <Paper
        onClick={() => onClick(!active)}
        className={classnames("DarkModeButton flexible aCenter jCenter", {
          'active': active,
          ...className
        })}>
        <Icon name={active ? 'darkMode' : 'lightMode'}/>
      </Paper>
    )
  )
};

export default DarkModeButton;
