import React from 'react';
import classnames from 'classnames';

import "./style.scss";
import 'assets/Checkbox.svg';

import {Paper} from 'components';

const Checkbox = ({
    checked,
    disabled,
    className,
    onChange,
     ...restProps
}) => (
    <Paper>
            <input
                type='checkbox'
                {...restProps}
                onClick={ () => !disabled ? onChange(!checked) : null}
                className={classnames('checkbox','unchecked',{checked: checked, 'disabled': disabled})}
            />
        </Paper>
);
   
export default Checkbox;

