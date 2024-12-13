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

  const handleFileChange = (event, appointmentId) => {
    const file = event.target.files[0];
    if (file) {
      setReceipt(file); 
      console.log(`Receipt for appointment ${appointmentId}:`, file);
    }
  };


  return (
    <div className="space-y-2 ">
      {acceptedAppointments.length === 0 ? (
        <p className="text-gray-500 text-center justify-center">
          No appointments.
        </p>
      ) : (
        acceptedAppointments.map((appointment) => (
          // ENTIRE ROW
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
              <p className="text-md  mr-1">
                {formatAddress(appointment.address)}
              </p>
            </div>

            {/* Toggle */}
            <div className="sm:flex sm:flex-col sm:items-end sm:static absolute right-2 m-2 ">
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
            </div>

            {/* File Upload Button */}
            <div className="sm:flex sm:flex-col sm:items-end sm:static absolute right-20 m-2">
              <input
                type="file"
                accept="image/*, .pdf"
                className="border-2 border-gray-400 rounded-md px-2 py-1 cursor-pointer"
                onChange={(e) => handleFileChange(e, appointment.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;
