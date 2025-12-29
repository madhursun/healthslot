import React, { use } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-teal-400 via-teal-200 to-teal-400 mx-auto max-w-6xl px- sm:px-10 md:px-14 py-4 rounded-2xl shadow-lg flex flex-col-reverse md:flex-row items-center gap-8 relative my-20">
      {/* Left side */}
      <div className="flex-1 text-center md:text-left space-y-3 md:space-y-4">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          Book Appointment
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
          with 100+ Top Doctors
        </h1>
        <button
          className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 mt-2"
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
        >
          Create Account
        </button>
      </div>

      {/* Right side */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-full max-w-md  transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default Banner;
