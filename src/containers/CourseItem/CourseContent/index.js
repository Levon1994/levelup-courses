import React from 'react';
import classnames from 'classnames';

import {
  Icon,
  Text,
  Paper,
} from 'components';

import './style.scss';

const CourseConent = ({
  darkMode,
}) => {
  return (
    <Paper className={classnames('CourseConent', { 'darkMode': darkMode })} flexName="flexible vertical">
      <Paper className="list-item" flexName="flexible vertical">
        <Paper className="list-item-header" flexName="flexible jBetween aCenter">
          <Text darkMode={darkMode}>Course Introdocution</Text>
          <Icon className="icon-feather-plus"/>
        </Paper>
        <Paper className="list-item-body">
          <Paper className="list-sub-item" flexName="flexible aCenter">
            <Icon className="icon-feather-play"/>
            <Text darkMode={darkMode}>Section Intro</Text>
          </Paper>
          <Paper className="list-sub-item" flexName="flexible aCenter">
            <Icon className="icon-feather-play"/>
            <Text darkMode={darkMode}>Section Intro</Text>
          </Paper>
          <Paper className="list-sub-item" flexName="flexible aCenter">
            <Icon className="icon-feather-play"/>
            <Text darkMode={darkMode}>Section Intro</Text>
          </Paper>
        </Paper>
      </Paper>
    </Paper>
  )
};

export default CourseConent;
