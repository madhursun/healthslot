import React from "react";
import { assets } from "../assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 bg-gradient-to-r from-teal-100 to-white">
      {/* Left side */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <p className="text-3xl md:text-5xl font-semibold text-gray-800 leading-tight">
          Your Health, <span className="text-teal-600">Our Priority</span>{" "}
          <br />
          Book Appointments with{" "}
          <span className="text-teal-600">Top Doctors</span>
        </p>

        <div className="space-y-4">
          <div className="flex justify-center md:justify-start items-center space-x-3">
            <img
              src={assets.group_profiles}
              alt="Doctors group"
              className="w-32 md:w-40 rounded-full shadow-md"
            />
          </div>

          <p className="text-gray-600 text-sm md:text-base">
            Browse through our extensive list of experienced doctors,{" "}
            <br className="hidden md:block" />
            and find the perfect match for your healthcare needs.
          </p>

          <a
            href=""
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Book an Appointment
            <FaArrowRightLong />
          </a>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex justify-center mb-10 md:mb-0">
        <img
          alt="Healthcare illustration"
          src={assets.header_img}
          className="w-72 md:w-96 lg:w-[500px] drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default Header;
