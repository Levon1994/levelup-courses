import React from 'react';
import classnames from 'classnames';

import {
  Text,
  Image,
  Paper,
} from 'components';

import './style.scss';

const InfoCard = ({
  img,
  text,
  list,
  data,
  color,
  title,
  padding,
  reverse,
  children,
  darkMode,
  className,
  backgroundColor,
}) => (
  <Paper style={{ backgroundColor: `${backgroundColor}` }}>
    <Paper flexName='flexible wrap grow' className={className}>
      <Paper flexName='flexible' className={classnames("InfoCard", { darkMode, reverse })} style={{paddingTop: padding}}>
        <Paper className='infoBlockText'>
          <Text style={{ color: `${color}` }} darkMode={darkMode} className='doubleExtraLarge infoTitle'>{title}</Text>
          <Paper className='infoText'>
            <Text style={{ color: `${color}` }} darkMode={darkMode} className='medium info-Text'>
              {text ? text : children}
            </Text>
          </Paper>
        </Paper>
        {
          img && (
            <Paper className='infoCardImage'>
              <Image src={img} width='100%' height='auto' />
            </Paper>
          )
        }
      </Paper>
    </Paper>
  </Paper>
);

InfoCard.defaultProps = {
  padding:'60px'
};
export default InfoCard;
