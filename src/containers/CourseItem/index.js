import React, { useState } from 'react';
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
  toggleIsOpenLogin
} from 'actions';
import { useMount } from 'utils';

import DemoModal from './DemoModal';

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
  toggleIsOpenLogin,
  match: { params: { id } },
}) => {

  const [isOpen, setIsOpen] = useState(true);

  useMount(() => {
    fetchCourse(id);
  });

  const onGoToCourse = () => {
    if(!(login || window.localStorage.getItem('token'))) {
      toggleIsOpenLogin(true);
    }
  };

  const onToggleModal = () => setIsOpen(!isOpen);

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
              <Paper className="key-value" flexName="flexible">
                <Icon className="icon-feather-check-square" />
                <Text className="medium" darkMode={darkMode}>Go from a total beginner to an advanced JavaScript developer</Text>
              </Paper>
              <Paper className="key-value" flexName="flexible">
                <Icon className="icon-feather-check-square" />
                <Text className="medium" darkMode={darkMode}>Go from a total beginner to an advanced JavaScript developer</Text>
              </Paper>
              <Paper className="key-value" flexName="flexible">
                <Icon className="icon-feather-check-square" />
                <Text className="medium" darkMode={darkMode}>Go from a total beginner to an advanced JavaScript developer</Text>
              </Paper>
              <Paper className="key-value" flexName="flexible">
                <Icon className="icon-feather-check-square" />
                <Text className="medium" darkMode={darkMode}>Go from a total beginner to an advanced JavaScript developer</Text>
              </Paper>
              <Paper className="key-value" flexName="flexible">
                <Icon className="icon-feather-check-square" />
                <Text className="medium" darkMode={darkMode}>Go from a total beginner to an advanced JavaScript developer</Text>
              </Paper>
            </Paper>
          </Paper>
        </Paper>
        <Paper className="image-block">
          <Paper className="video-block">
            <Paper className="course-preview">
              <Image
                width="100%"
                height={200}
                src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
              />
              <Paper className="preview" onClick={onToggleModal} flexName="flexible vertical aCenter jCenter">
                <Paper className="circle" flexName="flexible aCenter jCenter">
                  <Icon className="icon-feather-play" />
                </Paper>
                <Text>Preview the course</Text>
              </Paper>
            </Paper>
            <Paper className="course-desc" flexName="flexible aCenter vertical">
              <Button>
                <Icon className="icon-feather-save" />
                Save Course
              </Button>
              <NavLink to="1/3" onClick={onGoToCourse}>
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
  toggleIsOpenLogin,
})(CourseItem);

//
