import { useState, useEffect } from "react";
import sun from "../images/weather.png";
import { formatAddress } from "../helpers/formatAddress";
import FileUpload from "../components/FileUpload";
import FileDownload from "../components/FileUpload";

const Appointments = () => {
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  const fetchAcceptedAppointments = () => {
    const existingAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    setAcceptedAppointments(existingAppointments);
  };

  useEffect(() => {
    fetchAcceptedAppointments();

    const handleStorageChange = (event) => {
      if (event.key === "appointments" || !event.key) {
        fetchAcceptedAppointments();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("appointmentsUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("appointmentsUpdated", handleStorageChange);
    };
  }, []);

  const toggleVisitStatus = (id) => {
    const updatedAppointments = acceptedAppointments.map((appointment) =>
      appointment.id === id
        ? { ...appointment, isVisited: !appointment.isVisited }
        : appointment
    );

    setAcceptedAppointments(updatedAppointments);

    const allAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const updatedAllAppointments = allAppointments.map((app) =>
      app.id === id ? { ...app, isVisited: !app.isVisited } : app
    );
    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAllAppointments)
    );
  };
  
  return (
    <div className="space-y-2">
      {acceptedAppointments.length === 0 ? (
        <p className="text-gray-500 text-center justify-center">
          No appointments.
        </p>
      ) : (
        acceptedAppointments.map((appointment) => (
          // ENTIRE ROW
          <div
            key={appointment.id}
            className="flex ml-2 mr-2 flex-col  border-b-2 border-gray-300 md:flex-row md:items-center md:justify-between relative"
          >
            {/* NAME AND LOGO */}
            <div className="flex md:w-1/2">
              <div className="flex items-center gap-1">
                <img src={sun} className="h-[30px] " />
                <p className="font-bold">
                  {appointment.firstName} {appointment.lastName}
                </p>
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

              <p className="text-md  mr-1  ">
                {formatAddress(appointment.address)}
              </p>
            </div>

            {/* Toggle */}
            <div className="sm:flex sm:flex-col sm:items-end sm:static absolute right-2 m-2 ">
              <button
                className="w-12 h-7 border-2 border-gray-400 rounded-full relative bg-white  transition-colors "
                onClick={() => {toggleVisitStatus(appointment.id)
            
                }}
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
            {appointment.isVisited && <FileUpload />}
          </div>
        ))
      )}

    </div>
  );
};

export default Appointments;