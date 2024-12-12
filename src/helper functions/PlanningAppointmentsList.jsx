import PropTypes from "prop-types";
import sun from "../images/weather.png";
import { formatAddress } from "../helpers/formatAddress";

const PlanningAppointmentsList = ({ appointments }) => {
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
      <div className="flex md:w-1/2">
        <div className="flex items-center gap-1">
          <img src={sun} className="h-[30px] " />
          <p className="font-bold">{appointment.name}</p>
        </div>
      </div>

      {/* DATE TIME ADDRESS */}
      <div className=" md:flex  md:items-start md:gap-6 md:w-3/4">
        <div className="flex gap-4">
          <p className="text-gray-500 text-sm">
            <span className="text-black font-bold">Date:</span>{" "}
            {appointment.date}{" "}
          </p>
          <p className="text-gray-500 text-sm">
            {" "}
            <span className="text-black font-bold"> Time:</span>{" "}
            {appointment.time}
          </p>
        </div>

        <p className="text-md  mr-1  ">{formatAddress(appointment.address)}</p>
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
