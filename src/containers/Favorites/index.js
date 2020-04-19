import React, { useMemo, useState, useCallback } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  Icon,
  Text,
  Paper,
  CourseCard,
  BusyLoader,
} from 'components';

import { useMount, isMobile } from 'utils';
import {
  fetchMycourses,
  deleteMycourse,
} from 'actions';

import './style.scss';

const mapStateToProps = ({ darkMode, myCourses }) => ({ darkMode, myCourses });

const Favorites = ({
  darkMode,
  myCourses,
  fetchMycourses,
  deleteMycourse,
}) => {

  const mobile = isMobile();

  const [isBusy, setIsBusy] = useState(false);

  useMount(() => {
    fetchMycourses();
  });

  const onRemove = useCallback(id => {
    setIsBusy(true);
    deleteMycourse(id).then(res => {
      if(res) {
        setIsBusy(false);
        fetchMycourses();
      }
    });
  }, [deleteMycourse, fetchMycourses, setIsBusy]);

  const renderMyCourses = useMemo(() => {
    if (!myCourses || !myCourses.data || !myCourses.data.result || !myCourses.data.result.length) return null;

    return myCourses.data.result.map(({ _id, title, subtitle, image_url}) => (
      <Paper className="course-item" key={_id}>
        <NavLink to={`/course/${_id}`}>
          <CourseCard
            darkMode={darkMode}
            title={title}
            description={subtitle}
            src={image_url}
            width="280px"
          />
        </NavLink>
        <Icon className="icon-feather-x" onClick={() => onRemove(_id)}/>
      </Paper>
    ))
  },[myCourses, darkMode, onRemove]);

  return (
    <section className={classnames('Favorites', { 'darkMode': darkMode, 'isMobile': mobile })}>
      <h1><Text className="doubleExtraLarge" darkMode={darkMode}>My Courses</Text></h1>
      <BusyLoader isBusy={isBusy}>
        <Paper className="page-content" flexName="flexible wrap jAround">
          {renderMyCourses}
        </Paper>
      </BusyLoader>
    </section>
  )
};

export default connect(mapStateToProps, {
  fetchMycourses,
  deleteMycourse,
})(Favorites);
