import { useState } from 'react';
import sun from "../images/weather.png"

export default function Planning () {
  const [timePeriod, setTimePeriod] = useState('daily');
  const [outputType, setOutputType] = useState('list');
  const [filteredAppointments, setFilteredAppointments] = useState([]);


  const filterAppointmentsByPeriod = () => {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const acceptedAppointments = appointments.filter(app => !app.isNew);
    const today = new Date();
    
    switch(timePeriod) {
      case 'daily':
        return acceptedAppointments.filter(app => {
          const appDate = new Date(app.time);
          return appDate.toDateString() === today.toDateString();
        });
      
      case 'weekly':
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        const weekEnd = new Date(today.setDate(today.getDate() + 6));
        return acceptedAppointments.filter(app => {
          const appDate = new Date(app.time);
          return appDate >= weekStart && appDate <= weekEnd;
        });
      
      case 'monthly':
        return acceptedAppointments.filter(app => {
          const appDate = new Date(app.time);
          return appDate.getMonth() === today.getMonth() && 
                 appDate.getFullYear() === today.getFullYear();
        });
      
      default:
        return [];
    }
  };

  const handleRetrievePlanning = () => {
    const filtered = filterAppointmentsByPeriod();
    setFilteredAppointments(filtered);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-700 mb-2">Select Time Period</h3>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded ${
                timePeriod === 'daily' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setTimePeriod('daily')}
            >
              Daily
            </button>
            <button
              className={`px-4 py-2 rounded ${
                timePeriod === 'weekly' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setTimePeriod('weekly')}
            >
              Weekly
            </button>
            <button
              className={`px-4 py-2 rounded ${
                timePeriod === 'monthly' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setTimePeriod('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* <div>
          <h3 className="text-gray-700 mb-2">Output Type</h3>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded ${
                outputType === 'list' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setOutputType('list')}
            >
              List View
            </button>
            <button
              className={`px-4 py-2 rounded ${
                outputType === 'map' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setOutputType('map')}
            >
              Map View
            </button>
            <button
              className={`px-4 py-2 rounded ${
                outputType === 'both' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setOutputType('both')}
            >
              Both
            </button>
          </div>
        </div> */}
        
        <button
        onClick={handleRetrievePlanning}
         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Retrieve Planning
        </button>
      </div>
      <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <p className="text-center text-gray-500">No appointments found for selected period.</p>
            ) : (
              filteredAppointments.map(appointment => (
                <div key={appointment.id} className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-4">
                  <img src={sun} className="h-[30px]" />
                    <div>
                      <p className="font-medium">{appointment.name}</p>
                      <p className="text-gray-500">{appointment.address}</p>
                    </div>
                  </div>
                  <p className="text-gray-500">{appointment.time}</p>
                </div>
              ))
            )}
          </div>
    </div>
  );
};
