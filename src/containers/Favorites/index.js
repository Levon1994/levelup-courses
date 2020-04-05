import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  Text,
  Paper,
  BlogCard,
} from 'components';

import './style.scss';

const mapStateToProps = ({ darkMode }) => ({ darkMode });

const Favorites = ({
  darkMode,
}) => {
  return (
    <section className={classnames('Favorites', { 'darkMode': darkMode })}>
      <h1><Text className="doubleExtraLarge" darkMode={darkMode}>My Courses</Text></h1>
      <Paper className="page-content" flexName="flexible wrap jAround">
        <NavLink to={`/course/5e88e3a042ed152bd7990f46`}>
          <BlogCard
            darkMode={darkMode}
            title="React Native Advanced 2 test"
            description="Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!"
            createdBy="Stephen Grider"
            src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
            width="280px"
          />
        </NavLink>
        <NavLink to={`/course/5e88e3a042ed152bd7990f46`}>
          <BlogCard
            darkMode={darkMode}
            title="React Native Advanced 2 test"
            description="Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!"
            createdBy="Stephen Grider"
            src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
            width="280px"
          />
        </NavLink>
        <NavLink to={`/course/5e88e3a042ed152bd7990f46`}>
          <BlogCard
            darkMode={darkMode}
            title="React Native Advanced 2 test"
            description="Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!"
            createdBy="Stephen Grider"
            src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
            width="280px"
          />
        </NavLink>
        <NavLink to={`/course/5e88e3a042ed152bd7990f46`}>
          <BlogCard
            darkMode={darkMode}
            title="React Native Advanced 2 test"
            description="Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!"
            createdBy="Stephen Grider"
            src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
            width="280px"
          />
        </NavLink>
        <NavLink to={`/course/5e88e3a042ed152bd7990f46`}>
          <BlogCard
            darkMode={darkMode}
            title="React Native Advanced 2 test"
            description="Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!"
            createdBy="Stephen Grider"
            src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
            width="280px"
          />
        </NavLink>
      </Paper>
    </section>
  )
};

export default connect(mapStateToProps, null)(Favorites);
