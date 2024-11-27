import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  // TO DO:
  // need to link this component to button on component/page that will open the modal
  // linked button should function to set the open state to true
  // remove the open button modal (added below only for testing functionality)
  // change the initial isOpen state to false

  // add path to app for testing

  // add close button

  const loginEmail = import.meta.env.VITE_MOCK_EMAIL;

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const [email, setEmail] = useState("");

  function handleSubmit() {
    console.log(email);
    verifyEmail();
    setEmail("");
  }

  function verifyEmail() {
    if (email === loginEmail) {
      // redirect to admin page
      navigate("/admin");
    } else {
      console.log("incorrect");
      // add user feedback/alert if incorrect
    }
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="justify-items-center space-y-6 border bg-white pb-8 pt-16 px-12">
            <DialogTitle className="text-xl font-bold mb-8">
              Welcome, Solar App Employees!
            </DialogTitle>
            <Description>
              Please enter your approved email to access the Admin page.
            </Description>

            <div className="flex flex-col w-5/6">
              <input
                className="border p-1 rounded-lg pl-2 mb-4"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />

              <div className="flex justify-center">
                <button
                  // className='border w-3/4'
                  className="w-3/4 mt-1 py-4  bg-green-600 rounded-lg text-slate-50"
                  // text-xl py-4'
                  onClick={() => handleSubmit()}
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
