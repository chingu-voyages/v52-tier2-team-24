import { useState } from "react";

export default function WebForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    setInputs("")
  };

  return (
    <div className="w-1/2 h-[90vh] flex flex-col gap-4 items-center justify-between  bg-slate-50 pt-8">
      <header className="text-center">
        <h1 className="text-8xl text-green-800 mb-4 font-extrabold">
          Solar Title
        </h1>
        <p>Basic info about the app in subtitle under web name</p>
      </header>

      <div className="border-2 w-cd  h-contain  items-center border-slate-300 rounded-md bg-green-100">
        <h1 className="text-center text-4xl my-10  text-green-800 font-bold underline">
          Request an Appointment
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-start ml-5"
        >
          <div className="flex gap-3">
            <input
              className="border border-slate-300 rounded-lg pl-2"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={inputs.firstName || ""}
              onChange={handleChange}
            />
            <input
              className=" border border-slate-300 rounded-lg pl-2"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={inputs.lastName || ""}
              onChange={handleChange}
            />
          </div>

          <input
            className=" border border-slate-300 rounded-lg pl-2 "
            type="text"
            name="email"
            placeholder="Email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
          {/* Will this be where auto-complete component or section will go? */}
          <input
            className=" border border-slate-300 rounded-lg pl-2"
            type="text"
            name="address"
            placeholder="Address"
            value={inputs.address || ""}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-slate-800 rounded-lg text-slate-50 text-md py-2 px-4 ml-auto m-4"
          >
            Select a time{" "}
          </button>
        </form>
      </div>
      <p className="mb-4 text-lg">
        City Hall Employee?{" "}
        <a className="underline text-blue-500" href="/">
          Sign In
        </a>
      </p>
    </div>
  );
}
