import React from 'react';
import classnames from 'classnames';
import dayjs from 'dayjs';

import {
  Text,
  Paper,
  Image,
} from 'components';

import './style.scss'

const BlogCard = ({
  src,
  createdDate,
  width,
  views,
  title,
  description,
  darkMode,
  restProps
}) => {

  const date = dayjs(createdDate).format('DD.MM.YYYY');

  return  (
    <Paper
      className={classnames("BlogCommentCard",{ 'darkMode': darkMode })}
      style={{maxWidth: width}}
      {...restProps}>
      <Paper flexName="flexible aCenter" className='imageWrapper'>
        <Image src={src} width='100%' height='auto'></Image>
      </Paper>
      <Paper className='blogCardInfo' flexName='flexible vertical'>
        <Paper>
        <Text darkMode={darkMode} className='extraLarge blogCommentTitle'>{title}</Text>
        </Paper>
        <Paper>
          <Text darkMode={darkMode} className='small desc'>{description}</Text>
        </Paper>
      </Paper>
      <Paper flexName='flexible jBetween' className='infoblock'>
        {
          createdDate &&
          <Paper>
            <Text darkMode={darkMode} className='small'>{date}</Text>
          </Paper>
        }
        <Paper>
          <Text darkMode={darkMode} className='small'> {views} </Text>
        </Paper>
      </Paper>
    </Paper>
  )
};

BlogCard.defaultProps = {
  width: '350px'
};

export default BlogCard;
