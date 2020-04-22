import CreateActionCreator  from 'helpers/createActionCreator';
import {
  USER,
  LOGIN,
  COURSE,
  COURSES,
  LESSONS,
  DARK_MODE,
  MY_COURSES,
  CATEGORIES,
  IS_OPEN_LOGIN,
  COURSESSBYNAME,
  COURSESBYSCATEGORYNAME,
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

const signInFacebook = data => CreateActionCreator.create({
    path: 'signin/sign-facebook',
    type: LOGIN,
    body: data,
});

const signInGoogle = data => CreateActionCreator.create({
    path: 'signin/sign-google',
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

const fetchCourses = (page = 0, limit = 60) => CreateActionCreator.read({
    path: `video-courses?page=${page}&limit=${limit}`,
    type: COURSES,
    withAuthToken: true,
});

const fetchCourse = id => CreateActionCreator.read({
    path: `video-courses/${id}`,
    type: COURSE,
    withAuthToken: !window.localStorage.getItem('token'),
});

const fetchLessons = id => CreateActionCreator.read({
    path: `video-courses/items/${id}`,
    type: LESSONS,
});

const fetchMycourses = _ => CreateActionCreator.read({
    path: 'my-courses',
    type: MY_COURSES,
});

const deleteMycourse = courseId => CreateActionCreator.delete({
    path: `my-courses/${courseId}`,
});

const saveInMycourses = data => CreateActionCreator.create({
    path: 'my-courses',
    body: data
});

const uploadImage = data => CreateActionCreator.create({
    path: 'files/upload',
    data,
});

const fetchCategories = (page = 0, limit = 9) => CreateActionCreator.read({
    path: `categories?page=${page}&limit=${limit}`,
    type: CATEGORIES,
    withAuthToken: true,
});

const fetchCourseByName = name => CreateActionCreator.read({
    path: `video-courses/search?s=${name}`,
    type: COURSESSBYNAME,
    withAuthToken: true,
});

const fetchCourseByCategoryName = name => CreateActionCreator.read({
    path: `video-courses/name/${name}`,
    type: COURSESBYSCATEGORYNAME,
    withAuthToken: true,
});

const passwordReset = data => CreateActionCreator.create({
    path: 'password-reset',
    body: data,
    withAuthToken: true,
});

const forgotPassword = data => CreateActionCreator.create({
    path: 'user/forgot-password',
    body: data,
    withAuthToken: true,
});

export {
  uploadImage,
  loginAsUser,
  fetchCourse,
  signInGoogle,
  fetchLessons,
  fetchCourses,
  fetchProfile,
  updateProfile,
  deleteProfile,
  passwordReset,
  signInFacebook,
  deleteMycourse,
  updatePassword,
  fetchMycourses,
  registerAsUser,
  toggleDarkMode,
  forgotPassword,
  saveInMycourses,
  fetchCategories,
  toggleIsOpenLogin,
  fetchCourseByName,
  fetchCourseByCategoryName,
};
