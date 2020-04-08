import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  Icon,
  Text,
  Paper,
  Image,
  Button,
} from 'components';

import {
  fetchCourse,
  saveInMycourses,
  toggleIsOpenLogin
} from 'actions';
import { useMount } from 'utils';

import DemoModal from './DemoModal';
import CourseContent from './CourseContent';

import './style.scss';

const mapStateToProps = ({
  darkMode,
  course,
  login,
}) => ({
  darkMode,
  course,
  login,
});

const CourseItem = ({
  login,
  course,
  darkMode,
  fetchCourse,
  saveInMycourses,
  toggleIsOpenLogin,
  match: { params: { id } },
}) => {

  const [isOpen, setIsOpen] = useState(false);

  useMount(() => {
    fetchCourse(id);
  });

  const onGoToCourse = () => {
    if(!(login || window.localStorage.getItem('token'))) {
      toggleIsOpenLogin(true);
    }
  };

  const onToggleModal = () => setIsOpen(!isOpen);

  const whatWeWillLearn = useMemo(() => {
    if (!course || !course.data || !course.data.whatYouWillLearn || !course.data.whatYouWillLearn.length) return null;

    return course.data.whatYouWillLearn.map((item, key) => (
      <Paper className="key-value" flexName="flexible" key={key}>
        <Icon className="icon-feather-check-square" />
        <Text className="medium" darkMode={darkMode}>{item}</Text>
      </Paper>
    ));
  }, [course, darkMode]);

  const requirments = useMemo(() => {
    if (!course || !course.data || !course.data.requirements || !course.data.requirements.length) return null;

    return course.data.requirements.map((item, key) => (
      <Paper flexName="flexible aCenter" key={key}>
        <Icon className="icon-feather-disc"/>
        <Text className="medium" darkMode={darkMode}>{item}</Text>
      </Paper>
    ));
  }, [course, darkMode]);

  const firstLessonId = useMemo(
    () => course && course.data && course.data.lessons &&
    course.data.lessons.length && course.data.lessons[0].items &&
    course.data.lessons[0].items.length && course.data.lessons[0].items[0]._id,
  [course]);

  const onSaveCourse = () => {
    saveInMycourses({ courseId: id }).then(res => {
      res && fetchCourse(id);
    })
  };

  const isCourseSaved = useMemo(() => course && course.data && course.data.isCourseSaved, [course]);

  return (
    <section className={classnames('CourseItem', { 'darkMode' : darkMode})}>
      <Paper className="page-content" flexName="flexible">
        <Paper className="info-block" flexName="flexible vertical">
          <Paper className="info-content" flexName="flexible vertical">
            <Text className="doubleExtraLarge" darkMode={darkMode}>{course && course.data && course.data.title}</Text>
            <Text className="extraLarge" darkMode={darkMode}>{course && course.data && course.data.subtitle}</Text>
            <Paper flexName="flexible aCenter" className="creator">
              <Icon className="icon-feather-award" style={{ marginRight: 10 }} />
              <Text darkMode={darkMode}>Created By {course && course.data && course.data.createdby}</Text>
            </Paper>
          </Paper>
          <Paper className="what-we-learn">
            <Text className="extraLarge" darkMode={darkMode}>What you'll learn</Text>
            <Paper flexName="flexible wrap">
              {whatWeWillLearn}
            </Paper>
          </Paper>
          <Paper className="course-content-block">
            <Text className="extraLarge" darkMode={darkMode}>Course Content</Text>
            <CourseContent
              data={course && course.data && course.data.lessons}
              darkMode={darkMode}
            />
          </Paper>
          <Paper className="requirments-block">
            <Text className="extraLarge" darkMode={darkMode}>Requirements</Text>
            {requirments}
          </Paper>
          <Paper className="description-block">
            <Text className="extraLarge" darkMode={darkMode}>Description</Text>
            <Paper className="description-body">
              <Text darkMode={darkMode}>{course && course.data && course.data.description}</Text>
            </Paper>
          </Paper>
        </Paper>
        <Paper className="image-block">
          <Paper className="video-block">
            <Paper className="course-preview">
              <Image
                width="100%"
                height={200}
                src={course && course.data && course.data.image_url}
              />
              <Paper className="preview" onClick={onToggleModal} flexName="flexible vertical aCenter jCenter">
                <Paper className="circle" flexName="flexible aCenter jCenter">
                  <Icon className="icon-feather-play" />
                </Paper>
                <Text>Preview the course</Text>
              </Paper>
            </Paper>
            <Paper className="course-desc" flexName="flexible aCenter vertical">
              {!isCourseSaved &&
                <Button onClick={onSaveCourse}>
                  <Icon className="icon-feather-save" />
                  Save Course
                </Button>
              }
              <NavLink to={`${id}/${firstLessonId}`} onClick={onGoToCourse}>
                <Button>
                  <Icon className="icon-feather-external-link" />
                  Start Course
                </Button>
              </NavLink>
              <Paper className="share-block">
                <Button>
                  Share On Facebook
                </Button>
              </Paper>
            </Paper>
          </Paper>
          {isOpen &&
            <DemoModal
              name={course && course.data && course.data.title}
              data={course && course.data && course.data.demoItems}
              onClose={onToggleModal}
              darkMode={darkMode}
            />
          }
        </Paper>
      </Paper>
    </section>
  )
};

export default connect(mapStateToProps, {
  fetchCourse,
  saveInMycourses,
  toggleIsOpenLogin,
})(CourseItem);

//
