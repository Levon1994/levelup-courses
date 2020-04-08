import React, { useState } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

import {
  Icon,
  Text,
  Paper,
} from 'components';

import { useMount, isMobile } from 'utils';
import { fetchLessons } from 'actions';

import CourseAccordion from './CourseAccordion';

import './style.scss';

const mapStateToProps = ({ darkMode, lessons }) => ({ darkMode, lessons });

const Course = ({
   match: { params: { id, lessonId } },
   lessons,
   darkMode,
   fetchLessons,
}) => {

  const mobile = isMobile();

  useMount(() => {
    fetchLessons(id);
  });

  const [isOpen, setIsOpen] = useState(true);
  const [url, setUrl] = useState();

  return (
    <section className={classnames('Course flexible jBetween', { 'darkMode': darkMode, 'isMobile': mobile })}>
      <Paper className={classnames('player-content', { 'isOpen': isOpen })} flexName="flexible vertical">
        {!isOpen && <Icon className="icon-feather-arrow-left" onClick={() => setIsOpen(true)} />}
        <ReactPlayer
          className="player"
          url={url}
          controls
          loop={false}
          playing={false}
          onEnded={data => console.log('onEnded', data)}
        />
        {
          !mobile &&
          <Paper className="text-block" flexName="flexible vertical">
            <Text className="extraLarge" darkMode={darkMode}>About this course</Text>
            <Text darkMode={darkMode}>{lessons && lessons.data && lessons.data.subtitle}</Text>
            <Text className="extraLarge" darkMode={darkMode}>Description</Text>
            <Text darkMode={darkMode}>{lessons && lessons.data && lessons.data.description}</Text>
          </Paper>
        }
      </Paper>
      {
        isOpen &&
        <Paper className="lessons-list">
          <CourseAccordion
            setIsOpen={setIsOpen}
            data={lessons && lessons.data && lessons.data.lessons}
            darkMode={darkMode}
            lessonId={lessonId}
            onSelectVideo={setUrl}
            mobile={mobile}
            courseId={id}
            title={lessons && lessons.data && lessons.data.title}
            subtitle={lessons && lessons.data && lessons.data.subtitle}
          />
        </Paper>
      }
    </section>
  )
};

export default connect(mapStateToProps, {
  fetchLessons,
})(Course);
