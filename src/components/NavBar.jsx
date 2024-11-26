import { Button } from "./Button";
import logo from "../images/sun.png";
import { useLocation, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname === "/admin";

  const handleClick = () => {
    if (isAdminRoute) {
      navigate("/");
    } else {
      navigate("/admin");
    }
  };
  return (
    <div
      id="navbar"
      className="flex justify-between w-full h-18 px-10 md:px-20 lg:px-10 py-6"
    >
      <div className="flex items-center min-w-44">
        <img src={logo} className="size-7 mr-2" />
        <p className="text-2xl">Solar Panel App</p>
      </div>
      <Button
        text={isAdminRoute ? "Log Out" : "Sign In"}
        isTransparent={!isAdminRoute}
        onClick={handleClick}
      />
    </div>
  );
};
