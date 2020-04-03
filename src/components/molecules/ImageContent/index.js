import React from 'react';

import { Paper } from 'components';

import './style.scss';

const ImageContent = ({
  path,
  after,
  before,
  darkMode,
  darkPath,
}) => (
  <Paper className="ImageContent" flexName="flexible aEnd">
    <Paper className="image-block" flexName="flexible jCenter">
      <Paper className="before animated fadeInLeft">
        <img src={before} alt=""/>
      </Paper>
      <img src={darkMode ? darkPath : path} alt=""/>
      <Paper className="after animated fadeInRight">
        <img src={after} alt=""/>
      </Paper>
    </Paper>
  </Paper>
);

export default ImageContent;
