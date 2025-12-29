import React, { useContext } from "react";
import { AdminContext } from "../context/admincon";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DocContext } from "../context/docCon";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DocContext);

  if (!atoken && !dtoken) return null;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-teal-100 shadow-sm p-5">
      {atoken && (
        <ul className="space-y-3">
          {/* Dashboard */}
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
            ${isActive ? "bg-teal-100 text-teal-700" : "hover:bg-gray-100"}`
            }
          >
            <img src={assets.home_icon} className="w-6 h-6" />
            <p className="font-light">Dashboard</p>
          </NavLink>

          {/* Add Doctor */}
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
            ${isActive ? "bg-teal-100 text-teal-700" : "hover:bg-gray-100"}`
            }
          >
            <img src={assets.add_icon} className="w-6 h-6" />
            <p className="font-light">Add Doctor</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
            ${isActive ? "bg-teal-100 text-teal-700" : "hover:bg-gray-100"}`
            }
          >
            <img src={assets.appointment_icon} className="w-6 h-6" />
            <p className="font-light">Appointments</p>
          </NavLink>

          {/* Doctor List */}
          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
            ${isActive ? "bg-teal-100 text-teal-700" : "hover:bg-gray-100"}`
            }
          >
            <img src={assets.people_icon} className="w-6 h-6" />
            <p className="font-light">Doctor List</p>
          </NavLink>
        </ul>
      )}
      {dtoken && (
        <ul className="space-y-3">
          {/* Dashboard */}
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
            ${isActive ? "bg-teal-100 text-teal-700" : "hover:bg-gray-100"}`
            }
          >
            <img src={assets.home_icon} className="w-6 h-6" />
            <p className="font-light">Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
            ${isActive ? "bg-teal-100 text-teal-700" : "hover:bg-gray-100"}`
            }
          >
            <img src={assets.appointment_icon} className="w-6 h-6" />
            <p className="font-light">Appointments</p>
          </NavLink>

          {/* Doctor List */}
          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
            ${isActive ? "bg-teal-100 text-teal-700" : "hover:bg-gray-100"}`
            }
          >
            <img src={assets.people_icon} className="w-6 h-6" />
            <p className="font-light">Doctor Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
