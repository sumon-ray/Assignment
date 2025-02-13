import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/fetchers/auth/changePassword";
import { useAppSelector } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

type FormData = {
  currentPass: string;
  newPass: string;
  retypePass: string;
};

export const ChangePassword = () => {
  const [setPassword, { isLoading, isSuccess }] = useChangePasswordMutation();
  const { email } = useAppSelector(
    (state) => state.auth.user as { email: string }
  );

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.newPass !== data.retypePass) {
      return toast.error("Your Enter Password Not Match", {
        position: "top-center",
      });
    }

    const finial = { ...data, email };

    setPassword(finial);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Set Successffylly", {
        position: "top-center",
      });
    }
  }, [isSuccess]);
  return (
    <div>
      <ToastContainer />
      <div className="w-full md:w-[60%] lg:w-[40%] mx-auto">
        <p>{isLoading ? "Loading......" : ""}</p>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="currentPass">Current Password</label>
            <div className="relative">
              <input
                className="w-full p-[8px] bg-white focus:outline-none border border-[#1ABC9C]"
                type={showCurrentPassword ? "text" : "password"}
                {...register("currentPass", {
                  required: "Current password is required",
                })}
                placeholder="Current Password"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.currentPass && (
              <span className="text-red-500">{errors.currentPass.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="newPass">New Password</label>
            <div className="relative">
              <input
                className="w-full p-[8px] bg-white focus:outline-none border border-[#1ABC9C]"
                type={showNewPassword ? "text" : "password"}
                {...register("newPass", {
                  required: "New password is required",
                })}
                placeholder="New Password"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.newPass && (
              <span className="text-red-500">{errors.newPass.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="retypePass">Re-type Password</label>
            <div className="relative">
              <input
                className="w-full p-[8px] bg-white focus:outline-none border border-[#1ABC9C]"
                type={showRetypePassword ? "text" : "password"}
                {...register("retypePass", {
                  required: "Please re-type your password",
                })}
                placeholder="Re-Type Password"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
              >
                {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.retypePass && (
              <span className="text-red-500">{errors.retypePass.message}</span>
            )}
          </div>

          <div>
            <button className="w-full py-[8px] bg-[#1ABC9C]" type="submit">
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
