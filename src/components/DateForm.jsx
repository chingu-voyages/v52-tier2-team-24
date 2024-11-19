import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';

const DateForm = () => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('9:00 AM');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Date:', appointmentDate);
    console.log('Appointment Time:', appointmentTime);
  };

  //Adding a manual time picking instead of the time picker
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      const suffix = hour < 12 ? "AM" : "PM";
      const hour12 = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
      const formattedTime = `${hour12}:00 ${suffix}`;
      times.push(formattedTime);
    }
    return times;
  };


  return (
    <form onSubmit={handleSubmit} className="sm:flex-row sm:w-1/2 flex flex-col w-full gap-2">
      <div>
        <DatePicker  className="w-full py-1.5 pl-2 rounded-lg border border-slate-400"
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
          required
        />
      </div>
      <div  className="w-full sm:w-1/2">
      <select
          className="w-full pl-2 py-2 mb-4 border rounded-lg focus:outline-slate-400"
          id="appointmentTime"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        >
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default DateForm;
