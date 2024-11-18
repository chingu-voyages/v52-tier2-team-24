import { useForm } from "react-hook-form";
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-scree flex flex-col gap-4 items-center justify-between  bg-slate-50 pt-8">
      <header className="text-center">
        <h1 className="~text-3xl/6xl text-green-800 mb-4 font-extrabold">
          Schedule an Appointment
        </h1>
        <p>Please fill out the form to request and appointment</p>
      </header>

      <div className="border-2 w-full sm:pb-2 py-2  items-center flex flex-col gap-10 justify-center border-slate-300 rounded-md bg-green-100">

        <form
          onSubmit={handleSubmit((data) => {
            handleFormSubmit(data);
          })}
          className=" sm:ml-5 sm:items-start flex text-lg flex-col space-y-10  w-11/12 mx-auto"
        >
          <div className="md:flex-row md:w-1/2 flex-grow w-full flex flex-col gap-10 ">
            <input
              className={` pl-2 py-3 border rounded-lg  ${
                errors.firstName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("firstName")}
              placeholder={errors.firstName?.message || "First Name"}
            />

            <input
              className={`border rounded-lg  pl-2 py-3  ${
                errors.lastName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("lastName")}
              placeholder={errors.lastName?.message || "Last Name"}
            />
          </div>
          <div className="md:flex-row md:w-1/2 flex-grow w-full flex flex-col gap-10 ">
            <input
              className={` pl-2 py-3 border rounded-lg  ${
                errors.email
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("email")}
              placeholder={errors.email?.message || "Email"}
            />

            <input
              className={` pl-2 py-3 border rounded-lg  ${
                errors.address
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300 "
              }`}
              type="text"
              {...register("address")}
              placeholder={errors.address?.message || "Address"}
            />
          </div>

          <div>
            <p>Preferred Timeslot</p>
          </div>
          <button
            type="submit"
            className="sm:ml-auto sm:w-1/2  sm:py-2 w-full  bg-slate-800 rounded-lg text-slate-50 text-xl uppercase py-7 "
          >
            Submit{" "}
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
