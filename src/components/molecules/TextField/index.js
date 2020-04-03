import React from 'react';
import classnames from 'classnames';
import { Icon } from 'components'

import './style.scss';

const TextField = ({
  type,
  label,
  value,
  textarea,
  onChange,
  errorText,
  className,
  searchField,
  ...restProps
}) => (
    <div className='formGroup'>
        <label htmlFor='' className='label'>
            {label}
        </label>
        {textarea ?
        <textarea
            className = {classnames('textArea',{[className]: className})}
            onChange = {onChange}
            value = {value}
            {...restProps}
        ></textarea>
        :
        <input className = {classnames('TextField',{[className]: className,'searchField': searchField})}
            type = {type || 'text'}
            onChange = {onChange}
            value = {value}
            {...restProps}
        />}
        <div className='searchIcon'>
            {searchField && <Icon className='icon-feather-search'/>}
        </div>
        <div className='errorText'>
            <p>{errorText}</p>
        </div>
    </div>
);


export default TextField;
