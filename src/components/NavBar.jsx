import { Button } from "./Button";
import logo from "../images/sun.png";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname === "/admin";


  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleClick = () => {
    if (isAdminRoute) {
      navigate("/");
    } else {
      navigate("/admin");
      setIsLoginOpen(!isLoginOpen);
    }
  };

  function handleClose() {
    setIsLoginOpen(!isLoginOpen);
  }

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
      <LoginModal isLoginOpen={isLoginOpen} handleClose={handleClose} />
    </div>
  );
};
