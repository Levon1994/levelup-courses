import React from 'react';
import classnames from 'classnames';

import {
  Text,
  Paper,
  Image,
} from 'components';

import { isMobile } from 'utils';

import './style.scss'

const CourseCard = ({
  src,
  createdDate,
  width,
  views,
  title,
  description,
  darkMode,
  createdBy,
  restProps
}) => {

  const mobile = isMobile();

  return  (
    <Paper
      className={classnames("CourseCard",{ 'darkMode': darkMode, 'isMobile': mobile })}
      style={{maxWidth: width}}
      {...restProps}>
      <Paper flexName="flexible aStart" className='imageWrapper'>
        <Image src={src} width='100%' height='auto'></Image>
      </Paper>
      <Paper className='blogCardInfo' flexName='flexible vertical'>
        <Paper>
        <Text darkMode={darkMode} className='blogCommentTitle'>{title}</Text>
        </Paper>
        <Paper>
          <Text darkMode={darkMode} className='small desc truncate-lines-styles truncate twoLines'>{description}</Text>
        </Paper>
      </Paper>
      <Paper flexName='flexible jBetween' className='infoblock'>
        {
          createdBy &&
          <Paper className="createdBy">
            <Text darkMode={darkMode} className='small'>{createdBy}</Text>
          </Paper>
        }
        <Paper>
          <Text darkMode={darkMode} className='small'> {views} </Text>
        </Paper>
      </Paper>
    </Paper>
  )
};

CourseCard.defaultProps = {
  width: '350px'
};

export default CourseCard;
