import { useState } from "react";
// import sun from "../images/weather.png";
import AppointmentsList from "../helper functions/AppointmentsList";
import { GoogleMap } from "../components/GoogleMap";
import PDFButton from "../components/PDF/PDFButton";


export default function Planning() {
  const [timePeriod, setTimePeriod] = useState("daily");
  const [outputType, setOutputType] = useState("list");
  const [newOutputType, setNewOutputType] = useState("list");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [hasInitialFetch, setHasInitialFetch] = useState(false);



  const handleExportPDF = () => {

    window.open("/appointmentPDF", "_blank");
  };

  const handleRetrievePlanning = () => {
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const acceptedAppointments = appointments.filter((app) => !app.isNew);
    const today = new Date();

    let filtered = [];
    switch (timePeriod) {
      case "daily":
        filtered = acceptedAppointments.filter((app) => {
          const appDate = new Date(app.time);
          return appDate.toDateString() === today.toDateString();
        });
        break;
      case "weekly":
        const weekStart = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        const weekEnd = new Date(today.setDate(today.getDate() + 6));
        filtered = acceptedAppointments.filter((app) => {
          const appDate = new Date(app.time);
          return appDate >= weekStart && appDate <= weekEnd;
        });
        break;
      case "monthly":
        filtered = acceptedAppointments.filter((app) => {
          const appDate = new Date(app.time);
          return (
            appDate.getMonth() === today.getMonth() &&
            appDate.getFullYear() === today.getFullYear()
          );
        });
        break;
      default:
        break;
    }

    setFilteredAppointments(filtered);
    setHasInitialFetch(true);
    setOutputType(newOutputType);
  };

  const renderContent = () => {
    if (!hasInitialFetch) {
      return null;
    }

    switch (outputType) {
      case "list":
        return (
          <div className="space-y-4">
            <AppointmentsList appointments={filteredAppointments} />
          </div>
        );
      case "map":
        return (
          <div className="bg-gray-50 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
            <GoogleMap />
          </div>
        );
      case "both":
        return (
          <div>
            <div className="bg-gray-50 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              <GoogleMap />
            </div>
            <div className="space-y-4">
              <AppointmentsList appointments={filteredAppointments} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-700 mb-2">Select Time Period</h3>
          <div className="flex gap-2">
            {["daily", "weekly", "monthly"].map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded ${
                  timePeriod === period ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => setTimePeriod(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-gray-700 mb-2">Output Type</h3>
          <div className="flex gap-2">
            {["list", "map", "both"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded ${
                  newOutputType === type ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => setNewOutputType(type)}
              >
                {type === "both"
                  ? "Both"
                  : `${type.charAt(0).toUpperCase() + type.slice(1)} View`}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleRetrievePlanning}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Retrieve Planning
          </button>
          <PDFButton handleExportPDF={handleExportPDF}  />
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
