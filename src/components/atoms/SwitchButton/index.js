import React from 'react';
import classnames from 'classnames';

import { Paper } from 'components';

import './style.scss';

const SwitchButton = ({
  active,
  onClick,
  darkMode,
  className,
  ...restProps
}) => (
  <Paper
    {...restProps}
    onClick={() => onClick(!active)}
    className={classnames("SwitchButton flexible aCenter jCenter", {
      'active': active,
      'darkMode': darkMode,
      ...className
    })}>
    <Paper className="SwitchButton_content">
      <Paper className="SwitchButton_content_btn"/>
    </Paper>
  </Paper>
);

export default SwitchButton;
