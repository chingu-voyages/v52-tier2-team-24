import PropTypes from "prop-types";
import sun from "../images/weather.png";

const PlanningAppointmentsList = ({ appointments }) => {
  console.log("Planning LIST APPT------------->", appointments)
  if (appointments.length === 0) {
    return <p className="text-center text-gray-500">No appointments found for selected period.</p>;
  }

  return appointments.map(appointment => (
    <div key={appointment.id} className="flex justify-between items-center p-4 bg-white rounded-lg">
      <div className="flex items-center gap-4">
        <img src={sun} className="h-[30px]" alt="sun icon" />
        <div>
          <p className="font-medium">{appointment.name}</p>
          <p className="text-gray-500">{appointment.address}</p>
        </div>
      </div>
      <p className="text-gray-500">{appointment.time}</p>
      <p className="text-gray-500">{appointment.date}</p>
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
