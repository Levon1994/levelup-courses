import React from 'react';
import classnames from 'classnames';

import { Paper, Image } from 'components';

const Avatar = ({
  src,
  size,
  rounded,
  className,
  ...restProps
}) => (
  <Paper className={classnames('Avatar',className)}>
      <Paper className="Avatar_content">
         <Paper>
           <Image
             src={src}
             alt={src}
             style={{
               width: size || 30,
               height: size || 30,
               borderRadius: rounded || size || 30
             }}
             {...restProps}
            />
         </Paper>
      </Paper>
  </Paper>
);

export default Avatar;
