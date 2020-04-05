import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { 
  Paper, 
  CreateBy,
  Accordion,
  CoursesCard,
  GoToCourseCard,
} from 'components';

import { toggleIsOpenLogin } from 'actions';

import './index.scss';

const mapStateToProps = ({ darkMode, login }) => ({ darkMode, login })

const CourseItem = ({
  login,
  darkMode,
  toggleIsOpenLogin,
}) => {

  const onGoToCourse = () => {
    if(!(login || window.localStorage.getItem('token'))) {
      toggleIsOpenLogin(true);
    }
  };

  return (
    <section className="Course_Item">
      <Paper className="page-content">
        <Paper className='left_side'>
          <CreateBy darkMode={darkMode}/>
          <Paper className='Accordion_contain'>
            <CoursesCard darkMode={darkMode}/>
            <Paper className='accordions'>
              <Accordion darkMode={darkMode}/>
            </Paper>
          </Paper>
        </Paper>
        <Paper className='right_side'>
            <GoToCourseCard darkMode={darkMode}/>
            <NavLink to="1/3">Go To Course</NavLink>
            <NavLink to="1/3" onClick={onGoToCourse}>Go To Course</NavLink>
        </Paper>
      </Paper>
    </section>
  )
};

export default connect(mapStateToProps, {
  toggleIsOpenLogin,
})(CourseItem);
