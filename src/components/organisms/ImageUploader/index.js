import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Paper,
  Avatar,
} from 'components';

import './style.scss';

const ImageUploader = ({
  size,
  value,
  onChange,
}) => {

  const [imagePath, setImagePath] = useState(value);

  useEffect(() => {
    setImagePath(value);
  }, [value]);

  const handleChange = ({ target }) => {
    const selectedFile = target.files[0];

    if (selectedFile) {
      onChange(target.files[0]);
      const imagePromise = new Promise(resolve => {
        const reader = new FileReader();

        reader.onload = function(){
          resolve(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      });

      imagePromise.then((img) => setImagePath(img));
    };
  };

  return (
    <Paper className="ImageUploader" style={{ width: size, height: size }}>
      <Avatar
        size={size}
        src={imagePath}
      />
      <Paper className="hidden-block" style={{ width: size, height: size, transform: `translateY(${size}px)` }} flexName="flexible aCenter jCenter">
        <Icon className="icon-feather-upload-cloud" />
        <input
          type="file"
          onChange={handleChange}
          accept="image/*"
        />
      </Paper>
    </Paper>
  )
};

ImageUploader.propTypes = {
  size: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

ImageUploader.defaultProps = {
  size: 100,
  value: 'http://www.bereginya.sumy.ua/Content/account.png',
};

export default ImageUploader;
