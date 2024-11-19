import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
// import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';

const DateForm = ({ setValue, clearErrors, register }) => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleDateChange = (date) => {
    setAppointmentDate(date);
    combineDateTime(date, appointmentTime);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setAppointmentTime(time);
    combineDateTime(appointmentDate, time);
  };

  const combineDateTime = (date, time) => {
    if (date && time) {
      const formattedDate = date.toISOString().split("T")[0];
      const combinedDateTime = `${formattedDate} ${time}`;
      setValue("dateTime", combinedDateTime);
      clearErrors("dateTime");
    }
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
    <div className="sm:flex-row sm:w-1/2 flex flex-col w-full gap-2">
      <div>
        <DatePicker  className="w-full py-1.5 pl-2 rounded-lg border border-slate-400"
          selected={appointmentDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
        //   required
        />
      </div>
      <div  className="w-full sm:w-1/2">
      <select
          className="w-full pl-2 py-2 mb-4 border rounded-lg focus:outline-slate-400"
        //   id="appointmentTime"
          value={appointmentTime}
          onChange={handleTimeChange}
        //   required
        >
             <option value="">Select Time</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <input
        type="hidden"
        {...register("dateTime")}
        value={appointmentDate && appointmentTime ? `${appointmentDate.toISOString().split("T")[0]} ${appointmentTime}` : ""}
      />
    </div>
  );
};

export default DateForm;
