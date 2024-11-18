import { useForm } from "react-hook-form";
import { GiSolarPower } from "react-icons/gi";
// import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function TestValidate() {
  let userSchema = yup
    .object({
      firstName: yup.string().required("First Name Required"),
      lastName: yup.string().required("Last Name Required"),
      email: yup
        .string()
        .email("Invalid Email Format")
        .required("Email Required"),
      address: yup
        .string()
        .min(5, "Address must be at least 10 characters long")
        .required("Address Required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleFormSubmit = (data) => {
    console.log(data);
    localStorage.setItem("userInput", JSON.stringify(data));
  };

  return (
    <div className="w-full  flex flex-col gap-4 items-start justify-between   pt-8">
      <header className="h-[20vh] flex items-center gap-5 ">
        <GiSolarPower className="w-28 h-28" />
        <div>
          <h1 className="text-2xl mb-4 font-extrabold">
            Schedule an Appointment
          </h1>
          <p>Please fill out the form to request and appointment</p>
        </div>
      </header>

      <div className="w-full  py-10  items-center flex flex-col justify-center">
        <form
          onSubmit={handleSubmit((data) => {
            handleFormSubmit(data);
          })}
          className=" sm:ml-5 sm:items-start flex text-lg  flex-col w-11/12 mx-auto"
        >
          <div className="sm:flex-row gap-2  flex-grow w-full flex flex-col   ">
            <div className="sm:w-1/2 ">
              <p className="ml-2 font-bold mb-2">First Name *</p>
              <input
                className={`w-full pl-2 border mb-4  py-2 rounded-lg   ${
                  errors.firstName
                    ? "border-red-500 placeholder-red-500"
                    : "border-slate-300"
                }`}
                type="text"
                {...register("firstName")}
                placeholder={errors.firstName?.message || "Enter Your Name"}
              />
            </div>
            <div className="sm:w-1/2 ">
              <p className="ml-2 font-bold mb-2">Last Name *</p>
              <input
                className={`w-full  border mb-4   rounded-lg pl-2 py-2  ${
                  errors.lastName
                    ? "border-red-500 placeholder-red-500"
                    : "border-slate-300"
                }`}
                type="text"
                {...register("lastName")}
                placeholder={errors.lastName?.message || "Enter Your Last Name"}
              />
            </div>
          </div>

          <div className="sm:flex-row gap-2 flex-grow w-full flex flex-col  ">
            <div className="sm:w-1/2 ">
              <p className="ml-2 font-bold mb-2">Email *</p>
              <input
                className={`w-full  pl-2 py-2 mb-4    border rounded-lg  ${
                  errors.email
                    ? "border-red-500 placeholder-red-500"
                    : "border-slate-300"
                }`}
                type="text"
                {...register("email")}
                placeholder={errors.email?.message || "Enter Your  Email"}
              />
            </div>
            <div className="sm:w-1/2 ">
              <p className="ml-2 font-bold mb-2">Address</p>
              <input
                className={`w-full  pl-2 py-2 border mb-4   rounded-lg  ${
                  errors.address
                    ? "border-red-500 placeholder-red-500"
                    : "border-slate-300 "
                }`}
                type="text"
                {...register("address")}
                placeholder={errors.address?.message || "Enter Your Address"}
              />
            </div>
          </div>

          <p className="ml-2 font-bold mb-2">Preferred Timeslot</p>
          <div className="sm:flex-row sm:w-1/2 flex flex-col w-full gap-2  ">
            <select
              className="sm:w-1/2 py-3 rounded-lg bg-slate-300 border border-slate-400"
              name=""
              id="0"
            ></select>
            <select
              className="sm:w-1/2 py-3 rounded-lg bg-slate-300 border border-slate-400"
              name=""
              id=""
            ></select>
          </div>
          <div className="sm:flex-row sm:w-1/2 sm:mx-auto sm:mt-10  flex flex-col gap-2  mt-5">
            <button
              type="submit"
              className=" w-full font-bold  bg-green-600 rounded-lg text-slate-50 text-xl  py-4 "
            >
              Submit{" "}
            </button>
            <button
            type="button"
              onClick={() => reset()}
              className=" border-2 border-slate-600  w-full  rounded-lg  text-xl font-bold  py-4 "
            >
              Cancel{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
