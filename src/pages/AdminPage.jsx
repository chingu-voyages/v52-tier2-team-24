// pages/AdminPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const userInput = localStorage.getItem("userInput");
    if (userInput) {
      const data = JSON.parse(userInput);
      const appointment = {
        id: Date.now(),
        name: `${data.firstName} ${data.lastName}`,
        time: data.dateTime,
        address: data.address,
      };
      setAppointments([appointment]);
    }
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <div className="p-8">
        <h2 className="text-xl font-medium mb-8">New Appointment Requests</h2>
        <div className="flex gap-6 mb-12">
          {/* New appointments */}
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start gap-4 bg-white p-6 min-w-[300px]"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center bg-gray-100 rounded-full h-[50px] w-[50px] mb-3">
                  <img
                    src="src\images\calendar-image-png-3.png"
                    alt="Calendar"
                    className="h-[40px] w-[40px]"
                  />
                </div>
                <h3 className="text-gray-700 text-lg mb-1">
                  {appointment.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{appointment.time}</p>
                <p className="font-medium text-lg">{appointment.address}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t">
          <div className="flex mb-8">
            <button
              className={`${
                activeTab === "appointments"
                  ? "bg-gray-100 p-2 mr-2 rounded"
                  : "bg-white mr-2 p-2"
              }`}
              onClick={() => setActiveTab("appointments")}
            >
              Appointments
            </button>
            <button
              className={`${
                activeTab === "planning"
                  ? "bg-gray-100 p-2 rounded"
                  : "bg-white p-2"
              }`}
              onClick={() => setActiveTab("planning")}
            >
              Planning
            </button>
          </div>

          <div className="space-y-6">{/* Current Appointments */}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
