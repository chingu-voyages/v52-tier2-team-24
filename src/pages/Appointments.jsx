import { useState, useEffect } from "react";
import sun from "../images/weather.png";
import { formatAddress } from "../helpers/formatAddress";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import fileIcon from "../images/file-icon.jpg"; 

const Appointments = () => {
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [receipt, setReceipt] = useState(null); // store the file in state
  const [filePreview, setFilePreview] = useState(null); // store file preview
  const [fileURL, setFileURL] = useState(null); // store the file URL after upload
  const [isModalOpen, setIsModalOpen] = useState(false); // control modal visibility
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    const existingAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const acceptedApps = existingAppointments.filter((app) => !app.isNew);
    setAcceptedAppointments(acceptedApps);
  }, []);

  const toggleVisitStatus = (id) => {
    setAcceptedAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, isVisited: !appointment.isVisited }
          : appointment
      )
    );

    const allAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const updatedAppointments = allAppointments.map((app) =>
      app.id === id ? { ...app, isVisited: !app.isVisited } : app
    );
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const handleFileChange = async (event, appointmentId) => {
    const file = event.target.files[0];
    if (file) {
      setReceipt(file); 

      const fileType = file.type.split("/")[0]; 
      setFileType(fileType); 

      // File preview for image files
      if (fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result); 
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }

      const storageRef = ref(storage, `receipts/${appointmentId}/${file.name}`);

      try {
  
        await uploadBytes(storageRef, file);
        const fileDownloadURL = await getDownloadURL(storageRef); 
        console.log(`Receipt uploaded for appointment ${appointmentId}:`, fileDownloadURL);

        const updatedAppointments = acceptedAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, receiptUrl: fileDownloadURL }
            : appointment
        );
        setAcceptedAppointments(updatedAppointments);
        localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
        setFileURL(fileDownloadURL); 
      } catch (error) {
        console.error("Error uploading file to Firebase Storage:", error);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true); //open modal to show the file
  };

  const closeModal = () => {
    setIsModalOpen(false); // close the modal
  };

  

  return (
    <div className="space-y-2 ">
      {acceptedAppointments.length === 0 ? (
        <p className="text-gray-500 text-center justify-center">
          No appointments.
        </p>
      ) : (
        acceptedAppointments.map((appointment) => (
          // ENTIRE ROW
          <div
            key={appointment.id}
            className="flex flex-col  border-y-2 border-gray-300 bg-gray-100  md:flex-row md:items-center md:justify-between relative"
          >
            {/* NAME AND LOGO */}
            <div className="flex md:w-1/3">
              <div className="flex items-center gap-1">
                <img src={sun} className="h-[30px] " />
                <p className="font-bold">{appointment.name}</p>
              </div>
            </div>

            {/* DATE TIME ADDRESS */}
            <div className="ml-2 md:flex md:justify-start md:items-center md:gap-6">
              <p className="text-gray-500 text-sm">
                {appointment.time} | {appointment.date}
              </p>
              <p className="text-md  mr-1">
                {formatAddress(appointment.address)}
              </p>
            </div>

            {/* Toggle */}
            <div className="sm:flex sm:flex-col sm:items-end sm:static absolute right-2 m-2 ">
              <button
                className="w-12 h-7 border-2 border-gray-400 rounded-full relative bg-white  transition-colors "
                onClick={() => toggleVisitStatus(appointment.id)}
              >
                <div
                  className={`absolute w-5 h-5 rounded-full top-0.5 left-0.3 transition-transform ${
                    appointment.isVisited
                      ? "transform translate-x-6 bg-green-500"
                      : "bg-red-500"
                  }`}
                />
              </button>{" "}
            </div>


    
         {/* File Upload Button */}
         <div className="sm:flex sm:flex-col sm:items-end sm:static absolute right-20 m-2">
              <input
                type="file"
                accept="image*, pdf"
                className="border-2 border-gray-400 rounded-md px-2 py-1 cursor-pointer"
                onChange={(e) => handleFileChange(e, appointment.id)}
              />
            </div>

            {/* Display file preview */}
            {filePreview && fileType === "image" && (
              <div className="mt-2 sm:mt-0 sm:ml-4">
                <img
                  src={fileIcon}
                  alt="File preview"
                  className="w-16 h-16 object-cover rounded-md cursor-pointer"
                  onClick={openModal} 
                />
              </div>
            )}

            {/* Display file icon or download link for non-image files */}
            {fileType !== "image" && fileURL && (
              <div className="mt-2 sm:mt-0 sm:ml-4">
                <button
                  onClick={openModal}
                  className="text-sm text-blue-500 underline"
                >
                  View/Download file
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {/* Modal to show full-size file */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
            <button onClick={closeModal} className="text-xl font-bold absolute top-2 right-2">
              &times;
            </button>
            {fileType === "image" ? (
              <img src={fileURL} alt="Full size file" className="w-full h-auto" />
            ) : (
              <div>
                {/* Displaying non-image files */}
                <p className="text-center">This is a {fileType} file.</p>
                <a href={fileURL} target="_blank" rel="noopener noreferrer" className="block text-center text-blue-500">
                  Download/View file
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;