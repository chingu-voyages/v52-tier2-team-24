import { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import calendar from "../images/calendar.png";

const AdminPage = () => {
  const navigate = useNavigate();
  const [newAppointments, setNewAppointments] = useState([]);

  useEffect(() => {
    const existingAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const newUserInput = localStorage.getItem("userInput");
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
        ? "bg-gray-100 p-2 mr-2 border-2  border-gray-500 rounded"
        : "bg-white mr-2 p-2"
    } hover:text-tab-text`;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b-2 border-gray-600">
        <h2 className="text-lg font-bold my-4  text-center sm:text-start underline">
          New Appointment Requests
        </h2>
        <div className="flex flex-wrap mb-12 h-[200px] justify-center items-center">
          {/* New appointments */}
          {newAppointments.length === 0 ? (
            <p className="text-gray-500 ">No new appointments.</p>
          ) : (
            newAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-start gap-4 bg-white  p-2 min-w-[250px]"
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center  bg-gray-100 rounded-full h-[55px] w-[55px] mb-3">
                    <img
                      src={calendar}
                      alt="Calendar"
                      className="h-[40px] w-[40px]"
                    />
                  </div>
                  <h3 className="text-gray-700 text-lg mb-1">
                    {appointment.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2  text-center">
                    {appointment.date}
                  </p>
                  <p className="text-gray-500 text-sm mb-2  text-center">
                    {appointment.time}
                  </p>
                  <p className="font-medium text-lg text-center">
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
      <div className="border-t border-2 border-green-300 l">
        <div className="flex mb-8">
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
