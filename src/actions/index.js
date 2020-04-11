import CreateActionCreator  from 'helpers/createActionCreator';
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

const deleteProfile = _ => CreateActionCreator.delete({
    path: 'user/my',
});

const updatePassword = data => CreateActionCreator.update({
    path: 'user/current/password',
    body: data
});

const fetchCourses = (page = 0, limit = 30) => CreateActionCreator.read({
    path: `video-courses?page=${page}&limit=${limit}`,
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

const fetchMycourses = _ => CreateActionCreator.read({
    path: 'my-courses',
    type: MY_COURSES,
});

const saveInMycourses = data => CreateActionCreator.create({
    path: 'my-courses',
    body: data
});

const uploadImage = data => CreateActionCreator.create({
    path: 'files/upload',
    data,
});

export {
  uploadImage,
  loginAsUser,
  fetchCourse,
  fetchLessons,
  fetchCourses,
  fetchProfile,
  updateProfile,
  deleteProfile,
  updatePassword,
  fetchMycourses,
  registerAsUser,
  toggleDarkMode,
  saveInMycourses,
  toggleIsOpenLogin,
};
