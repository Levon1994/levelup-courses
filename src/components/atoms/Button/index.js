import React from 'react'
import classname from 'classnames';

import './style.scss';

const Button = ({
    size,
    bgColor,
    children,
    disabled,
    className,
    ...restProps
}) => {
    return (
        <button
            className={classname('Button', {
              [size || 'small']: size || 'small',
              [bgColor || 'green'] : bgColor || 'green',
              'disabled' : disabled,
              [className]: className,
            })}
            disabled={disabled}
            {...restProps}>
            {children}
        </button>
    );
}
export default Button;
