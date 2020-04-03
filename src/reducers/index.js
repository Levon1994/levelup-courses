import createReducer from 'helpers/createReducer';
import { combineReducers } from 'redux';
import {
  BLOG,
  BLOGS,
  COURSE,
  COURSES,
  CAREERS,
  STUDENTS,
  PARTNERS,
  DARK_MODE,
  TEAMMEMBERS,
  TESTIMONIALS,
  WEBSITE_SETTINGS
} from 'configs/types';

const darkMode = (state = false, action) => {
  switch (action.type) {
    case DARK_MODE:
      return action.payload;
    default:
      return state;
  };
};

const blogItem = createReducer(BLOG);
const course = createReducer(COURSE);
const blogItems = createReducer(BLOGS);
const courses = createReducer(COURSES);
const careers = createReducer(CAREERS);
const students = createReducer(STUDENTS);
const partners = createReducer(PARTNERS);
const teamMembers = createReducer(TEAMMEMBERS);
const testimonials = createReducer(TESTIMONIALS);
const website_settings = createReducer(WEBSITE_SETTINGS);

const rootReducer = combineReducers({
  course,
  careers,
  courses,
  students,
  partners,
  blogItem,
  darkMode,
  blogItems,
  teamMembers,
  testimonials,
  website_settings
});

export default rootReducer;
