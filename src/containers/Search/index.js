import React, { useMemo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  Text,
  Paper,
  CourseCard,
  BusyLoader,
  CategoryCard,
} from 'components';

import { useMount } from 'utils';
import {
  fetchCategories,
  fetchCourseByCategoryName,
} from 'actions';

import './style.scss';

const mapStateToProps = ({
  darkMode,
  categories,
  coursesByCategoryName,
}) => ({
  darkMode,
  categories,
  coursesByCategoryName,
});

const Search = ({
  darkMode,
  categories,
  fetchCategories,
  coursesByCategoryName,
  fetchCourseByCategoryName,
  match: { params: { courseName } },
}) => {

  const [isBusy,setIsBusy] = useState(false);

  useMount(() => {
    fetchCategories(1, 90);
    fetchCourseByCategoryName('HTML');
  });

  useEffect(() => {
    setIsBusy(true);
    fetchCourseByCategoryName(decodeURI(courseName)).then(res => {
      res && setIsBusy(false);
    });
  },[courseName, fetchCourseByCategoryName]);

  const renderCategories = useMemo(() => {
    if (!categories || !categories.data || !categories.data.result || !categories.data.result.length) return null;

    return categories.data.result.map(({ _id, name, image_url}) => (
      <NavLink to={`/search/${name}`} key={_id}>
        <CategoryCard
          darkMode={darkMode}
          name={name}
          small
          selected={decodeURI(courseName) === name}
          img={image_url}
          width="280px"
        />
      </NavLink>
    ))
  },[categories, darkMode, courseName]);

  const renderCourses = useMemo(() => {
    if (!coursesByCategoryName || !coursesByCategoryName.data || !coursesByCategoryName.data.result || !coursesByCategoryName.data.result.length) return null;

    return coursesByCategoryName.data.result.map(({ _id, title, subtitle, createdby, image_url}) => (
      <NavLink to={`/course/${_id}`} key={_id}>
        <CourseCard
          darkMode={darkMode}
          title={title}
          description={subtitle}
          createdBy={createdby}
          src={image_url}
          width="280px"
        />
      </NavLink>
    ))
  },[coursesByCategoryName, darkMode]);

  return (
    <section className="Search">
      <h1><Text className="doubleExtraLarge" darkMode={darkMode}>Find Your Favorite Course</Text></h1>
      <Paper className="page-content">
        <Paper className="category-block" flexName="flexible wrap jAround">
          {renderCategories}
        </Paper>
        <BusyLoader isBusy={isBusy}>
          <Paper className="course-block" flexName="flexible wrap jAround">
            {renderCourses || <Text darkMode={darkMode}>{`Right now havn't course with selected Category`}</Text> }
          </Paper>
        </BusyLoader>
      </Paper>
    </section>
  )
};

export default connect(mapStateToProps, {
  fetchCategories,
  fetchCourseByCategoryName,
})(Search);
