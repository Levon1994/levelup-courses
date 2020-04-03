import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

import { useTranslator } from 'utils/translator';

import {
  Icon,
  Paper,
} from 'components';

import './style.scss';

const Dropdown = ({
  data,
  onChange,
  selected,
  darkMode,
  ...restProps
}) => {

  const { t } = useTranslator();

  const [active, setActive] = useState(false);

  const wrapperRef = useRef(null);

  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      if(!(window.innerWidth < 900)) {
        setActive(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <Paper className={classnames('Dropdown', { 'darkMode': darkMode })}>
      <Paper
        onClick={() => setActive(!active)}
        className={classnames("Dropdown_label", { active })}
        >
        {t(selected.label)}
        <Icon name="arrowDown"/>
      </Paper>
      {
        active &&
        <Paper className="Dropdown_content">
          <Paper flexName="flexible vertical">
            <Paper className="dropdown-list" ref={wrapperRef}>
              {
                data.map((item) => (
                  item.value !== selected.value &&
                  <span
                    onClick={() => {
                      onChange(item);
                      setActive(false);
                    }}
                    key={item.value}
                    >
                    {t(item.label)}
                  </span>
                ))
              }
            </Paper>
          </Paper>
        </Paper>
      }
    </Paper>
  )
};

export default Dropdown;
