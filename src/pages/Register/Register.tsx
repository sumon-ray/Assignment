/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import regBg from "../../assets/images/registerbg.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
import "./register.css";
import { useUsersMutation } from "../../redux/fetchers/auth/authApi";
import { toast, ToastContainer } from "react-toastify";
import Spinnter from "../../reuseComponents/Spinnter";
import { useEffect } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [createUser, { data, isLoading, error }] = useUsersMutation({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createUser(data).unwrap();
  };

  const isFetchBaseQueryError = (
    error: any
  ): error is { data: { message: string } } => {
    return error && error.data && typeof error.data.message === "string";
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message, { position: "top-center" });
    }

    if (error) {
      if (isFetchBaseQueryError(error)) {
        toast.error(error.data.message, { position: "top-center" });
      } else {
        toast.error("An unexpected error occurred", { position: "top-center" });
      }
    }
  }, [data, error]);

  return (
    <div className="regBg">
      <ToastContainer position="top-center" />
      <div className="container mx-auto px-[10px] flex justify-center items-center h-[100vh] bg-[#1ABC9C]">
        <div className="lg:w-[70%] mx-auto p-[30px] regBg rounded-lg">
          <h2 className="mb-[20px] text-center text-3xl">Register Now</h2>
          <div className=" lg:flex gap-[25px]">
            <div className="lg:w-[50%] flex justify-center items-center">
              <img
                className="w-full h-[250px] rounded-lg"
                src={regBg}
                alt="Register Background"
              />
            </div>
            <div className="lg:w-[50%] text-[13px] lg:text-[16px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-[10px]">
                  <label htmlFor="name">Enter Your Name</label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full p-[10px] border rounded-lg focus:outline-none"
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                  />
                  {errors.name && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="mt-[10px]">
                  <label htmlFor="email">Enter Your Email</label>
                  <input
                    {...register("email", { required: true })}
                    className="w-full p-[10px] border rounded-lg focus:outline-none"
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                  />
                  {errors.email && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="mt-[10px]">
                  <label htmlFor="password">Enter Your Password</label>
                  <input
                    className="w-full p-[10px] border rounded-lg focus:outline-none"
                    type="password"
                    {...register("password", { required: true })}
                    name="password"
                    placeholder="Enter Your Password"
                  />
                  {errors.password && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="mt-[10px]">
                  <button
                    className="w-full p-[10px] border cursor-pointer rounded-lg"
                    type="submit"
                  >
                    {isLoading ? <Spinnter /> : "Submit"}
                  </button>
                </div>
                <div className="mt-[20px]">
                  If You Have an Account Please{" "}
                  <NavLink to="/login" className="text-blue-500">
                    Login
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
