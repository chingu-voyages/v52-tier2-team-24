import PropTypes from "prop-types";
import sun from "../images/weather.png";
import { formatAddress } from "../helpers/formatAddress";

const PlanningAppointmentsList = ({ appointments }) => {
  console.log("Planning LIST APPT------------->", appointments);
  if (appointments.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No appointments found for selected period.
      </p>
    );
  }

  return appointments.map((appointment) => (
    <div
      key={appointment.id}
      className="flex flex-col  border-y-2 border-gray-300 bg-gray-100  md:flex-row md:items-center md:justify-between relative"
    >
      {/* NAME AND LOGO */}
      <div className="flex md:w-1/3">
        <div className="flex items-center gap-1">
          <img src={sun} className="h-[30px] " />
          <p className="font-bold">{appointment.name}</p>
        </div>
      </div>

      {/* DATE TIME ADDRESS */}
      <div className="ml-2 md:flex md:justify-start md:items-center md:gap-6">
        <p className="text-gray-500 text-sm">
          {appointment.time} | {appointment.date}
        </p>
        <p className="text-md  mr-1">{formatAddress(appointment.address)}</p>
      </div>
    </div>
  ));
};

PlanningAppointmentsList.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PlanningAppointmentsList;
