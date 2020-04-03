import React, { forwardRef } from 'react';
import classnames from 'classnames';

const Paper = forwardRef(({
  style,
  onClick,
  children,
  flexName,
  className,
  ...restProps
}, ref) => (
  <div
    className={classnames('Paper', {[flexName]: flexName, [className]: className})}
    onClick={onClick}
    style={style}
    ref={ref}
    {...restProps}
  >
    {children}
  </div>
));

export default Paper;
