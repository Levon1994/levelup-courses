import { combineReducers } from 'redux';
import {
  ADD_EVENT, 
  DELETE_EVENT,
} from 'configs/types';

const events = (state = [], action) => {
  switch (action.type) {
    case ADD_EVENT:
      const newState = [...state];
      newState.push(action.payload)
      return newState;
    case DELETE_EVENT:
      return state.filter(item => item.Id !== action.payload);
    default:
      return state;
  };
};

const rootReducer = combineReducers({
  events,
});

export default rootReducer;
