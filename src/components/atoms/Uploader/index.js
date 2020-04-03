import React, {useState} from 'react';

import {
  Paper,
  TextField,
} from 'components';

import './style.scss';

const Uploader = ({
  title = '',
  uniqId,
  onChange,
}) => {

  const [filename, setFileName] = useState();

  const handleChange = event => {
    if (event) {
      onChange(event);
      setFileName(event.target.files[0].name)
    };
  };

  return (
    <Paper flexName="flexible grow" className="Uploader">
      <Paper className="uploader-content">
        <TextField
          id={uniqId} 
          type="file"
          onChange={handleChange}
        />
        <label htmlFor={filename || title}>
          {filename || title}
        </label>
      </Paper>
    </Paper>
  );
};

export default Uploader;
