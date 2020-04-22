import React from 'react';
import classnames from 'classnames';

import { Paper } from 'components';

import './style.scss';

const BusyLoader = ({ isBusy, children, className }) => (
  <Paper className={classnames('BusyLoader', className)}>
    {isBusy &&
      <Paper className="loading-content" flexName="flexible aCenter jCenter">
        <Paper className="loader" />
      </Paper>
    }
    {children}
  </Paper>
);

export default BusyLoader;
