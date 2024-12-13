import { useState, useRef } from "react";
// import sun from "../images/weather.png";
import PlanningAppointmentsList from "../helper functions/PlanningAppointmentsList";
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

  const aptRef = useRef();

  function scrollToSection() {
    aptRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleRetrievePlanning = () => {
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    console.log("APPOINTMENTS", appointments);
    // REF: Right now appointments that are checked isVisited = false (red toggle) will be filtered and then separated into daily weekly or monthly tabs
    const acceptedAppointments = appointments.filter((app) => !app.isVisited);
    console.log("Accepted Appointments", acceptedAppointments);
    const today = new Date();

    let filtered = [];
    switch (timePeriod) {
      case "daily": {
        const normalizeDate = (date) =>
          new Date(date.getFullYear(), date.getMonth(), date.getDate());

        filtered = acceptedAppointments.filter((app) => {
          const appDate = normalizeDate(new Date(`${app.date}T00:00:00`));
          const todayNormalized = normalizeDate(today);
          return appDate.getTime() === todayNormalized.getTime();
        });

        break;
      }
      case "weekly": {
        const weekStart = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        const weekEnd = new Date(today.setDate(today.getDate() + 6));
        filtered = acceptedAppointments.filter((app) => {
          const appDate = new Date(app.date);
          return appDate >= weekStart && appDate <= weekEnd;
        });
        break;
      }
      case "monthly": {
        filtered = acceptedAppointments.filter((app) => {
          const appDate = new Date(app.date);
          return (
            appDate.getMonth() === today.getMonth() &&
            appDate.getFullYear() === today.getFullYear()
          );
        });
        break;
      }
      default:
        break;
    }

    setFilteredAppointments(filtered);
    console.log("Filtered Appointments--->", filteredAppointments);
    setHasInitialFetch(true);
    setOutputType(newOutputType);
    scrollToSection();
  };

  const renderContent = () => {
    if (!hasInitialFetch) {
      return null;
    }

    switch (outputType) {
      case "list":
        return (
          <div ref={aptRef} className="space-y-4">
            <PlanningAppointmentsList appointments={filteredAppointments} />
          </div>
        );
      case "map":
        return (
          <div
            ref={aptRef}
            className=" rounded-lg p-8 min-h-[400px] flex items-center justify-center"
          >
            <GoogleMap appointments={filteredAppointments} />
          </div>
        );
      case "both":
        return (
          <div>
            <div
              ref={aptRef}
              className=" rounded-lg p-8 min-h-[400px] flex items-center justify-center"
            >
              <GoogleMap appointments={filteredAppointments} />
            </div>
            <div className="space-y-4">
              <PlanningAppointmentsList appointments={filteredAppointments} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 ">
      {/* OUTPUT TIME AND BUTTONS CONTAINER */}
      <div className="flex flex-col  items-center    md:gap-4 md:justify-center ">
        {/* Time and Output */}
        <div className="flex flex-col md:flex-row items-center gap-3 my-2">
          {/* TIME PERIOD */}
          <div className="p-2 rounded-lg w-1/2 flex flex-col items-center">
            <h3 className="text-gray-700 mb-2 underline font-bold">
              Time Period
            </h3>
            <div className="flex justify-center gap-2">
              {["daily", "weekly", "monthly"].map((period) => (
                <button
                  key={period}
                  className={`btn btn-sm ${
                    timePeriod === period
                       ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setTimePeriod(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {/* OUTPUT TYPE */}
          <div className=" p-2 rounded-lg w-1/2">
            <h3 className="text-gray-700 mb-2 text-center underline font-bold">
              Output Type
            </h3>
            <div className="flex justify-center gap-2">
              {["list", "map", "both"].map((type) => (
                <button
                  key={type}
                  className={`btn btn-sm ${
                    newOutputType === type
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setNewOutputType(type)}
                >
                  {type === "both"
                    ? "Both"
                    : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 mb-2">
          <button
            onClick={handleRetrievePlanning}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Retrieve Planning
          </button>
          <PDFButton handleExportPDF={handleExportPDF} />
        </div>
      </div>

      {renderContent()}
      <div ref={aptRef}></div>
    </div>
  );
}
