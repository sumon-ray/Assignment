import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../../redux/hooks";
interface TUser {
  role: string;
  name: string;
  email: string;
  // Any other properties you expect in the user object
}

const Navbar = () => {
  const data = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.auth.user as TUser);

  let routes = "";

  if (user?.role === "admin") {
    routes = "/dashboard/admin";
  }
  if (user?.role === "customer") {
    routes = "/dashboard/user";
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-[#1ABC9C] text-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <NavLink to="/" className="text-2xl font-bold">
          CStore
        </NavLink>

        <div className="hidden md:flex space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/aboutus">About Us</NavLink>
        </div>

        <div className="hidden md:flex space-x-4">
          {data?.token ? (
            <>
              <button className="border px-[30px] py-[8px] cursor-pointer">
                <NavLink to={`${routes}`}>Dashboard</NavLink>
              </button>
            </>
          ) : (
            <>
              <button className="border px-[30px] py-[8px] cursor-pointer">
                <NavLink to="/login">Login</NavLink>
              </button>
              <button className="border px-[30px] py-[8px] cursor-pointer">
                <NavLink to="/register">Register</NavLink>
              </button>
            </>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="block md:hidden text-gray-300 focus:outline-none text-[30px]"
        >
          <IoMdMenu />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-100 text-gray-900 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <IoClose />
          </button>
        </div>
        <div className="mt-16 flex flex-col items-center space-y-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/aboutus">About Us</NavLink>

          <div className="mt-4 flex space-x-4">
            {data?.token ? (
              <>
                <button className="border px-[30px] py-[8px] cursor-pointer">
                  <NavLink to={`${routes}`}>Dashboard</NavLink>
                </button>
              </>
            ) : (
              <>
                <button className="border px-[30px] py-[8px] cursor-pointer">
                  <NavLink to="/login">Login</NavLink>
                </button>
                <button className="border px-[30px] py-[8px] cursor-pointer">
                  <NavLink to="/register">Register</NavLink>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
