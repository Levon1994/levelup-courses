import createReducer from 'helpers/createReducer';
import { combineReducers } from 'redux';
import {
  USER,
  LOGIN,
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

const login = createReducer(LOGIN);
const user = createReducer(USER);

const rootReducer = combineReducers({
  user,
  login,
  darkMode,
  isOpenLogin,
});

export default rootReducer;
