import createReducer from 'helpers/createReducer';
import { combineReducers } from 'redux';
import {
  USER,
  LOGIN,
  COURSE,
  COURSES,
  DARK_MODE,
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

const courses = createReducer(COURSES);
const course = createReducer(COURSE);
const login = createReducer(LOGIN);
const user = createReducer(USER);

const rootReducer = combineReducers({
  user,
  login,
  course,
  courses,
  darkMode,
  isOpenLogin,
});

export default rootReducer;
