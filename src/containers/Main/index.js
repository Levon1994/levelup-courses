import React from 'react';
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

import {
  wave
} from 'assets/HomePage';

import './style.scss';

const mapStateToProps = ({
  darkMode,
}) => ({
  darkMode,
});

const Main = ({
  darkMode,
}) => {

  const { t } = useTranslator();

  return (
      <>
        <section className="Main" >
          <Paper className ='page-content first-block content-padding' flexName='flexible jBetween'>
            <Paper className ='first-text-block' flexName='flexible vertical jCenter aStart'>
              <Text className ='big' darkMode={darkMode}>
                {t('_Welcome_')}
              </Text>
              <NavLink to="/about-us">
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
            <NavLink to={`/course/1`}>
              <BlogCard
                darkMode={darkMode}
                title="React Native: Advanced Concepts"
                description="Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!"
                src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                width="280px"
              />
            </NavLink>
            <NavLink to={`/course/1`}>
              <BlogCard
                darkMode={darkMode}
                title="React Native: Advanced Concepts"
                description="Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!"
                src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                width="280px"
              />
            </NavLink>
            <NavLink to={`/course/1`}>
              <BlogCard
                darkMode={darkMode}
                title="React Native: Advanced Concepts"
                description="Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!"
                src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                width="280px"
              />
            </NavLink>
            <NavLink to={`/course/1`}>
              <BlogCard
                darkMode={darkMode}
                title="React Native: Advanced Concepts"
                description="Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!"
                src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                width="280px"
              />
            </NavLink>
          </Paper>
          </Paper>
        </section>
      </>
  );
}
export default connect(mapStateToProps, null)(withRouter(Main));
