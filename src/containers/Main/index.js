import React, { useMemo } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {
  withRouter,
  NavLink,
} from 'react-router-dom';

import {
  Text,
  Paper,
  Image,
  Button,
  CourseCard,
} from 'components';

import HelmetContent from 'helpers/HelmetContent';
import { useTranslator } from 'utils/translator';
import { useMount, isMobile } from 'utils';
import { fetchCourses } from 'actions';

import { wave } from 'assets/HomePage';

import './style.scss';

const mapStateToProps = ({
  darkMode,
  courses,
}) => ({
  darkMode,
  courses,
});

const Main = ({
  courses,
  darkMode,
  fetchCourses,
}) => {

  const mobile = isMobile();

  const { t } = useTranslator();

  useMount(() => { fetchCourses() });

  const renderCourses = useMemo(() => {
    if (!courses || !courses.data || !courses.data.result || !courses.data.result.length) return null;

    return courses.data.result.map(({ _id, title, subtitle, createdby, image_url}) => (
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
  },[courses, darkMode]);

  return (
      <>
        <section className={classnames('Main', { 'isMobile': mobile })} >
          <HelmetContent page="home" />
          <Paper className ='page-content first-block content-padding' flexName='flexible jBetween'>
            <Paper className ='first-text-block' flexName='flexible vertical jCenter aStart'>
              <Text className ='big' darkMode={darkMode}>
                {t('_Welcome_')}
              </Text>
              <NavLink to="/categories">
                <Button className='first-button'>Find Course</Button>
              </NavLink>
            </Paper>
            <Paper className='first-image-parent'>
              <Image
                src={wave}
                width='100%'
                height='auto'
                className='first-image animated fadeInRight'
              />
            </Paper>
          </Paper>
          <Paper className="page-content">
          <Paper  className='testimonialsTitle' flexName='flexible jCenter'>
            <Text className='doubleExtraLarge titleMargin' darkMode={darkMode}>The Best Courses</Text>
          </Paper>
          <Paper className="courses-line" flexName="flexible wrap jAround">
            {renderCourses}
          </Paper>
          </Paper>
        </section>
      </>
  );
}
export default connect(mapStateToProps, {
  fetchCourses,
})(withRouter(Main));
