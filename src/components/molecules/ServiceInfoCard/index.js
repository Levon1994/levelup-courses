import React from 'react';
import classnames from 'classnames';

import {
  Icon,
  Text,
  Paper,
} from 'components';

const ServiceInfoCard = ({
  desc,
  title,
  darkMode,
  iconName,
  className,
  ...restProps
}) => (
  <Paper className={classnames("ServiceInfoCard", className)} flexName="flexible vertical">
    <Icon name={iconName}/>
    <Paper className="categoryOfItem">
      <Text darkMode={darkMode} className="titleOfCategory title">{title}</Text>
    </Paper>
    <Text darkMode={darkMode} className="medium text-content">
      {desc}
    </Text>
  </Paper>
);

export default ServiceInfoCard;
