import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  Icon,
  Text,
  Paper,
  Image,
  Button,
} from 'components';

import {
  FacebookShareButton,
} from "react-share";

import { MAIN_URL } from 'configs';

const VideoBlock = ({
  id,
  user,
  mobile,
  course,
  onGoToCourse,
  onSaveCourse,
  isCourseSaved,
  firstLessonId,
  onToggleModal,
}) => (
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
      {
        user
        ? (!isCourseSaved &&
        <Button onClick={onSaveCourse}>
          <Icon className="icon-feather-save" />
          Save Course
        </Button>)
        :
        <Button onClick={onGoToCourse}>
          <Icon className="icon-feather-external-link" />
          Save Course
        </Button>
      }
      <NavLink to={`${id}/${firstLessonId}`} onClick={onGoToCourse}>
        <Button>
          <Icon className="icon-feather-external-link" />
          Start Course
        </Button>
      </NavLink>
      {!mobile &&
        <Paper className="share-block">
          <FacebookShareButton url={`${MAIN_URL}course/${id}`}>
            <Button>
              Share On Facebook
            </Button>
          </FacebookShareButton>
        </Paper>
      }
    </Paper>
  </Paper>
);

export default VideoBlock;
