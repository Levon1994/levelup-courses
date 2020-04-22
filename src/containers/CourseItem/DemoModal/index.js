import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import ReactPlayer from 'react-player';

import {
  Text,
  Icon,
  Paper,
  Image,
} from 'components';

import './style.scss';

const DemoModal = ({
  data,
  name,
  image,
  mobile,
  onClose,
  darkMode,
}) => {

  const [videoUrl, setVideoUrl] = useState(data && data[0].url);

  const demoVideos = useMemo(() => {
    if (!data || !data.length) return null;

    return data.map(({ _id, name, duration, url }) => (
      <li className={classnames('flexible jBetween aCenter', { 'isActive': videoUrl === url })} key={_id} onClick={() => setVideoUrl(url)}>
        <Paper flexName="flexible">
          <Image
            width={120}
            height={70}
            src={image}
          />
          <Paper className="text-line" flexName="flexible aCenter">
            <Icon className="icon-feather-play" />
            <Text darkMode={darkMode}>{name}</Text>
          </Paper>
        </Paper>
        <Text darkMode={darkMode}>{duration}</Text>
      </li>
    ))
  }, [data, darkMode, videoUrl, image])

  return (
    createPortal(
      <Paper className={classnames('DemoModal', { 'darkMode': darkMode, 'isMobile': mobile })}>
        <Paper className="DemoModal_content">
          <Icon width={40} height={40} name="close" onClick={onClose}/>
          <Paper className="DemoModal_header" flexName="flexible aCenter">
            <Text darkMode={darkMode} className="large singleLine truncate">{name}</Text>
          </Paper>
          <Paper className="DemoModal_body">
            <ReactPlayer
              className="player"
              url={videoUrl}
              controls
              loop={false}
              playing={true}
            />
          </Paper>
          <Paper className="DemoModal_aside" flexName="flexible aCenter">
            <Text darkMode={darkMode}>Free Sample Videos:</Text>
          </Paper>
          <Paper className="DemoModal_list">
            <ul>
              {demoVideos}
            </ul>
          </Paper>
        </Paper>
      </Paper>,
      document.querySelector('#root-portal')
    )
  )
};

export default DemoModal;
