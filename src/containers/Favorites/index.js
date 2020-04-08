import React, { useMemo } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  Text,
  Paper,
  BlogCard,
} from 'components';

import { useMount } from 'utils';
import { fetchMycourses } from 'actions';

import './style.scss';

const mapStateToProps = ({ darkMode, myCourses }) => ({ darkMode, myCourses });

const Favorites = ({
  darkMode,
  myCourses,
  fetchMycourses,
}) => {

  useMount(() => {
    fetchMycourses();
  });

  const renderMyCourses = useMemo(() => {
    if (!myCourses || !myCourses.data || !myCourses.data.result || !myCourses.data.result.length) return null;

    return myCourses.data.result.map(({ _id, title, subtitle, image_url}) => (
      <NavLink to={`/course/${_id}`} key={_id}>
        <BlogCard
          darkMode={darkMode}
          title={title}
          description={subtitle}
          src={image_url}
          width="280px"
        />
      </NavLink>
    ))
  },[myCourses, darkMode]);

  return (
    <section className={classnames('Favorites', { 'darkMode': darkMode })}>
      <h1><Text className="doubleExtraLarge" darkMode={darkMode}>My Courses</Text></h1>
      <Paper className="page-content" flexName="flexible wrap jAround">
        {renderMyCourses}
      </Paper>
    </section>
  )
};

export default connect(mapStateToProps, {
  fetchMycourses,
})(Favorites);
