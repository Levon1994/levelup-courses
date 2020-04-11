import React from 'react';
import classnames from 'classnames';

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
  createdBy,
  restProps
}) => {

  return  (
    <Paper
      className={classnames("BlogCommentCard",{ 'darkMode': darkMode })}
      style={{maxWidth: width}}
      {...restProps}>
      <Paper flexName="flexible aStart" className='imageWrapper'>
        <Image src={src} width='100%' height='auto'></Image>
      </Paper>
      <Paper className='blogCardInfo' flexName='flexible vertical'>
        <Paper>
        <Text darkMode={darkMode} className='extraLarge blogCommentTitle'>{title}</Text>
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

BlogCard.defaultProps = {
  width: '350px'
};

export default BlogCard;
