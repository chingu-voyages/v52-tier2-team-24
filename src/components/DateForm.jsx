import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';

const DateForm = () => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('10:00 AM');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Date:', appointmentDate);
    console.log('Appointment Time:', appointmentTime);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="appointmentDate">Choose a Date:</label>
        <DatePicker
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
          required
        />
      </div>
      <div>
        <label htmlFor="appointmentTime">Choose a Time:</label>
        <TimePicker
          onChange={setAppointmentTime}
          value={appointmentTime}
          required
        />
      </div>
    </form>
  );
};

export default DateForm;
