import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';

import {
  addEvent,
  deleteEvent,
} from 'actions';
import uuid from 'helpers/uuid';

import './index.scss';

const defaultFilter = {
  event: '',
  date: new Date(),
};

const mapStateToProps = ({
  events,
}) => ({
  events,
});

const App = ({
  events,
  addEvent,
  deleteEvent,
}) => {

  const [filter, setFiler] = useState(defaultFilter);
  const [isValid, setIsValid] = useState(false);
  const { event, date } = filter;

  useEffect(() => {
    const valid = date && event;
    setIsValid(valid);
  }, [event, date]);

  const addNewEvent = useCallback(() => {
    const dayDiff = Math.abs(dayjs().diff(filter.date, 'day'));
    const hourDiff = Math.abs(dayjs().diff(filter.date, 'hour'));
    const minuteDiff = Math.abs(dayjs().diff(filter.date, 'minute'));

    const hour = hourDiff%60;
    const minute = minuteDiff%60;

    const newDate = dayDiff 
      ? `${dayDiff}d ${hour}hour ${minute}min`
      : hourDiff
        ? minute ? `${hour}hour ${minute}min` : `${hour}hour`
        : `${minute}min`;

    addEvent({ 
      ...filter,
      date: newDate, 
      dateValue: filter.date,
      Id: uuid(), 
    })
  }, [filter, addEvent]);

  const headerContent = useMemo(() => (
    <div className="form-header flexible jBetween">
      <input
        onChange={({ target }) => setFiler(prev => ({ ...prev, event: target.value }))}
        value={event}
      />
      <DatePicker
      showTimeSelect
      minDate={new Date()}
      dateFormat="Pp"
        selected={date}
        onChange={newDate => setFiler(prev => ({ ...prev, date: newDate }))}
      />
      <button 
        disabled={!isValid}
        onClick={addNewEvent}
      >
          Add Event
      </button>
    </div>
  ), [isValid, event, date, addNewEvent]);

  const eventsContent = useMemo(() => {
    if (!events?.length) return null;

    return events
      .sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      })
      .map(({ Id, event, date, dateValue }) => (
      <div key={Id} className={classnames('event-item flexible jBetween aCenter', {
        'isGreen': Math.abs(dayjs().diff(dateValue, 'hour')) > 0,
        'isYellow': Math.abs(dayjs().diff(dateValue, 'minute')) > 10 && Math.abs(dayjs().diff(dateValue, 'minute')) <= 60,
        'isRed': Math.abs(dayjs().diff(dateValue, 'minute')) >= 0 && Math.abs(dayjs().diff(dateValue, 'minute')) <= 10,
      })}>
        <div>{date}</div>
        <div>{event}</div>
        <button onClick={() => deleteEvent(Id)}>Delete Event</button>
      </div>
    ));
  }, [events, deleteEvent]);

  return (
    <main>
      {headerContent}
      {eventsContent}
    </main>
  )
};

export default connect(mapStateToProps, {
  addEvent,
  deleteEvent,
})(App);
