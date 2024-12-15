import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired() {
  const isLoggedIn = sessionStorage.getItem("loggedin");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
