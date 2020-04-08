import React, { useMemo, useState } from 'react';
import classnames from 'classnames';

import {
  Icon,
  Text,
  Paper,
} from 'components';

import './style.scss';

const CourseConent = ({
  data,
  darkMode,
}) => {

  const [selectedData, setSelectedData] = useState({});

  const accordion = useMemo(() => {
    if (!data || !data.length) return null;

    return data.map(({ items, name, duration }, key) => (
      <Paper className={classnames('list-item', { 'active': selectedData[key] })} flexName="flexible vertical" key={key}>
        <Paper
          className="list-item-header"
          flexName="flexible jBetween aCenter"
          onClick={() => setSelectedData(prev => ({ ...selectedData, [key]: !selectedData[key] }))}
        >
          <Paper flexName="flexible aCenter">
            <Icon className={!selectedData[key] ? 'icon-feather-plus' : 'icon-feather-minus'}/>
            <Text darkMode={darkMode} className="singleLine truncate">{name}</Text>
          </Paper>
          <Text darkMode={darkMode}>{duration}</Text>
        </Paper>
        <Paper className="list-item-body">
          {
            items && items.length &&
            items.map(({ _id, name, duration }) => (
              <Paper className="list-sub-item " flexName="flexible aCenter jBetween" key={_id}>
                <Paper className="singleLine truncate">
                  <Icon className="icon-feather-play"/>
                  <Text darkMode={darkMode} className="singleLine truncate">{name}</Text>
                </Paper>
                <Text darkMode={darkMode}>{duration}</Text>
              </Paper>
            ))
          }
        </Paper>
      </Paper>
    ));
  }, [data, darkMode, selectedData]);

  return (
    <Paper className={classnames('CourseConent', { 'darkMode': darkMode })} flexName="flexible vertical">
      {accordion}
    </Paper>
  )
};

export default CourseConent;
