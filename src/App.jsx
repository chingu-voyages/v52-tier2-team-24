import "./App.css";

import LandingPage from "./components/LandingPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminPage from "./pages/AdminPage";
import RootLayout from "./pages/Root";
// import ErrorPage from "./pages/Error";
import Appointments from "./pages/Appointments";
import Planning from "./pages/Planning";
import PDFAppointments from "./components/PDF/PDFAppointments";
import AuthRequired from "./components/AuthRequired";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      element: <AuthRequired />,
      children: [
        {
          path: "/admin",
          element: <AdminPage />,
          children: [
            {
              index: true,
              element: <Navigate to="appointments" replace />,
            },
            {
              path: "appointments",
              element: <Appointments />,
            },
            {
              path: "planning",
              element: <Planning />,
            },
          ],
        },
        {
          path: "/appointmentPDF",
          element: <PDFAppointments />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
