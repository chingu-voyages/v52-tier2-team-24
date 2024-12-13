import { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";


import AppointmentCarousel from "./AppointmentCarousel";

import { NavBar } from "../components/NavBar";


const AdminPage = () => {
  const isAdminRoute = true;
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
    sessionStorage.removeItem("loggedin");
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


      <nav
        id="navbar"
        className="flex flex-col gap-2 items-center md:flex-row md:justify-between px-10 py-3 "
      >
        <div className="flex gap-2  items-center  min-w-44">
          <img src={logo} className="size-7 " />
          <p className="text-2xl text-center">Solar Panel App</p>
        </div>

        <button
          className={`text-black border solid border-slate-500   hover:bg-slate-600 hover:text-white  rounded-3xl text-sm inline-flex items-center justify-center whitespace-nowrap px-6 py-3`}
          onClick={() => handleLogout()}
        >
          Log Out
        </button>
      </nav>

   
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
      <Footer />
    </div>
  );
};

export default AdminPage;
