import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export default function LoginModal() {
  // TO DO:
  // need to link this component to button on component/page that will open the modal
  // linked button should function to set the open state to true
  // remove the open button modal (added below only for testing functionality)
  // change the initial isOpen state to false

  const [isOpen, setIsOpen] = useState(true);

  const [email, setEmail] = useState("");

  function handleSubmit() {
    console.log(email);
    setEmail("");
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
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">
              Welcome, Solar App Employees!
            </DialogTitle>
            <Description>
              Please enter your approved email to access the Admin page.
            </Description>

            <div className="flex flex-col">
              <input
                className="border"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />

              <button className="" onClick={() => handleSubmit()}>
                Login
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
