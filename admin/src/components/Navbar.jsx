import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/admincon";
import { DocContext } from "../context/docCon";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { dtoken, setdtoken } = useContext(DocContext);
  const navigate = useNavigate();

  const logout = () => {
    // 1️⃣ Clear state
    setAtoken(null);
    setdtoken(null);

    // 2️⃣ Clear storage
    localStorage.removeItem("atoken");
    localStorage.removeItem("dtoken");

    // 3️⃣ Navigate
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full bg-white shadow-sm border-b border-teal-200 px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={assets.logoprojectdd}
            alt="logo"
            className="w-[150px] h-[50px] object-contain"
          />
          <span className="text-xl font-semibold text-teal-700 mt-2">
            {atoken ? "Admin" : "Doctor"}
          </span>
        </div>

        <button
          onClick={logout}
          className="bg-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
