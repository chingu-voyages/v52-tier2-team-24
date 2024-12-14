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
      setIsLoginOpen(true);
    }
  };

  function handleClose() {
    setIsLoginOpen(!isLoginOpen);
  }

  return (
    <nav
      id="navbar"
      className="flex flex-col gap-2 items-center md:flex-row md:justify-between px-10 py-3 "
    >
      <div className="flex gap-2  items-center  min-w-44">
        <img src={logo} className="size-7 " />
        <p className="text-2xl text-center">Solar Rise</p>
      </div>
      <Button
        text={isAdminRoute ? "Log Out" : "Sign In"}
        isTransparent={!isAdminRoute}
        onClick={handleClick}
      />
      {isLoginOpen && (
        <LoginModal isLoginOpen={isLoginOpen} handleClose={handleClose} />
      )}
    </nav>
  );
};
