import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Paper } from 'components';

import { toggleIsOpenLogin } from 'actions';

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
    <section className="CoureItem">
      <Paper className="page-content">
        <NavLink to="1/3" onClick={onGoToCourse}>Go To Course</NavLink>
      </Paper>
    </section>
  )
};

export default connect(mapStateToProps, {
  toggleIsOpenLogin,
})(CourseItem);
