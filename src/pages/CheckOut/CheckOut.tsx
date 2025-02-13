import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import { authData } from "../../redux/fetchers/auth/authSlice";
type Inputs = {
  address: string;
  city: string;
  email: string;
  name: string;
  zip: string;
};
const CheckOut: React.FC = () => {
  const [count, setCount] = useState(1);
  const user = useAppSelector(authData);
  const { state } = useLocation();
  const navigate = useNavigate();
  const amount = state?.pid?.price * count;
  const email = (user as { email: string }).email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    localStorage.removeItem("temData");
    const finData = {
      ...data,
      amount: amount,
      queantity: count,
      product: state?.pid?._id,
      user: email,
    };
    localStorage.setItem("temData", JSON.stringify(finData));

    if (
      finData.address === "" ||
      finData.city === "" ||
      finData.email === "" ||
      finData.name === "" ||
      finData.zip === "" ||
      finData.amount <= 0 ||
      finData.queantity <= 0 ||
      finData.product === "" ||
      finData.user === ""
    ) {
      toast.error("fillup all the requerments");
    }
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white shadow-lg  overflow-hidden">
        <div className="bg-[#1ABC9C] text-white text-center py-4">
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
        <ToastContainer />

        <div className="p-6 bg-gray-100  shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Product Details</h2>
          <div className="space-y-4">
            <div className="md:flex space-y-4 lg:flex items-center gap-[30px] justify-between bg-white p-4  shadow-sm">
              <img
                src={state.pid.image}
                alt={state.pid.name}
                className="lg:w-20 lg:h-20 md:w-20 md:h-20 w-[50%] mx-auto rounded-lg  object-contain"
              />
              <div className="flex-1 lg:text-left md:text-left lg:ml-4 md:ml-4 text-center">
                <h3 className="font-medium">{state.pid.name}</h3>
                <p className="text-sm text-gray-600">${amount.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-center space-x-2 text-center">
                <button
                  disabled={state?.pid?.stock === count}
                  onClick={() => setCount(count + 1)}
                  className="w-[30px] h-[30px] rounded-full mr-[5px]  border border-[#1ABC9C] cursor-pointer"
                >
                  +
                </button>
                <div className="flex justify-center items-center">
                  <span className="text-[18px] font-bold">{count}</span>
                </div>
                <button
                  disabled={count <= 1}
                  onClick={() => setCount(count - 1)}
                  className="w-[30px] h-[30px] rounded-full ml-[5px]  border border-[#1ABC9C] cursor-pointer"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:flex gap-[30px] items-center md:space-x-6">
          <div className="lg:w-[65%] bg-gray-100 p-6 rounded-lg shadow-md border border-[#1ABC9C]">
            <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  className="w-full p-2 border focus:outline-none border-[#1ABC9C] "
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  className="w-full p-2 border focus:outline-none border-[#1ABC9C] "
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  {...register("address", { required: true })}
                  type="text"
                  name="address"
                  className="w-full p-2 border focus:outline-none border-[#1ABC9C] "
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    {...register("city", { required: true })}
                    type="text"
                    name="city"
                    className="w-full p-2 border focus:outline-none border-[#1ABC9C] "
                    placeholder="City"
                  />
                  {errors.city && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ZIP Code
                  </label>
                  <input
                    {...register("zip", { required: true })}
                    type="text"
                    name="zip"
                    className="w-full p-2 border focus:outline-none border-[#1ABC9C] focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
                    placeholder="ZIP"
                  />
                  {errors.zip && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="lg:w-[35%]">
            <div className=" border border-[#1ABC9C] p-[10px] space-y-4">
              <h2 className="text-center">Order Summary</h2>
              <div className="flex justify-between items-center">
                <input
                  className="w-[80%] border border-[#1ABC9C] p-[8px] focus:outline-none"
                  type="text"
                  placeholder="CuponCode"
                />
                <button className="w-[20%] text-[12px] bg-[#1ABC9C] py-[12px] px-[5px] cursor-pointer text-white">
                  Apply
                </button>
              </div>
              <div className="mt-[20px] space-y-4">
                <div className="flex justify-between items-center">
                  <p>Total Price</p>
                  <p>${amount}/-</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Queantity</p>
                  <p>{count}/-</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Discount Cupon</p>
                  <p>0/-</p>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <p>Total =</p>
                  <p>{amount}/-</p>
                </div>
              </div>
              <div className="mt-[20px]">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="w-full cursor-pointer text-white bg-[#1ABC9C] py-[9px]"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
