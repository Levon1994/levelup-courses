import React, { useState, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import {
  Icon,
  Text,
  Paper,
  BusyLoader,
} from 'components';

import {
  FacebookShareButton,
} from "react-share";

import {
  fetchCourse,
  saveInMycourses,
  toggleIsOpenLogin
} from 'actions';
import { MAIN_URL } from 'configs';
import { isMobile } from 'utils';

import DemoModal from './DemoModal';
import VideoBlock from './VideoBlock';
import CourseContent from './CourseContent';

import './style.scss';

const mapStateToProps = ({
  darkMode,
  course,
  login,
  user,
}) => ({
  darkMode,
  course,
  login,
  user,
});

const CourseItem = ({
  user,
  login,
  course,
  darkMode,
  fetchCourse,
  saveInMycourses,
  toggleIsOpenLogin,
  match: { params: { id } },
  history: { goBack, push },
}) => {

  const mobile = isMobile();

  const [isBusy, setIsBusy] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsBusy(true);
    fetchCourse(id).then(res => {
      res && setIsBusy(false);
    });
  },[id, fetchCourse]);

  const onToggleModal = () => setIsOpen(!isOpen);
  const onToggleIsShown = () => setIsShown(!isShown);

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
    setIsBusy(true);
    saveInMycourses({ courseId: id }).then(res => {
      if(res) {
        fetchCourse(id);
        setIsBusy(false);
      };
    })
  };

  const isCourseSaved = useMemo(() => course && course.data && course.data.isCourseSaved, [course]);

  const onGoToCourse = () => {
    if(!(login || window.localStorage.getItem('token'))) {
      toggleIsOpenLogin(true);
    } else {
      push(`${id}/${firstLessonId}`);
    }
  };

  return (
    <section className={classnames('CourseItem', { 'darkMode' : darkMode , 'isMobile': mobile})}>
      <BusyLoader isBusy={isBusy}>
        <Paper className="page-content" flexName="flexible">
          {
            mobile &&
            <Paper className="course-mobile-header" flexName="flexible aCenter jBetween">
              <Icon className="icon-feather-chevron-left" onClick={goBack}/>
              <FacebookShareButton url={`${MAIN_URL}course/${id}`}>
                <Icon name="facebookMobile"/>
              </FacebookShareButton>
            </Paper>
          }
          <Paper className="info-block" flexName="flexible vertical">
            <Paper className="info-content" flexName="flexible vertical">
              <Text className="doubleExtraLarge" darkMode={darkMode}>{course && course.data && course.data.title}</Text>
              <Text className="extraLarge" darkMode={darkMode}>{course && course.data && course.data.subtitle}</Text>
              <Paper flexName="flexible aCenter" className="creator">
                <Icon className="icon-feather-award" style={{ marginRight: 10 }} />
                <Text darkMode={darkMode}>Created By {course && course.data && course.data.createdby}</Text>
              </Paper>
            </Paper>
            {mobile &&
              <VideoBlock
                id={id}
                user={user}
                mobile={mobile}
                course={course}
                onGoToCourse={onGoToCourse}
                onSaveCourse={onSaveCourse}
                isCourseSaved={isCourseSaved}
                firstLessonId={firstLessonId}
                onToggleModal={onToggleModal}
              />
            }
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
                <div
                  className={classnames('blog-body', { 'isShown': isShown })}
                  dangerouslySetInnerHTML={{
                    __html: course && course.data && course.data.description
                  }}
                />
                <Paper className="see-more">
                  {!isShown
                    ? <Paper flexName="flexible aCenter" onClick={onToggleIsShown}>
                        <Icon className="icon-feather-plus" />
                        <Text darkMode={darkMode}>See More</Text>
                      </Paper>
                    : <Paper flexName="flexible aCenter" onClick={onToggleIsShown}>
                        <Icon className="icon-feather-minus" />
                        <Text darkMode={darkMode}>Hide</Text>
                      </Paper>
                  }
                </Paper>
              </Paper>
            </Paper>
          </Paper>
          <Paper className="image-block">
            {!mobile &&
              <VideoBlock
                id={id}
                user={user}
                course={course}
                onGoToCourse={onGoToCourse}
                onSaveCourse={onSaveCourse}
                isCourseSaved={isCourseSaved}
                firstLessonId={firstLessonId}
                onToggleModal={onToggleModal}
              />
            }
            {isOpen &&
              <DemoModal
                name={course && course.data && course.data.title}
                data={course && course.data && course.data.demoItems}
                onClose={onToggleModal}
                darkMode={darkMode}
                mobile={mobile}
                image={course && course.data && course.data.image_url}
              />
            }
          </Paper>
        </Paper>
      </BusyLoader>
    </section>
  )
};

export default connect(mapStateToProps, {
  fetchCourse,
  saveInMycourses,
  toggleIsOpenLogin,
})(CourseItem);

//
