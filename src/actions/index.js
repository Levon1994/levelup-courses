import CreateActionCreator  from 'helpers/createActionCreator';
import {
  USER,
  LOGIN,
  COURSE,
  COURSES,
  LESSONS,
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

const loginAsUser = data => CreateActionCreator.create({
    path: 'signin/signin-standard',
    type: LOGIN,
    body: data,
});

const registerAsUser = data => CreateActionCreator.create({
    path: 'signup/signup-standard',
    body: data,
});

const fetchProfile = _ => CreateActionCreator.read({
    path: 'user',
    type: USER,
    isChecked: true,
});

const updateProfile = data => CreateActionCreator.update({
    path: 'user',
    type: USER,
    body: data
});

const fetchCourses = _ => CreateActionCreator.read({
    path: 'video-courses',
    type: COURSES,
    withAuthToken: true,
});

const fetchCourse = id => CreateActionCreator.read({
    path: `video-courses/${id}`,
    type: COURSE,
    withAuthToken: true,
});

const fetchLessons = id => CreateActionCreator.read({
    path: `video-courses/items/${id}`,
    type: LESSONS,
});

export {
  loginAsUser,
  fetchCourse,
  fetchLessons,
  fetchCourses,
  fetchProfile,
  updateProfile,
  registerAsUser,
  toggleDarkMode,
  toggleIsOpenLogin,
};
