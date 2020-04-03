import React,  { useState } from 'react';
import classnames from 'classnames';

import {
  Icon,
  Text,
  Paper,
} from 'components';

import './style.scss';

const CourseAccordion = ({
  data,
  darkMode,
  onSelectVideo,
}) => {

  const [selected, setSelected] = useState();

  const generateContent = () => {
    if (!data && !data.length) return null;

    return data.map((item, index) => (
      <Paper
        className={classnames('Accordion-item', { 'active': selected === item.id })}
        key={item.id}
      >
        <Paper
          className="Accordion-item-header"
          flexName="flexible aCenter jBetween"
          onClick={() => {
            if(selected !== item.id){
              setSelected(item.id);
            } else {
              setSelected(null);
            }
          }}
        >
          <Text darkMode={darkMode} className="large">
            {`Section ${index+1}: ${item.name}`}
          </Text>
          <Icon className="icon-feather-chevron-down" />
        </Paper>
        <Paper className="Accordion-item-body">
          {item.subItems && item.subItems.length &&
            item.subItems.map((el, key) => (
              <Paper
                key={key}
                className="Accordion-subItem"
                flexName="flexible vertical"
                onClick={() => onSelectVideo(el.url)}
              >
                <Text darkMode={darkMode} className="medium">
                  {el.name}
                </Text>
                <Text darkMode={darkMode} className="small">
                  {el.duration}
                </Text>
              </Paper>
            ))
          }
        </Paper>
      </Paper>
    ));
  };

  return (
    <Paper className={classnames('CourseAccordion', { 'darkMode': darkMode })} flexName="flexName vertical">
      <Paper className="CourseAccordion_title" flexName="flexible aCenter jBetween">
        <Text className="large" darkMode={darkMode}>Course content</Text>
        <Icon className="icon-feather-x" />
      </Paper>
      <Paper className="CourseAccordion_content">
        {generateContent()}
      </Paper>
    </Paper>
  )
};

export default CourseAccordion;
