import React from 'react';
import classnames from 'classnames';

import Icons from './icon';

const Icon = ({
    className,
    name,
    width,
    height,
    ...restProps
}) => {
    return(
      <span
         className={classnames('Icon',className)}
         {...restProps}
      >
          {name ? Icons[name] && Icons[name](width,height) : ""}
      </span>
    )
};

export  default Icon;
