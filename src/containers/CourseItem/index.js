import React from 'react';
import { NavLink } from 'react-router-dom';

import { Paper } from 'components';

const CourseItem = () => {
  return (
    <section className="CoureItem">
      <Paper className="page-content">
        <NavLink to="1/3">Go To Course</NavLink>
      </Paper>
    </section>
  )
};

export default CourseItem;
