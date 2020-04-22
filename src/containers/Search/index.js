import React, { useMemo, useEffect, useState } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  Icon,
  Text,
  Paper,
  Image,
  TextField,
  CourseCard,
  BusyLoader,
  CategoryCard,
} from 'components';

import {
  useMount,
  isMobile,
  useDebounce,
} from 'utils';
import {
  fetchCategories,
  fetchCourseByName,
  fetchCourseByCategoryName,
} from 'actions';

import './style.scss';

const mapStateToProps = ({
  darkMode,
  categories,
  coursesByName,
  coursesByCategoryName,
}) => ({
  darkMode,
  categories,
  coursesByName,
  coursesByCategoryName,
});

const Search = ({
  darkMode,
  categories,
  coursesByName,
  fetchCategories,
  fetchCourseByName,
  coursesByCategoryName,
  fetchCourseByCategoryName,
  match: { params: { courseName } },
  history: { push }
}) => {

  const mobile = isMobile();

  const [isBusy,setIsBusy] = useState(false);
  const [isBusySearch, setIsBusySearch] = useState(false);
  const [searchName, setSearchName] = useState('');

  const debouncedValue = useDebounce(searchName, 500);

  useEffect(() => {
    fetchCourseByName(debouncedValue).then(res => {
      res && setIsBusySearch(false);
    })
  }, [debouncedValue, fetchCourseByName]);

  useMount(() => {
    fetchCategories(1, 90);
    fetchCourseByCategoryName('HTML');
  });

  useEffect(() => {
    setIsBusy(true);
    fetchCourseByCategoryName(decodeURI(courseName)).then(res => {
      if(res) {
        setIsBusy(false);
      }
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

  const courseData = useMemo(() => {
    if (!coursesByName || !coursesByName.data || !coursesByName.data.result || !coursesByName.data.result.length) return null;

    return coursesByName.data.result.map(({ _id, image_url, title }) => (
      <li key={_id}>
        <NavLink to={`/course/${_id}`} className="flexible aCenter">
          <Image
            src={image_url}
            width={50}
            height={35}
            alt="title"
          />
          <Paper className="singleLine truncate">
            {title}
          </Paper>
        </NavLink>
      </li>
    ));
  },[coursesByName]);

  const handleChange = ({ target: { value } }) => {
    setIsBusySearch(true);
    setSearchName(value);
  };

  return (
    <section className={classnames('Search', { 'isMobile': mobile })}>
      {
        mobile
        ? <Paper className="search-block">
            <TextField
              searchField
              darkMode={darkMode}
              value={searchName}
              onChange={handleChange}
              placeholder="Search Course"
            />
            {
              <>
                {
                  isBusySearch
                  ? <ul><li><Icon className="icon-feather-refresh-ccw" /></li></ul>
                  : <ul>{courseData}</ul>
                }
              </>
            }
          </Paper>
        : <h1><Text className="doubleExtraLarge" darkMode={darkMode}>Find Your Favorite Course</Text></h1>
      }
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
  fetchCourseByName,
  fetchCourseByCategoryName,
})(Search);
