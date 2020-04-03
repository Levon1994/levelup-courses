import React from 'react'
import classname from 'classnames';

import './style.scss';

const Button = ({
    size,
    bgColor,
    children,
    className,
    ...restProps
}) => {
    return (
        <button
            className={classname('Button', {
              [size || 'small']: size || 'small',
              [bgColor || 'green'] : bgColor || 'green',
              [className]: className,
            })}
            {...restProps}>
            {children}
        </button>
    );
}
export default Button;
