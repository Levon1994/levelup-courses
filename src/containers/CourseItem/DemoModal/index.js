import React from 'react';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import ReactPlayer from 'react-player';

import {
  Text,
  Icon,
  Paper,
  Image,
} from 'components';

import './style.scss';

const DemoModal = ({
  name,
  onClose,
  darkMode,
}) => {


  return (
    createPortal(
      <Paper className={classnames('DemoModal', { 'darkMode': darkMode })}>
        <Paper className="DemoModal_content">
          <Icon width={40} height={40} name="close" onClick={onClose}/>
          <Paper className="DemoModal_header" flexName="flexible aCenter">
            <Text darkMode={darkMode} className="large singleLine truncate">{name}</Text>
          </Paper>
          <Paper className="DemoModal_body">
            <ReactPlayer
              className="player"
              url="https://vs1.coursehunter.net/udemy-complete-js-course/lesson1.mp4"
              controls
              loop={false}
              playing={true}
            />
          </Paper>
          <Paper className="DemoModal_aside" flexName="flexible aCenter">
            <Text darkMode={darkMode}>Free Sample Videos:</Text>
          </Paper>
          <Paper className="DemoModal_list">
            <ul>
              <li className="flexible jBetween aCenter">
                <Paper flexName="flexible">
                  <Image
                    width={120}
                    height={70}
                    src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                  />
                  <Paper className="text-line" flexName="flexible aCenter">
                    <Icon className="icon-feather-play" />
                    <Text darkMode={darkMode}>The Complete JavaScript Course 2020: Build Real Projects!</Text>
                  </Paper>
                </Paper>
                <Text darkMode={darkMode}>2min</Text>
              </li>
              <li className="flexible jBetween aCenter">
                <Paper flexName="flexible">
                  <Image
                    width={120}
                    height={70}
                    src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                  />
                  <Paper className="text-line" flexName="flexible aCenter">
                    <Icon className="icon-feather-play" />
                    <Text darkMode={darkMode}>The Complete JavaScript Course 2020: Build Real Projects!</Text>
                  </Paper>
                </Paper>
                <Text darkMode={darkMode}>2min</Text>
              </li>
              <li className="flexible jBetween aCenter">
                <Paper flexName="flexible">
                  <Image
                    width={120}
                    height={70}
                    src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                  />
                  <Paper className="text-line" flexName="flexible aCenter">
                    <Icon className="icon-feather-play" />
                    <Text darkMode={darkMode}>The Complete JavaScript Course 2020: Build Real Projects!</Text>
                  </Paper>
                </Paper>
                <Text darkMode={darkMode}>2min</Text>
              </li>
              <li className="flexible jBetween aCenter">
                <Paper flexName="flexible">
                  <Image
                    width={120}
                    height={70}
                    src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                  />
                  <Paper className="text-line" flexName="flexible aCenter">
                    <Icon className="icon-feather-play" />
                    <Text darkMode={darkMode}>The Complete JavaScript Course 2020: Build Real Projects!</Text>
                  </Paper>
                </Paper>
                <Text darkMode={darkMode}>2min</Text>
              </li>
              <li className="flexible jBetween aCenter">
                <Paper flexName="flexible">
                  <Image
                    width={120}
                    height={70}
                    src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                  />
                  <Paper className="text-line" flexName="flexible aCenter">
                    <Icon className="icon-feather-play" />
                    <Text darkMode={darkMode}>The Complete JavaScript Course 2020: Build Real Projects!</Text>
                  </Paper>
                </Paper>
                <Text darkMode={darkMode}>2min</Text>
              </li>
              <li className="flexible jBetween aCenter">
                <Paper flexName="flexible">
                  <Image
                    width={120}
                    height={70}
                    src="https://img-a.udemycdn.com/course/480x270/1172996_0241_5.jpg"
                  />
                  <Paper className="text-line" flexName="flexible aCenter">
                    <Icon className="icon-feather-play" />
                    <Text darkMode={darkMode}>The Complete JavaScript Course 2020: Build Real Projects!</Text>
                  </Paper>
                </Paper>
                <Text darkMode={darkMode}>2min</Text>
              </li>
            </ul>
          </Paper>
        </Paper>
      </Paper>,
      document.querySelector('#root-portal')
    )
  )
};

export default DemoModal;
