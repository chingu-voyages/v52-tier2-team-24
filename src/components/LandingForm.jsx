import { useForm } from "react-hook-form";
// import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function TestValidate() {
  let userSchema = yup
    .object({
      firstName: yup.string().required("First Name Required"),
      lastName: yup.string().required("Last Name Required"),
      email: yup.string().email().required("Email  Required"),
      address: yup.string().required("Address Required"),
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
    console.log(data)
  }

  return (
    <div className="sm:w-1/2 w-full h-[90vh] flex flex-col gap-4 items-center justify-between  bg-slate-50 pt-8">
      <header className="text-center">
        <h1 className="sm:text-8xl text-4xl text-green-800 mb-4 font-extrabold">
          Solar Title
        </h1>
        <p>Basic info about the app in subtitle under web name</p>
      </header>

      <div className="border-2 w-full  h-full  items-center border-slate-300 rounded-md bg-green-100">
        <h1 className="text-center sm:text-4xl text-lg my-10  text-green-800 font-bold underline">
          Request an Appointment
        </h1>
        <form
          onSubmit={handleSubmit((data) => {
           handleFormSubmit(data)
          })}
          className="flex flex-col gap-6 items-start ml-5"
        >
          <div className="flex gap-3">
            <input
              className={`border rounded-lg pl-2 ${
                errors.firstName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("firstName")}
              placeholder={errors.firstName?.message || "First Name"}
            />

            <input
              className={`border rounded-lg pl-2 ${
                errors.lastName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("lastName")}
              placeholder={errors.lastName?.message || "Last Name"}
            />
          </div>

          <input
            className={`border rounded-lg pl-2 ${
              errors.email
                ? "border-red-500 placeholder-red-500"
                : "border-slate-300"
            }`}
            type="text"
            {...register("email")}
            placeholder={errors.email?.message || "Email"}
          />
          {errors.email?.message && (
					<div className='alert alert-danger'>
						{errors.email?.message}
					</div>
				)}
          <input
            className={`border rounded-lg pl-2 ${
              errors.address
                ? "border-red-500 placeholder-red-500"
                : "border-slate-300"
            }`}
            type="text"
            {...register("address")}
            placeholder={errors.address?.message || "Address"}
          />
          <button
            type="submit"
            className="bg-slate-800 rounded-lg text-slate-50 text-md py-2 px-4 ml-auto m-4"
          >
            Select a time{" "}
          </button>
        </form>
      </div>
      {/* <p className="mb-4 text-lg">
        City Hall Employee?{" "}
        <a className="underline text-blue-500" href="/">
          Sign In
        </a>
      </p> */}
    </div>
  );
}
