import React, { useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
  NavLink,
  withRouter,
} from 'react-router-dom';

import {
  Text,
  Icon,
  Paper,
} from 'components';

import { toggleIsOpenLogin } from 'actions';

import './style.scss';

const data = [
  {
    url: '/',
    icon: 'icon-feather-home',
    name: 'Home',
  },
  {
    url: '/search/HTML',
    icon: 'icon-feather-search',
    name: 'Search',
  },
  {
    url: '/my-courses',
    icon: 'icon-feather-play-circle',
    name: 'My Courses',
  },
  {
    url: '/profile',
    icon: 'icon-feather-user',
    name: 'Account',
  }
];

const mapStateToProps = ({ darkMode, user }) => ({ darkMode, user });

const MobileFooter = ({
  user,
  darkMode,
  toggleIsOpenLogin,
  location: { pathname }
}) => {

  const onGoToCourse = useCallback(url => {
    if((url === '/my-courses' || url === '/profile') && !user) {
      toggleIsOpenLogin(true);
    }
  }, [user, toggleIsOpenLogin]);

  const mobileData = useMemo(() => (
    data.map(({ url, icon, name }, key) => (
      <NavLink
        key={key}
        to={url}
        className={classnames('flexible vertical aCenter', { 'isActive': url === pathname })}
        onClick={() => onGoToCourse(url)}
      >
        <Icon className={icon}/>
        <Text darkMode={darkMode}>{name}</Text>
      </NavLink>
    ))
  ), [darkMode, pathname, onGoToCourse]);

  return (
    <Paper className="MobileFooter" flexName="flexible">
      <Paper className={classnames('MobileFooter_body', { 'darkMode': darkMode })} flexName="flexible">
        {mobileData}
      </Paper>
    </Paper>
  )
};

export default connect(mapStateToProps, {
  toggleIsOpenLogin,
})(withRouter(MobileFooter));
