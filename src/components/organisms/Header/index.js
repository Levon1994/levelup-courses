import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  NavLink,
  withRouter,
} from 'react-router-dom';
import classnames from 'classnames';

import {
  Icon,
  Text,
  Image,
  Paper,
  Avatar,
  Button,
  Dropdown,
} from 'components';

import { DEFAULT_USER_IMAGE } from 'configs';
import { toggleIsOpenLogin } from 'actions';
import { useTranslator } from 'utils/translator';

import logo from 'assets/levelup-logo.svg';

import './style.scss';

const mapStateToProps = ({ login, user }) => ({ login, user });

const Header = ({
  user,
  login,
  darkMode,
  history: { push },
  location,
  toggleIsOpenLogin,
}) => {

  const { t, setLanguage } = useTranslator();

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

  const onLogOut = () => {
    window.localStorage.clear();
    window.location.reload();
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
                  href="http://levelup.am/about-us"
                  onClick={() => setActive(!active)}
                  >
                    {t('_AboutUs_')}
                </a>
              </li>
              <li>
                {
                  (window.localStorage.getItem('token'))
                  ? <Paper className="account-block">
                      <Avatar
                        src={(user && user.data) ? user.data.thumbnail_file_path : DEFAULT_USER_IMAGE}
                        size={45}
                      />
                      <Paper className="hidden-block">
                        <Paper flexName="flexible" className="image-block">
                          <Avatar
                            src={(user && user.data) ? user.data.thumbnail_file_path : DEFAULT_USER_IMAGE}
                            size={45}
                          />
                          <Paper flexName="flexible vertical">
                            <Text darkMode={darkMode}>{user && user.data && `${user.data.first_name} ${user.data.last_name}`}</Text>
                            <Text darkMode={darkMode}>{user && user.data && user.data.email}</Text>
                          </Paper>
                        </Paper>
                        <ul>
                          <li className="flexible aCenter">
                            <NavLink to="/profile" className="flexible aCenter">
                              <Icon className="icon-feather-user"/>
                              <Text darkMode={darkMode}>My Profile</Text>
                            </NavLink>
                          </li>
                          <li className="flexible aCenter" onClick={onLogOut}>
                            <Icon className="icon-feather-log-out"/>
                            <Text darkMode={darkMode}>Logout</Text>
                          </li>
                        </ul>
                      </Paper>
                    </Paper>
                  : <Button onClick={() => toggleIsOpenLogin(true)}>
                     {t('_SignIn_')}
                    </Button>
                }
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

export default connect(mapStateToProps, { toggleIsOpenLogin })(withRouter(Header));
