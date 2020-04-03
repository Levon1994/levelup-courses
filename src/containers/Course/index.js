import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import {
  Paper,
  BlogCard,
} from 'components';

const Course = ({ match: { params } }) => {

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
            name: 'Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
          {
            name: 'Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
          {
            name: 'Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          },
        ]
      },
      {
        name: 'Setting up our Tools',
        duration: '1min',
        id: 2,
        subItems: [
          {
            name: 'Setting up our Tools',
            duration: '1min',
            url: 'https://vs1.coursehunter.net/udemy-complete-js-course/lesson2.mp4',
          }
        ]
      },
      {
        name: 'Lets start coding',
        duration: '1min',
        id: 3,
        subItems: [
          {
            name: 'Setting up our Tools',
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

  const { id, lessonId } = params;

  const [url, setUrl] = useState(data.items[0].subItems[0].url);

  return (
    <section className="Course">
      <Paper className ='page-content' flexName='flexible vertical jBetween'>

        <ul>
          {data.items.map(item => (
              <li key={item.name} onClick={() => setUrl(item.url)}>{item.url}</li>
          ))}
        </ul>
      </Paper>
      <Paper className="player-content">
        <ReactPlayer
          className="player"
          url={url}
          controls
          loop={false}
          playing={false}
          onEnded={data => console.log('onEnded', data)}
        />
      </Paper>
      <Paper className="lessons-list">

      </Paper>
    </section>
  )
};

export default Course;
