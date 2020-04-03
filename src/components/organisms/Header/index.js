import React, { useState } from 'react';
import {
  NavLink,
  withRouter,
} from 'react-router-dom';
import classnames from 'classnames';

import {
  Image,
  Paper,
  Button,
  Dropdown,
} from 'components';

import { useTranslator } from 'utils/translator';

import logo from 'assets/levelup-logo.svg';

import './style.scss';

const Header = ({
  darkMode,
  history: { push },
  location,
}) => {

  const { setLanguage } = useTranslator();

  const languages = [
    { label: 'ENG', value: 'en' },
    { label: 'ARM', value: 'am' },
    { label: 'RUS', value: 'ru' },
  ];

  const [active, setActive] = useState(false);
  const [activeLang, setActiveLang] = useState(languages[0]);

  const handleActiveLang = item => {
    setLanguage(item.value);
    setActiveLang(item);
  };

  return (
    <header className={classnames({ 'darkMode': darkMode, 'active': active })}>
      <nav className="flexible aCenter">
        <Paper flexName="flexible jBetween aCenter grow" className="page-content">
          <Paper className="logo">
            <NavLink to="/">
              <Image
                src={logo}
                width={211}
                height={58}
                alt="Level Up IT Center"
              />
              <span>Courses</span>
            </NavLink>
          </Paper>
          <Paper className="menu-wrapper" onClick={() => setActive(!active)}>
            <Paper className={`hamburger-menu ${active ? 'animate' : ''}`}></Paper>
          </Paper>
          <Paper flexName="flexible aCenter" className="header-list">
            <ul className="nav-list">
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="http://levelup.am/"
                  onClick={() => setActive(!active)}
                  >
                  <Button>
                    Level UP It Center
                  </Button>
                </a>
              </li>
              <li>
                <Paper className="languages">
                  <Dropdown
                    data={languages}
                    selected={activeLang}
                    onChange={handleActiveLang}
                    darkMode={darkMode}
                  />
                </Paper>
              </li>
            </ul>
          </Paper>
        </Paper>
      </nav>
    </header>
  )
};

export default withRouter(Header);
