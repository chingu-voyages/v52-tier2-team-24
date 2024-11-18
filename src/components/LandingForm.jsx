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
      <header className="h-[20vh]">
        <h1 className="~text-3xl/6xl mb-4 font-extrabold">
          Schedule an Appointment
        </h1>
        <p>Please fill out the form to request and appointment</p>
      </header>

      <div className="border-2 w-full  py-10  items-center flex flex-col gap-8 justify-center border-slate-300 rounded-md bg-green-100">
        <form
          onSubmit={handleSubmit((data) => {
            handleFormSubmit(data);
          })}
          className=" sm:ml-5 sm:items-start flex text-lg  flex-col w-11/12 mx-auto"
        >
          <div className="sm:flex-row md:w-1/2   flex-grow w-full flex flex-col  ">
            <p className="ml-2 font-bold">First Name *</p>
            <input
              className={` pl-2 border mb-4  py-2 rounded-lg  ${
                errors.firstName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("firstName")}
              placeholder={errors.firstName?.message || "Enter Your Name"}
            />
            <p className="ml-2 font-bold">Last Name *</p>
            <input
              className={`border mb-4   rounded-lg pl-2 py-2  ${
                errors.lastName
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("lastName")}
              placeholder={errors.lastName?.message || "Enter Your Last Name"}
            />
          </div>
          <div className="sm:flex-row md:w-1/2 flex-grow w-full flex flex-col  ">
            <p className="ml-2 font-bold">Email *</p>
            <input
              className={` pl-2 py-2 mb-4   border rounded-lg  ${
                errors.email
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300"
              }`}
              type="text"
              {...register("email")}
              placeholder={errors.email?.message || "Enter Your  Email"}
            />
            <p className="ml-2 font-bold">Address</p>
            <input
              className={` pl-2 py-2 border mb-4   rounded-lg  ${
                errors.address
                  ? "border-red-500 placeholder-red-500"
                  : "border-slate-300 "
              }`}
              type="text"
              {...register("address")}
              placeholder={errors.address?.message || "Enter Your Address"}
            />
          </div>
          <p className="ml-2 font-bold">Preferred Timeslot</p>
          <div className="sm:flex-row sm:w-1/2 flex flex-col w-full gap-2  ">
            <select className="sm:w-1/2 py-3 rounded-lg" name="" id="0"></select>
            <select className="sm:w-1/2 py-3 rounded-lg" name="" id=""></select>
          </div>
          <div className="sm:flex-row sm:w-1/2 sm:mx-auto flex flex-col gap-2 mt-5">
            <button
              type="submit"
              className=" w-full font-bold  bg-green-600 rounded-lg text-slate-50 text-xl  py-4 "
            >
              Submit{" "}
            </button>
            <button
              onClick={() => reset()}
              className=" border-2 border-slate-600  w-full  rounded-lg  text-xl font-bold uppercase py-4 "
            >
              Cancel{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
