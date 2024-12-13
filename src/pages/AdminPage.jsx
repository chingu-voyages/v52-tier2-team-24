import { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import calendar from "../images/calendar.png";
import { formatAddress } from "../helpers/formatAddress";

const AdminPage = () => {
  const navigate = useNavigate();
  const [newAppointments, setNewAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const existingAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    const newUserInput = localStorage.getItem("userInput");
    console.log("NewUserInput", newUserInput)
    if (newUserInput) {
      const data = JSON.parse(newUserInput);
      const newAppointment = {
        id: Date.now(),
        name: `${data.firstName} ${data.lastName}`,
        date: data.date,
        time: data.time,
        address: data.address,
        email: data.email,
        isVisited: false,
        isNew: true,
        longitude: data.longitude,
        latitude: data.latitude,
      };
      setNewAppointments((prev) => [...prev, newAppointment]);
      localStorage.setItem(
        "appointments",
        JSON.stringify([...existingAppointments, newAppointment])
      );
      localStorage.removeItem("userInput");
    } else {
      const newApps = existingAppointments.filter((app) => app.isNew);
      setNewAppointments(newApps);
    }
  }, []);

  const handleLogout = () => {
    //logout logic
    navigate("/");
  };

  const handleApprove = (id) => {
    const appointmentToAccept = newAppointments.find((app) => app.id === id);
    if (appointmentToAccept) {
      const updatedAppointment = { ...appointmentToAccept, isNew: false };
      setNewAppointments((prev) => prev.filter((app) => app.id !== id));
      const allAppointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );
      const updatedAppointments = allAppointments.map((app) =>
        app.id === id ? { ...app, isNew: false } : app
      );
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    }
  };

  const handleCancel = (id) => {
    setNewAppointments((prev) => prev.filter((app) => app.id !== id));
    const allAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const updatedAppointments = allAppointments.filter((app) => app.id !== id);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const getNavLinkClass = ({ isActive }) =>
    `${
      isActive
        ? "bg-gray-100 sm:ml-2 p-2 border-x-2 border-t-2  border-gray-400 rounded"
        : "bg-white sm:ml-2  p-2 border-x-2 border-t-2  border-gray-300 rounded "
    } hover:text-tab-text`;
  console.log("NEW APPT", newAppointments);
  return (
    <div className="min-h-screen bg-white">
      <div className="">
        <h2 className="text-lg font-bold my-4 sm:ml-2  text-center sm:text-start underline">
          New Appointment Requests
        </h2>
        <div className="flex flex-wrap mb-12 h-[200px] justify-center items-center">
          {/* New appointments */}
          {newAppointments.length === 0 ? (
            <p className="text-gray-500 text-center">No new appointments.</p>
          ) : (
            newAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-start gap-4 bg-white  p-2 min-w-[250px]"
              >
                <div className="flex flex-col items-center ">
                  <div className="flex items-center justify-center  bg-gray-100 rounded-full h-[55px] w-[55px] mb-3">
                    <img
                      src={calendar}
                      alt="Calendar"
                      className="h-[40px] w-[40px]"
                    />
                  </div>
                  <h3 className="text-gray-700 text-lg font-bold ">
                    {appointment.name}
                  </h3>
                  <p className="text-gray-500 text-sm  text-center">
                    {appointment.date}
                  </p>
                  <p className="text-gray-500 text-sm mb-2  text-center">
                    {appointment.time}
                  </p>
                  <p className="font-medium text-md text-center">
                    {appointment.address}
                  </p>
                  <div className="flex gap-4 items-center mt-2">
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                      onClick={() => handleApprove(appointment.id)}
                    >
                      ✓
                    </button>
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-center gap-2 sm:justify-start mb-2 border-b-2 border-gray-300">
          <NavLink className={getNavLinkClass} to={`appointments`}>
            Appointments
          </NavLink>
          <NavLink className={getNavLinkClass} to={`planning`}>
            Planning
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
