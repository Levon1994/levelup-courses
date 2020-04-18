import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import classnames from 'classnames';

import {
  Main,
  Login,
  Course,
  Search,
  Profile,
  Favorites,
  CourseItem,
} from 'containers';

import {
  Header,
  Footer,
  MobileFooter,
  DarkModeButton
} from 'components';

import {
  fetchProfile,
  toggleDarkMode,
  toggleIsOpenLogin,
} from 'actions';

import { isMobile } from 'utils';
import Autorize from 'utils/autorize';

import 'sass/animate.scss';
import 'sass/main.scss';
import 'sass/media.scss';
import 'sass/feather-icon.scss';

const mapStateToProps = ({
  isOpenLogin,
  darkMode,
  login,
  user,
}) => ({
  isOpenLogin,
  darkMode,
  login,
});

const App = ({
  user,
  login,
  darkMode,
  isOpenLogin,
  fetchProfile,
  toggleDarkMode,
}) => {

  const mobile = isMobile();

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDarkMode(true);
    };
  },[toggleDarkMode]);

  useEffect(() => {
    if (token) {
        fetchProfile();
    };
  },[fetchProfile, token]);

  return (
    <>
      {!mobile && <Header darkMode={darkMode} />}
        <main className={classnames("Main", { 'darkMode': darkMode })}>
          {!mobile &&
            <DarkModeButton
              active={darkMode}
              onClick={toggleDarkMode}
            />
          }
          {isOpenLogin && <Login/>}
          <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/course/:id" component={CourseItem} />
              <Route exact path="/search/:courseName" component={Search} />
              <Autorize toggleIsOpenLogin={toggleIsOpenLogin} login={login}>
                <Route path="/course/:id/:lessonId" component={Course} />
                <Route path="/profile" component={Profile} />
                <Route path="/my-courses" component={Favorites} />
              </Autorize>
              <Redirect from='/' to='/' />
          </Switch>
        </main>
      {mobile ? <MobileFooter /> : <Footer/>}
    </>
  )
};

export default connect(mapStateToProps, {
  fetchProfile,
  toggleDarkMode,
})(withRouter(App));
