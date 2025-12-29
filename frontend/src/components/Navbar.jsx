import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";

const Navbar = () => {
  const linkClass =
    "relative px-4 py-2 font-medium text-gray-700 transition duration-300 hover:text-teal-500";

  const activeClass =
    "text-teal-600 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-teal-500";

  const navigateToLogin = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const { token, settoken, userdata } = useContext(Appcontext);
  const logout = () => {
    settoken(false);
    localStorage.removeItem("token");
    navigateToLogin("/");
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 mb-0 border-b border-gray-300 shadow-sm bg-white sticky top-0 z-50">
      <NavLink to="/">
        <img src={assets.logoproject} alt="logo" className="w-36" />
      </NavLink>
      <ul className="hidden md:flex items-center gap-6 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          ABOUT
        </NavLink>

        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          ALL DOCTORS
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          CONTACT
        </NavLink>
        <li
          onClick={() =>
            (window.location.href = import.meta.env.VITE_ADMIN_URL)
          }
          className={linkClass}
        >
          ADMIN PANEL
        </li>
      </ul>
      <div className="flex items-center gap-4 ">
        {token && userdata ? (
          <div className="flex items-center gap-3 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userdata.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-10 right-0 bg-gray-100 border border-gray-300 rounded-md shadow-lg p-4 w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                <p
                  onClick={() => navigateToLogin("/my-profile")}
                  className="hover:text-black cursor pointer"
                >
                  My profile
                </p>

                <p
                  onClick={() => navigateToLogin("/my-appointments")}
                  className="hover:text-black cursor pointer"
                >
                  My Appointment
                </p>

                <p onClick={logout} className="hover:text-black cursor pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="hidden md:block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => navigateToLogin("/login")}
          >
            Create Account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className=" w-6 md:hidden"
          src={assets.menu_icon}
        />
        <div>
          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ${
              showMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-300">
              <img src={assets.logoproject} alt="Logo" className="w-32" />
              <img
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="Close Menu"
                className="w-6 cursor-pointer"
              />
            </div>

            {/* Menu Links */}
            <ul className="flex flex-col items-start gap-6 mt-10 px-6 text-gray-700 text-lg font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-teal-500 transition-colors duration-300 ${
                    isActive ? "text-teal-600 font-semibold" : ""
                  }`
                }
                onClick={() => setShowMenu(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  `hover:text-teal-500 transition-colors duration-300 ${
                    isActive ? "text-teal-600 font-semibold" : ""
                  }`
                }
                onClick={() => setShowMenu(false)}
              >
                All Doctors
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hover:text-teal-500 transition-colors duration-300 ${
                    isActive ? "text-teal-600 font-semibold" : ""
                  }`
                }
                onClick={() => setShowMenu(false)}
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hover:text-teal-500 transition-colors duration-300 ${
                    isActive ? "text-teal-600 font-semibold" : ""
                  }`
                }
                onClick={() => setShowMenu(false)}
              >
                Contact
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
