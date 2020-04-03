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
  Course,
  CourseItem,
} from 'containers';

import {
  Header,
  Footer,
  DarkModeButton
} from 'components';
import { useMount } from 'utils';

import { toggleDarkMode } from 'actions';

import 'sass/animate.scss';
import 'sass/main.scss';
import 'sass/media.scss';
import 'sass/feather-icon.scss';

const mapStateToProps = ({ darkMode }) => ({ darkMode });

const App = ({
  darkMode,
  toggleDarkMode,
}) => {

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDarkMode(true);
    };
  },[toggleDarkMode]);

  return (
    <>
      <Header darkMode={darkMode} />
        <main className={classnames("Main", { 'darkMode': darkMode })}>
          <DarkModeButton
            active={darkMode}
            onClick={toggleDarkMode}
          />
          <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/course/:id" component={CourseItem} />
              <Route path="/course/:id/:lessonId" component={Course} />
              <Redirect from='/' to='/'/>
          </Switch>
        </main>
      <Footer/>
    </>
  )
};

export default connect(mapStateToProps, {
  toggleDarkMode,
})(withRouter(App));
