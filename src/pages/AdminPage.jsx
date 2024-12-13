import { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";

import AppointmentCarousel from "./AppointmentCarousel";

const AdminPage = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(
      localStorage.getItem("userInput") || "[]"
    );

    const requestsWithVisited = storedRequests.map((req) => ({
      ...req,
      isVisited: req.isVisited || false,
    }));
    setRequests(requestsWithVisited);

    const storedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    setAppointments(storedAppointments);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  // APPPROVE
  const handleApprove = (id) => {
    const requestToApprove = requests.find((req) => req.id === id);

    if (requestToApprove) {
      const existingAppointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );

      const updatedAppointments = [...existingAppointments, requestToApprove];
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

      const updatedRequests = requests.filter((req) => req.id !== id);
      setRequests(updatedRequests);
      localStorage.setItem("userInput", JSON.stringify(updatedRequests));

      window.dispatchEvent(new Event("appointmentsUpdated"));
    }
  };

  // CANCEL
  const handleCancel = (id) => {
    const allRequests = JSON.parse(localStorage.getItem("userInput") || "[]");
    const updatedRequests = allRequests.filter((req) => req.id !== id);
    localStorage.setItem("userInput", JSON.stringify(updatedRequests));

    setRequests(updatedRequests);

    window.dispatchEvent(new Event("requestsUpdated"));
  };

  const getNavLinkClass = ({ isActive }) =>
    `${
      isActive
        ? "bg-gray-100 sm:ml-2 p-2 border-x-2 border-t-2  border-gray-400 rounded"
        : "bg-white sm:ml-2  p-2 border-x-2 border-t-2  border-gray-300 rounded "
    } hover:text-tab-text`;

  return (
    <div className="min-h-screen bg-white">
      <h2 className="text-lg font-bold my-4 sm:ml-2 text-center sm:text-start underline">
        New Appointment Requests
      </h2>
      {requests.length === 0 ? (
        <p className="text-red-500 text-center mb-5">No new appointments.</p>
      ) : (
        <AppointmentCarousel
          requests={requests}
          handleApprove={handleApprove}
          handleCancel={handleCancel}
        />
      )}

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
