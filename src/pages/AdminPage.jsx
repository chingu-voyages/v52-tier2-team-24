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
    // Retrieve requests from `userInput` in localStorage
    const storedRequests = JSON.parse(localStorage.getItem("userInput") || "[]");

    // Ensure `isVisited` is added to all requests
    const requestsWithVisited = storedRequests.map((req) => ({
      ...req,
      isVisited: req.isVisited || false,
    }));
    setRequests(requestsWithVisited);

    // Retrieve existing approved appointments
    const storedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    setAppointments(storedAppointments);
  }, []);


  const handleLogout = () => {
    //logout logic
    navigate("/");
  };

  // APPPROVE
  const handleApprove = (id) => {
    const requestToApprove = requests.find((req) => req.id === id);

    if (requestToApprove) {
      // Move the request to approved appointments
      const updatedAppointments = [...appointments, requestToApprove];
      setAppointments(updatedAppointments);
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

      // Remove the request from `requests`
      const updatedRequests = requests.filter((req) => req.id !== id);
      setRequests(updatedRequests);
      localStorage.setItem("userInput", JSON.stringify(updatedRequests));
    }
  };

// CANCEL
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

  return (
    <div className="min-h-screen bg-white">
      {/* NEW APPOINTMENTS SECTION */}
      <div className="">
      <h2 className="text-lg font-bold my-4 sm:ml-2 text-center sm:text-start underline">
        New Appointment Requests
      </h2>
      <div className="flex flex-wrap mb-12 h-[200px] justify-center items-center">
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center">No new appointment requests.</p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex items-start gap-4 bg-white p-2 min-w-[250px]"
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
                  {request.firstName}
                </h3>
                <h3 className="text-gray-700 text-lg font-bold ">
                  {request.lastName}
                </h3>
                <p className="text-gray-500 text-sm text-center">
                  {request.date}
                </p>
                <p className="text-gray-500 text-sm mb-2 text-center">
                  {request.time}
                </p>
                <p className="font-medium text-md text-center">
                  {request.address}
                </p>
                  <div className="flex gap-4 items-center mt-2">
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                      onClick={() => handleApprove(request.id)}
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
