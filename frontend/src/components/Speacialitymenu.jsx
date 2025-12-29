import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const Speacialitymenu = () => {
  return (
    <div
      id="speaciality"
      className="px-6 md:px-12 lg:px-20 py-12 bg-white text-center"
    >
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Find by <span className="text-teal-600">Speciality</span>
      </h1>

      <p className="text-gray-600 mb-5">
        Explore our diverse range of medical specialities and connect with
      </p>

      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className=" flex-col items-center text-xs cursor pointer flex shrink-0 hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-16 sm:w-24 mb-2"
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speacialitymenu;
