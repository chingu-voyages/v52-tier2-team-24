import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateForm = ({ setValue, clearErrors, register, openTimeSlotModal }) => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    const initialTime = getNextAvailableTime(new Date());
    setAppointmentTime(initialTime);

    setValue("date", formatDate(new Date()));
    setValue("time", initialTime);
  }, []);

  const handleDateChange = (date) => {
    setAppointmentDate(date);
    const nextAvailableTime = getNextAvailableTime(date);
    setAppointmentTime(nextAvailableTime);

    setValue("date", formatDate(date));
    setValue("time", nextAvailableTime);

    clearErrors("date");
    clearErrors("time");
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setAppointmentTime(time);

    setValue("time", time);
    clearErrors("time");

    openTimeSlotModal();
  };

  const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getNextAvailableTime = (date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    let hour = isToday ? now.getHours() + 1 : 9;
    hour = Math.max(9, Math.min(18, hour));
    return `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`;
  };

  const generateTimeOptions = () => {
    const times = [];
    const now = new Date();
    const isToday = appointmentDate.toDateString() === now.toDateString();
    const startHour = isToday ? now.getHours() + 1 : 9;

    for (let hour = startHour; hour <= 18; hour++) {
      const suffix = hour < 12 ? "AM" : "PM";
      const hour12 = hour > 12 ? hour - 12 : hour;
      const formattedTime = `${hour12}:00 ${suffix}`;
      times.push(formattedTime);
    }
    return times;
  };

  return (
    <div className="sm:flex-row sm:w-1/2 flex flex-col w-full gap-2">
      <div>
        <DatePicker
          className="w-full py-1.5 pl-2 rounded-lg border border-slate-400"
          selected={appointmentDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select Date"
          minDate={new Date()}
        />
      </div>
      <div className="w-full sm:w-1/2">
        <select
          className="w-full pl-2 py-2 mb-4 border rounded-lg focus:outline-slate-400"
          value={appointmentTime}
          onChange={handleTimeChange}
        >
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      {/* Register separate hidden inputs for date and time */}
      <input
        type="hidden"
        {...register("date")}
        value={appointmentDate ? formatDate(appointmentDate) : ""}
      />
      <input
        type="hidden"
        {...register("time")}
        value={appointmentTime || ""}
      />
    </div>
  );
};

DateForm.propTypes = {
  setValue: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  openTimeSlotModal: PropTypes.func.isRequired,
};

export default DateForm;
