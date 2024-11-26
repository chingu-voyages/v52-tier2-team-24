// pages/AdminPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");
  const [newAppointments, setNewAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

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
        time: data.dateTime,
        address: data.address,
        isVisited: false
      };

      setNewAppointments ([newAppointment, ...existingAppointments]);
    //   localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    //   setAppointments(updatedAppointments);
      localStorage.removeItem("userInput");
    } else {
      setNewAppointments(existingAppointments);
    }
  }, []);

  const handleLogout = () => {
    //logout logic
    navigate("/");
  };

  const handleApprove = (id) => {
    const appointmentToAccept = newAppointments.find(app => app.id === id);
    if (appointmentToAccept) {
      setAcceptedAppointments(prev => [...prev, appointmentToAccept]);
      setNewAppointments(prev => prev.filter(app => app.id !== id));
      const updatedAppointments = [...acceptedAppointments, appointmentToAccept];
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    }
  };

  const handleCancel = (id) => {
    setNewAppointments(prev => prev.filter(app => app.id !== id));
    const updatedAppointments = newAppointments.filter(app => app.id !== id ? { ...appointment, isVisited: !appointment.isVisited }
        : appointment);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };
  const toggleVisitStatus = (id) => {
    setAcceptedAppointments(
      acceptedAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, isVisited: !appointment.isVisited }
          : appointment
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <div className="p-8">
        <h2 className="text-xl font-medium mb-8">New Appointment Requests</h2>
        <div className="flex flex-wrap mb-12">
          {/* New appointments */}
          {newAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start gap-4 bg-white p-2 min-w-[250px]"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center bg-gray-100 rounded-full h-[55px] w-[55px] mb-3">
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
                <div className="flex gap-4 mt-4">
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

          <div className="space-y-6">
            {/* Current Appointments */}

            {acceptedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img src="src\images\weather.png" className="h-[30px]" />
                  <div>
                    <p className="font-medium">{appointment.name}</p>
                    <p className="text-gray-500">{appointment.address}</p>
                  </div>
                </div>
                <div className="text-gray-500">{appointment.time}</div>
                <button
                 className="w-12 h-6 rounded-full relative bg-gray-200 transition-colors"
                  onClick={() => toggleVisitStatus(appointment.id)}>
                    <div 
        className={`absolute w-5 h-5 rounded-full top-0.5 left-0.5 transition-transform ${
          appointment.isVisited ? 'transform translate-x-6 bg-green-500' : 'bg-red-500'
        }`}
      />
      {/* {appointment.isVisited ? 'Visited' : 'Not Visited'} */}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
