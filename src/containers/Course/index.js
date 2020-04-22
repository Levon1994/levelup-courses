import React, { useState, useMemo, useEffect } from 'react';
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
   history: { push },
}) => {

  const mobile = isMobile();

  useMount(() => {
    fetchLessons(id);
  });

  const [isOpen, setIsOpen] = useState(true);
  const [loadedDuration, setLoadedDuration] = useState(0);
  const [url, setUrl] = useState();

  useEffect(() => {
    setLoadedDuration(0);
  }, [lessonId, setLoadedDuration]);

  const videoItems = useMemo(() =>
    lessons && lessons.data && lessons.data.lessons && lessons.data.lessons.length &&
    lessons.data.lessons.flatMap(({ items }) => items.flatMap(({ _id }) => _id)),
  [lessons]);

  const index = videoItems && videoItems.indexOf(lessonId);

  const onEnded = () => videoItems && (index !== videoItems.length - 1) && push(`/course/${id}/${videoItems[index + 1]}`);

  const onProgress = ({ loadedSeconds, playedSeconds }) => {
    const duration = (playedSeconds*100/loadedSeconds).toFixed(1);
    setLoadedDuration(duration);
  };

  return (
    <section className={classnames('Course flexible jBetween', { 'darkMode': darkMode, 'isMobile': mobile })}>
      <Paper className={classnames('player-content', { 'isOpen': isOpen })} flexName="flexible vertical">
        {!isOpen && <Icon className="icon-feather-arrow-left" onClick={() => setIsOpen(true)} />}
        <ReactPlayer
          className="player"
          url={url}
          controls
          loop={false}
          playing={true}
          onEnded={onEnded}
          onProgress={onProgress}
        />
        {
          !mobile &&
          <Paper className="text-block" flexName="flexible vertical">
            <Text className="extraLarge" darkMode={darkMode}>About this course</Text>
            <Text darkMode={darkMode}>{lessons && lessons.data && lessons.data.subtitle}</Text>
            <Text className="extraLarge" darkMode={darkMode}>Description</Text>
            <div
              className="description-block"
              dangerouslySetInnerHTML={{
                __html: lessons && lessons.data && lessons.data.description
              }}
            />
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
            loadedDuration={loadedDuration}
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
