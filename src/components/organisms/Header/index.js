import React, { useState, useEffect } from 'react';
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

  const { t, setLanguage } = useTranslator();

  const languages = [
    { label: 'ENG', value: 'en' },
    { label: 'ARM', value: 'am' },
    { label: 'RUS', value: 'ru' },
  ];

  const companyPages = [
    { label: '_Company_', value: '/' },
    { label: '_AboutUs_', value: '/about-us' },
    { label: '_ContactUs_', value: '/contact-us' },
    { label: '_Carrers_', value: '/careers' },
  ];

  const [active, setActive] = useState(false);
  const [activeLang, setActiveLang] = useState(languages[0]);
  const [activePage, setActivePage] = useState(companyPages[0]);

  useEffect(() => {
    const selectedPage = companyPages.find(item => item.value.includes(location.pathname.split('/')[1]));
    setActivePage(selectedPage || companyPages[0]);
  }, [location.pathname]);

  const handleActiveLang = item => {
    setActiveLang(item);
    setLanguage(item.value);
  };

  const handleActivePage = item => {
    setActivePage(item);
    push(item.value);
    setActive(!active);
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
