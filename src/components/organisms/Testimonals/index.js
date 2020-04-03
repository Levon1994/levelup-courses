import React from 'react';
import classnames from 'classnames';

import {
  Text,
  Paper,
  Avatar,
} from 'components';

import './style.scss';

const Testimonials = ({
  src,
  name,
  size,
  surname,
  rounded,
  darkMode,
  className,
  profession,
  description
}) => (
  <Paper flexName="flexible vertical aCenter" className={classnames('Testimonials', className)} >
    <Paper className="Testimonial-content" flexName="flexible vertical jBetween">
      <Paper className="medium description-content" flexName="flexible">
        <Text className="quote" darkMode={darkMode}>&lsquo;&lsquo;</Text>
        <Text className="desc" darkMode={darkMode}>
            {description}
        </Text>
      </Paper>
      <Paper flexName="flexible vertical aCenter" className="testimonials_content" >
        <Avatar
        src={src}
        size={size}
        rounded={rounded}
        />
         <Paper className="info_block">
           <Text className="extraLarge nameAndSurname" darkMode={darkMode}>{name} {surname}</Text>
           <Text darkMode={darkMode}>
               {profession}
           </Text>
         </Paper>
      </Paper>
    </Paper>
  </Paper>
);

export default Testimonials;
