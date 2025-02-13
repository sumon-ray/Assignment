/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import logBg from "../../assets/images/loginbg.jpg";
import "../Register/register.css";
import { toast, ToastContainer } from "react-toastify";
import { useLoginMutation } from "../../redux/fetchers/auth/login";

import Spinnter from "../../reuseComponents/Spinnter";
import { useAppDispatch } from "../../redux/hooks";
import { usersInfo } from "../../redux/fetchers/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useEffect } from "react";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, { data, isLoading, error, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await login(data).unwrap();
    const user = await verifyToken(res.token);
    dispatch(usersInfo({ users: user, token: res.token }));
  };

  // Type guard for handling FetchBaseQueryError
  const isFetchBaseQueryError = (
    error: any
  ): error is { data: { message: string } } => {
    return error && error.data && typeof error.data.message === "string";
  };

  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryError(error)) {
        toast.error(error.data.message, { position: "top-center" });
      } else {
        toast.error("An unexpected error occurred", { position: "top-center" });
      }
    }
    if (isSuccess) {
      toast.success(data.message, { position: "top-center" });
      navigate("/");
    }
  }, [error, isSuccess, data]);

  return (
    <div className="regBg">
      <ToastContainer position="top-center" />
      <div className="container mx-auto px-[10px] flex justify-center items-center h-[100vh] bg-[#1ABC9C]">
        <div className="lg:w-[70%] mx-auto p-[30px] regBg rounded-lg">
          <h2 className="mb-[20px] text-center text-3xl">Login Here</h2>
          <div className=" lg:flex gap-[25px]">
            <div className="lg:w-[50%] flex justify-center items-center">
              <img className="w-full h-[250px] rounded-lg" src={logBg} alt="" />
            </div>
            <div className="lg:w-[50%] text-[13px] lg:text-[16px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-[10px]">
                  <label htmlFor="email">Enter Your Email</label>
                  <input
                    {...register("email", { required: true })}
                    name="email"
                    className="w-full p-[10px] border rounded-lg focus:outline-none"
                    type="email"
                    placeholder="Enter Your Email"
                  />
                  {errors.email && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="mt-[10px]">
                  <label htmlFor="password">Enter Your Password</label>
                  <input
                    {...register("password", { required: true })}
                    name="password"
                    className="w-full p-[10px] border rounded-lg focus:outline-none"
                    type="password"
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
                  If You Have No Account Please{" "}
                  <NavLink to="/register" className="text-blue-500">
                    Register
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

export default Login;
