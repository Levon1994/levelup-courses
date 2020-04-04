import React from 'react';
import { NavLink } from 'react-router-dom';

import { Paper, CoursesCard,Accordion,GoToCourseCard,CreateBy } from 'components';

import './index.scss';

const CourseItem = ({ darkMode }) => {
  let arr = ['weqweqweqweqwe','qwewqeqweqw','qweqweqwewqewq','dsfsdfdsf','sdfdsfdsdfdsfdsfd'];
  let obj = {
    title: 'React',
    subTitle: 'valod jan valod',
    creator: 'Axas Axasyan'
  };
  return (
    <section className="Course_Item">
      <Paper className="page-content">
        <Paper className='left_side'>
          <CreateBy darkMode={darkMode} data={obj}/>
          <Paper className='Accordion_contain'>
            <CoursesCard data={arr} darkMode={darkMode}/>
            <Paper className='accordions'>
              <Accordion title={'barlus'} children={arr} darkMode={darkMode}/>
            </Paper>
          </Paper>
        </Paper>
        <Paper className='right_side'>
            <GoToCourseCard darkMode={darkMode}/>
        </Paper>
        <NavLink to="1/3">Go To Course</NavLink>
      </Paper>
    </section>
  )
};

export default CourseItem;
