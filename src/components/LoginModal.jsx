import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginModal({ isLoginOpen, handleClose }) {
  const loginEmail = import.meta.env.VITE_MOCK_EMAIL;
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  // TO DO *********
  //   feedback incorrect?  inform about styling at top center

  useEffect(() => {
    if (isLandingPage) {
      setIsOpen(isLoginOpen);
    }
  }, [isLoginOpen]);

  const [isInvalid, setIsInvalid] = useState(false);
  const inputBorder = isInvalid
    ? "border border-red-600 p-1 pl-2 rounded-lg"
    : "border p-1 pl-2 rounded-lg";

  function verifyEmail() {
    if (email === loginEmail) {
      navigate("/admin");
      setIsOpen(false);
      setIsInvalid(false);
      setEmail("");
    } else {
      setIsInvalid(true);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={() => ""} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-start justify-center p-4">
          <DialogPanel className="justify-items-center space-y-6 border-2 rounded-md border-black bg-white pb-8 pt-4 px-12">
            <div className="flex justify-self-end mb-8">
              <button
                className="text-xl"
                onClick={() => {
                  handleClose();
                  setEmail("");
                  setIsInvalid(false);
                }}
              >
                X
              </button>
            </div>

            <DialogTitle className="text-xl font-bold mb-8">
              Welcome, Solar App Employees!
            </DialogTitle>
            <Description>
              Please enter your approved email to access the Admin page.
            </Description>


            <div className="flex flex-col w-5/6">
              {isInvalid && (
                <p className="self-center text-red-600">
                  The email you have entered is invalid.
                </p>
              )}
              <input
                className={inputBorder}
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className="flex justify-center mt-4">
                <button
                  className="w-3/4 mt-1 py-4 bg-green-600 rounded-lg text-slate-50"
                  onClick={() => verifyEmail()}
                >
                  Login
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
