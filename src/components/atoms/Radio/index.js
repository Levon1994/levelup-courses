import React  from 'react';

import classnames from 'classnames';
import { Paper, Text } from 'components';

import './style.scss';
const Radio =
    ({
        name,
        checked,
        disabled,
        className,
        label,
         ...restprops
    }) => (
        <Paper className='Radio'>
             <label className="radioParent" >
                <Paper flexName='flexible'>
                    <Text className='text'>{label}</Text>
                    <Paper className='radioContent'>
                        <input type="radio" name={name}  disabled={disabled} defaultChecked={checked} />
                        <span className={classnames('checked',
                            {
                                'disabled' : disabled,
                                'disabledChecked' : disabled && checked })
                        }/>
                    </Paper>
                </Paper>
            </label>
        </Paper>
    );

export default Radio;
