import React from 'react';
import classnames from 'classnames';

import {
  Text,
  Paper,
  Image
} from 'components';

import './style.scss';

const CategoryCard = ({
  img,
  name,
  small,
  width,
  height,
  selected,
  darkMode,
}) => (
    <Paper
      className={classnames("CategoryCard", { 'darkMode': darkMode, 'small': small, 'selected': selected} )}
      flexName="flexible vertical aCenter">
      <Image src={img}  className='image-block'/>
      <Paper className='text-block'>
        <Text darkMode={darkMode} className='extraLarge teamMemberName singleLine truncate'>{name}</Text>
      </Paper>
    </Paper>
);

export default CategoryCard;
