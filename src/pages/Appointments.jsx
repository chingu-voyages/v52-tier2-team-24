import { useState, useEffect } from "react";
import sun from "../images/weather.png"

const Appointments = () => {
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  useEffect(() => {
    const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const acceptedApps = existingAppointments.filter(app => !app.isNew);
    setAcceptedAppointments(acceptedApps);
  }, []);

  const toggleVisitStatus = (id) => {
    setAcceptedAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, isVisited: !appointment.isVisited } 
          : appointment
      )
    );
    
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const updatedAppointments = allAppointments.map(app => 
      app.id === id ? { ...app, isVisited: !app.isVisited } : app
    );
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };
  console.log("Address", acceptedAppointments )

  return (
    <div className="space-y-6">
      {acceptedAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments.</p>
      ) : (
        acceptedAppointments.map((appointment) => (
          // ENTIRE ROW
          <div key={appointment.id} className="flex bg-gray-200">
            {/* NAME AND LOGO */}
            <div className="flex bg-green-300 items-center gap-4">
              <img src={sun} className="h-[30px]" />
              <div>
                <p className="font-medium">{appointment.name}</p>
                {/* <p className="text-gray-500">{appointment.address}</p> */}
              </div>
            </div>
            <div className="flex">
              <p className="text-gray-500 mr-3">{appointment.time}</p>
              {/* <button
                className="w-12 h-6 rounded-full relative bg-gray-200 transition-colors"
                onClick={() => toggleVisitStatus(appointment.id)}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full top-0.5 left-0.5 transition-transform ${
                    appointment.isVisited ? 'transform translate-x-6 bg-green-500' : 'bg-red-500'
                  }`}
                />
              </button> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;