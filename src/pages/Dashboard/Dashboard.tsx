import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { boardRoute } from "../../routes/RouterCreate";
import { adminRouter } from "../../routes/admin.routes";
import { userRoute } from "../../routes/user.routes";
import { TRouter } from "../../utils/typeRoute";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./dash.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/fetchers/auth/authSlice";
import { useSingalUserQuery } from "../../redux/fetchers/auth/userData";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useAppSelector(
    (state) => state.auth.user as { role: string }
  );
  const { email } = useAppSelector(
    (state) => state.auth.user as { email: string }
  );
  const { data } = useSingalUserQuery(email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let routes: TRouter[] = [];

  switch (role) {
    case "admin":
      routes = boardRoute(adminRouter);
      break;
    case "customer":
      routes = boardRoute(userRoute);
      break;
  }

  const handelLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div>
      <div className="shadow-lg py-[10px] border px-[20px]">
        <div className="container mx-auto px-[5px] lg:px-[20px] flex justify-between items-center">
          <div className="flex items-center gap-[30px]">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-700 focus:outline-none border text-[30px]"
            >
              <IoMenu />
            </button>
            <h1 className="text-[18px] font-semibold text-gray-700">
              Welcome, {data?.data?.name}
            </h1>
          </div>
          <div>
            <button
              onClick={handelLogOut}
              className="bg-[#1abc9c] text-white px-4 py-2 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <aside
        className={`border h-screen w-[50%] md:w-[40%] lg:w-[20%] absolute bg-white z-10 ${
          isSidebarOpen ? "hidden transition-[.8s]" : ""
        }`}
      >
        <div className="p-4 text-lg font-bold text-gray-700 border-b flex justify-between items-center">
          <NavLink to="/">
            <h2 className="capitalize">{role} Dashboard</h2>
          </NavLink>
          <div className="flex md:hidden lg:hidden">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <IoClose />
            </button>
          </div>
        </div>
        <ul className="space-y-2 px-4 py-4 overflow-y-auto max-h-[80vh]">
          {routes &&
            routes.map((item, index) => (
              <li key={index} className="rounded-lg cursor-pointer">
                <NavLink
                  state={{ name: data?.data?.name }}
                  className="block px-[15px] py-[5px]"
                  to={`${item.path}`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </aside>
      <div className="container mx-auto px-[20px] mt-[30px]">
        <div className="w-full lg:w-[80%] ml-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
