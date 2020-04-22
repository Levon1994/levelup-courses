import React, { useState, useEffect, useMemo } from 'react';
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
  TextField,
} from 'components';

import { DEFAULT_USER_IMAGE } from 'configs';
import {
  fetchCourseByName,
  toggleIsOpenLogin,
} from 'actions';

import { useDebounce } from 'utils';

import logo from 'assets/levelup-logo.svg';

import './style.scss';

const mapStateToProps = ({ login, user, coursesByName }) => ({ login, user, coursesByName });

const Header = ({
  user,
  login,
  darkMode,
  history: { push },
  location,
  coursesByName,
  fetchCourseByName,
  toggleIsOpenLogin,
}) => {

  const [active, setActive] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [courseName, setCourseName] = useState('');

  const debouncedValue = useDebounce(courseName, 500);

  useEffect(() => {
    fetchCourseByName(debouncedValue).then(res => {
      res && setIsBusy(false);
    })
  }, [debouncedValue, fetchCourseByName]);

  const onLogOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const handleChange = ({ target: { value } }) => {
    setIsBusy(true);
    setCourseName(value);
  };

  const courseData = useMemo(() => {
    if (!coursesByName || !coursesByName.data || !coursesByName.data.result || !coursesByName.data.result.length) return null;

    return coursesByName.data.result.map(({ _id, image_url, title }) => (
      <li key={_id}>
        <NavLink to={`/course/${_id}`} className="flexible aCenter">
          <Image
            src={image_url}
            width={50}
            height={35}
            alt="title"
          />
          <Paper className="singleLine truncate">
            {title}
          </Paper>
        </NavLink>
      </li>
    ));
  },[coursesByName]);

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
            </NavLink>
          </Paper>
          <Paper className="menu-wrapper" onClick={() => setActive(!active)}>
            <Paper className={`hamburger-menu ${active ? 'animate' : ''}`}></Paper>
          </Paper>
          <Paper className="search-block">
            <TextField
              searchField
              darkMode={darkMode}
              value={courseName}
              onChange={handleChange}
              placeholder="Search Course"
            />
            {
              <>
                {
                  isBusy
                  ? <ul><li><Icon className="icon-feather-refresh-ccw" /></li></ul>
                  : <ul>{courseData}</ul>
                }
              </>
            }
          </Paper>
          <Paper flexName="flexible aCenter" className="header-list">
            <ul className="nav-list">
              <li>
                <NavLink
                  to="/search/HTML"
                  >
                  Find Course
                </NavLink>
              </li>
              <li>
                {
                  (window.localStorage.getItem('token'))
                  ? <Paper className="account-block">
                      <Paper className="image-block-content">
                        {
                          (user && user.data && user.data.image_url)
                          ? <Avatar
                              src={(user && user.data) ? user.data.image_url : DEFAULT_USER_IMAGE}
                              size={45}
                            />
                          : <Text>{user && user.data && user.data.first_name && user.data.first_name.split('')[0]}</Text>
                        }
                      </Paper>
                      <Paper className="hidden-block">
                        <Paper flexName="flexible" className="image-block">
                          <Paper className="image-block-content">
                            {
                              (user && user.data && user.data.image_url)
                              ? <Avatar
                                  src={(user && user.data) ? user.data.image_url : DEFAULT_USER_IMAGE}
                                  size={45}
                                />
                              : <Text>{user && user.data && user.data.first_name && user.data.first_name.split('')[0]}</Text>
                            }
                          </Paper>
                          <Paper flexName="flexible vertical">
                            <Text darkMode={darkMode}>{user && user.data && `${user.data.first_name} ${user.data.last_name}`}</Text>
                            <Text className="singleLine" darkMode={darkMode}>{user && user.data && user.data.email}</Text>
                          </Paper>
                        </Paper>
                        <ul>
                          <li className="flexible aCenter">
                            <NavLink to="/profile" className="flexible aCenter">
                              <Icon className="icon-feather-user"/>
                              <Text darkMode={darkMode}>My Profile</Text>
                            </NavLink>
                          </li>
                          <li className="flexible aCenter">
                            <NavLink to="/my-courses" className="flexible aCenter">
                              <Icon className="icon-feather-user"/>
                              <Text darkMode={darkMode}>My Courses</Text>
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
                     Sign In
                    </Button>
                }
              </li>
            </ul>
          </Paper>
        </Paper>
      </nav>
    </header>
  )
};

export default connect(mapStateToProps, {
  toggleIsOpenLogin,
  fetchCourseByName,
})(withRouter(Header));
