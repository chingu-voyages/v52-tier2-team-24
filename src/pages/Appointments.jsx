import { useState, useEffect } from "react";
import sun from "../images/weather.png";
import { formatAddress } from "../helpers/formatAddress";

const Appointments = () => {
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  useEffect(() => {
    const existingAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const acceptedApps = existingAppointments.filter((app) => !app.isNew);
    setAcceptedAppointments(acceptedApps);
  }, []);

  const toggleVisitStatus = (id) => {
    setAcceptedAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, isVisited: !appointment.isVisited }
          : appointment
      )
    );

    const allAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const updatedAppointments = allAppointments.map((app) =>
      app.id === id ? { ...app, isVisited: !app.isVisited } : app
    );
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };
  console.log("Address", acceptedAppointments);

  return (
    <div className="space-y-2 ">
      {acceptedAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments.</p>
      ) : (
        acceptedAppointments.map((appointment) => (
          // ENTIRE ROW
          <div
            key={appointment.id}
            className="flex flex-col border-y-2 border-gray-400 bg-gray-200"
          >
            {/* NAME AND LOGO */}
            <div className="flex">
              <div className="flex w-1/2 items-center gap-1">
                <img src={sun} className="h-[30px] " />

                <p className="font-bold">{appointment.name}</p>
              </div>
              {/* Toggle */}
              <div className="flex flex-col w-1/2 items-end justify-center my-2 mr-2 ">
                <button
                  className="w-12 h-7 border-2 border-gray-400 rounded-full relative bg-white  transition-colors "
                  onClick={() => toggleVisitStatus(appointment.id)}
                >
                  <div
                    className={`absolute w-5 h-5 rounded-full top-0.5 left-0.3 transition-transform ${
                      appointment.isVisited
                        ? "transform translate-x-6 bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </button>{" "}
                {/* <p className="text-gray-500 text-sm">
                  {appointment.time} | {appointment.date}
                </p> */}
              </div>
            </div>
            {/* Date | Time | Address */}
            <div className="ml-2">
              <p className="text-gray-500 text-sm">
                {appointment.time} | {appointment.date}
              </p>
              <p className="text-md  mr-1">
                {formatAddress(appointment.address)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;

/* <button
                className="w-12 h-6 rounded-full relative bg-gray-200 transition-colors"
                onClick={() => toggleVisitStatus(appointment.id)}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full top-0.5 left-0.5 transition-transform ${
                    appointment.isVisited ? 'transform translate-x-6 bg-green-500' : 'bg-red-500'
                  }`}
                />
              </button> */
