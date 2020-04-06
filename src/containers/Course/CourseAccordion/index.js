import React,  { useState, useMemo } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import {
  Icon,
  Text,
  Paper,
} from 'components';

import './style.scss';

const CourseAccordion = ({
  data,
  darkMode,
  lessonId,
  setIsOpen,
  onSelectVideo,
}) => {

  const [selectedData, setSelectedData] = useState({});

  console.log(selectedData);

  const generateContent = useMemo(() => {
    if (!data || !data.length) return null;

    return data.map(({ name, duration, items }, index) => (
      <Paper
        className={classnames('Accordion-item', { 'active': selectedData[index] })}
        key={index}
      >
        <Paper
          className="Accordion-item-header"
          flexName="flexible aCenter jBetween"
          onClick={() => setSelectedData(prev => ({ ...selectedData, [index]: !selectedData[index] }))}
        >
          <Paper flexName="flexible vertical">
            <Text darkMode={darkMode} className="large">
              {`Section ${index+1}: ${name}`}
            </Text>
            <Text darkMode={darkMode}>{duration}</Text>
          </Paper>
          <Icon className={!selectedData[index] ? 'icon-feather-chevron-down' : 'icon-feather-chevron-up'} />
        </Paper>
        <Paper className="Accordion-item-body">
          {items && items.length &&
            items.map(({ _id, name, duration }) => (
              <NavLink to={_id} key={_id}>
                <Paper
                  className={classnames('Accordion-subItem', { 'active' : lessonId === _id })}
                  flexName="flexible vertical"
                >
                  <Text darkMode={darkMode} className="medium">
                    {name}
                  </Text>
                  <Text darkMode={darkMode} className="small">
                    {duration}
                  </Text>
                </Paper>
              </NavLink>
            ))
          }
        </Paper>
      </Paper>
    ));
  }, [darkMode, data, selectedData, lessonId]);

  return (
    <Paper className={classnames('CourseAccordion', { 'darkMode': darkMode })} flexName="flexName vertical">
      <Paper className="CourseAccordion_title" flexName="flexible aCenter jBetween">
        <Text className="large" darkMode={darkMode}>Course content</Text>
        <Icon className="icon-feather-x" onClick={() => setIsOpen(false)} />
      </Paper>
      <Paper className="CourseAccordion_content">
        {generateContent}
      </Paper>
    </Paper>
  )
};

export default CourseAccordion;
