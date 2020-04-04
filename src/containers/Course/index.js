import React, { useState } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

import {
  Icon,
  Text,
  Paper,
} from 'components';

import CourseAccordion from './CourseAccordion';

import './style.scss';

const mapStateToProps = ({ darkMode }) => ({ darkMode });

const Course = ({
   match: { params },
   darkMode,
}) => {

  const [isOpen, setIsOpen] = useState(true);

  const data = {
    title: 'React Native Advanced',
    subtitle: 'Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!',
    createdby: 'Stephen Grider',
    items: [
      {
        name: 'Welcome to the Course!',
        duration: '1min',
        id: 1,
        subItems: [
          {
            name: '1. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4',
          },
          {
            name: '2. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
          {
            name: '3. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson3.mp4',
          },
          {
            name: '1. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4',
          },
          {
            name: '2. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
          {
            name: '3. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson3.mp4',
          },
          {
            name: '1. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4',
          },
          {
            name: '2. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
          {
            name: '3. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson3.mp4',
          },
        ]
      },
      {
        name: 'Welcome to the Course!',
        duration: '1min',
        id: 7,
        subItems: [
          {
            name: '1. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4',
          },
          {
            name: '2. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
          {
            name: '3. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson3.mp4',
          },
        ]
      },
      {
        name: 'Welcome to the Course!',
        duration: '1min',
        id: 6,
        subItems: [
          {
            name: '1. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4',
          },
          {
            name: '2. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
          {
            name: '3. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson3.mp4',
          },
        ]
      },
      {
        name: 'Welcome to the Course!',
        duration: '1min',
        id: 5,
        subItems: [
          {
            name: '1. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4',
          },
          {
            name: '2. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
          {
            name: '3. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson3.mp4',
          },
        ]
      },
      {
        name: 'Welcome to the Course!',
        duration: '1min',
        id: 55,
        subItems: [
          {
            name: '1. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4',
          },
          {
            name: '2. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
          {
            name: '3. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson3.mp4',
          },
        ]
      },
      {
        name: 'Setting up our Tools',
        duration: '1min',
        id: 2,
        subItems: [
          {
            name: '4. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson4.mp4',
          }
        ]
      },
      {
        name: 'Lets start coding',
        duration: '1min',
        id: 3,
        subItems: [
          {
            name: '5. Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
        ],
      },
    ],
    demoItems: [
      {
        name: 'Welcome to the Course!',
        duration: '1min',
        url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4',
      },
      {
        name: 'Welcome to the Course!',
        duration: '1min',
        url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4',
      },
    ],
    whatYouWillLearn: ['Make compelling applications using', 'Build new React Native apps with Expo'],
    requirements: ['Basic understanding of React Native'],
    description: 'string',
  };

  //const { id, lessonId } = params;

  const [url, setUrl] = useState(data.items[0].subItems[0].url);

  return (
    <section className={classnames('Course flexible jBetween', { 'darkMode': darkMode })}>
      <Paper className={classnames('player-content', { 'isOpen': isOpen })} flexName="flexible vertical">
        {!isOpen && <Icon className="icon-feather-arrow-left" onClick={() => setIsOpen(true)} />}
        <ReactPlayer
          className="player"
          url={url}
          controls
          loop={false}
          playing={true}
          onEnded={data => console.log('onEnded', data)}
        />
        <Paper className="text-block" flexName="flexible vertical">
          <Text className="extraLarge" darkMode={darkMode}>About this course</Text>
          <Text darkMode={darkMode}>{data.subtitle}</Text>
          <Text className="extraLarge" darkMode={darkMode}>Description</Text>
          <Text darkMode={darkMode}>{data.description}</Text>
        </Paper>
      </Paper>
      {
        isOpen &&
        <Paper className="lessons-list">
          <CourseAccordion
            setIsOpen={setIsOpen}
            data={data.items}
            darkMode={darkMode}
            onSelectVideo={setUrl}
          />
        </Paper>
      }
    </section>
  )
};

export default connect(mapStateToProps, null)(Course);
