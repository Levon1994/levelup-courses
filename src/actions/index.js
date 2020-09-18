import {
  ADD_EVENT,
  DELETE_EVENT,
} from 'configs/types';

const addEvent = data => ({
  type: ADD_EVENT,
  payload: data,
});

const deleteEvent = Id => ({
  type: DELETE_EVENT,
  payload: Id,
});


export {
  addEvent,
  deleteEvent,
};
