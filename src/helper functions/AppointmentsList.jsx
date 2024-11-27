import sun from "../images/weather.png";

const AppointmentsList = ({ appointments }) => {
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
    </div>
  ));
};

export default AppointmentsList;
