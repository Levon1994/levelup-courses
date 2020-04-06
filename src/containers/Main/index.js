import React, { useMemo } from 'react';
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
  BlogCard,
} from 'components';

import { useTranslator } from 'utils/translator';
import { useMount } from 'utils';
import { fetchCourses } from 'actions';

import {
  wave
} from 'assets/HomePage';

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

  const { t } = useTranslator();

  useMount(() => { fetchCourses() });

  const renderCourses = useMemo(() => {
    if (!courses || !courses.data || !courses.data.result || !courses.data.result.length) return null;

    return courses.data.result.map(({ _id, title, subtitle, createdby, image_url}) => (
      <NavLink to={`/course/${_id}`} key={_id}>
        <BlogCard
          darkMode={darkMode}
          title={title}
          description={subtitle}
          createdBy={createdby}
          src={image_url}
          width="280px"
        />
      </NavLink>
    ))
  },[courses, darkMode])

  return (
      <>
        <section className="Main" >
          <Paper className ='page-content first-block content-padding' flexName='flexible jBetween'>
            <Paper className ='first-text-block' flexName='flexible vertical jCenter aStart'>
              <Text className ='big' darkMode={darkMode}>
                {t('_Welcome_')}
              </Text>
              <NavLink to="/">
                <Button className='first-button'>{t("_ReadMore_")}</Button>
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
            <Text className='doubleExtraLarge titleMargin' darkMode={darkMode}>{t('_Development_')}</Text>
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
