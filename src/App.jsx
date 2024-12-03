import "./App.css";

import {LandingPage} from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';

import AdminPage from "./pages/AdminPage";
import RootLayout from "./pages/Root";
// import ErrorPage from "./pages/Error";
import Appointments from "./pages/Appointments";
import Planning from "./pages/Planning";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/admin",
      element: <RootLayout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <AdminPage />,
          children: [
            {
              index: true,
              element: <Navigate to="appointments" replace />,
            },
            {
              path: "appointments",
              element: <Appointments />
            },
            {
              path: "planning",
              element: <Planning />
            }
          ]
        }
      ]
    }
  ]);
  return (

  <RouterProvider router={router} />

  );
}

export default App;
