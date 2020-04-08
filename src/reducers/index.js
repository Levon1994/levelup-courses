import createReducer from 'helpers/createReducer';
import { combineReducers } from 'redux';
import {
  USER,
  LOGIN,
  COURSE,
  COURSES,
  LESSONS,
  DARK_MODE,
  MY_COURSES,
  IS_OPEN_LOGIN,
} from 'configs/types';

const darkMode = (state = false, action) => {
  switch (action.type) {
    case DARK_MODE:
      return action.payload;
    default:
      return state;
  };
};

const isOpenLogin = (state = false, action) => {
  switch (action.type) {
    case IS_OPEN_LOGIN:
      return action.payload;
    default:
      return state;
  };
};

const myCourses = createReducer(MY_COURSES);
const courses = createReducer(COURSES);
const lessons = createReducer(LESSONS);
const course = createReducer(COURSE);
const login = createReducer(LOGIN);
const user = createReducer(USER);

const rootReducer = combineReducers({
  user,
  login,
  course,
  lessons,
  courses,
  darkMode,
  myCourses,
  isOpenLogin,
});

export default rootReducer;
