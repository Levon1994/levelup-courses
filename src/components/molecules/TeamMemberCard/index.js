import React from 'react';
import classnames from 'classnames';

import {
  Text,
  Paper,
  Image
} from 'components';

import './style.scss';

const TeamMemberCard=({
  img,
  name,
  surname,
  width,
  height,
  darkMode,
  profession,
  place,

})=> (
    <Paper  className={classnames("TeamMemberCard", { 'darkMode': darkMode } )}>

      <Image src={img}  className='image-block' width='100%'></Image>
      <Paper className='text-block'>
        <Text darkMode={darkMode} className='extraLarge teamMemberName'>{name} {surname}</Text>
        <Text darkMode={darkMode} className='large teamMemberProfession'>{profession}</Text>
        <Text darkMode={darkMode} className='large teamMemberProfession'>{place}</Text>
      </Paper>
    </Paper>
);

export default TeamMemberCard;
