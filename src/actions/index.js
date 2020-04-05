import CreateActionCreator  from 'helpers/createActionCreator';
import {
  USER,
  LOGIN,
  DARK_MODE,
  IS_OPEN_LOGIN,
} from 'configs/types';

const toggleDarkMode = (darkMode) => ({
  type: DARK_MODE,
  payload: darkMode
});

const toggleIsOpenLogin = (isOpenLogin) => ({
  type: IS_OPEN_LOGIN,
  payload: isOpenLogin
});

const loginToAdmin = data => CreateActionCreator.create({
    path: 'signin/signin-standard',
    type: LOGIN,
    body: data,
    forLogin: true,
});

const fetchProfile = _ => CreateActionCreator.read({
    path: 'user',
    type: USER,
});

const updateProfile = data => CreateActionCreator.update({
    path: 'user',
    type: USER,
    body: data
});

export {
  loginToAdmin,
  fetchProfile,
  updateProfile,
  toggleDarkMode,
  toggleIsOpenLogin,
};
