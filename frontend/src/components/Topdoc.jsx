import React, { use, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";

const Topdoc = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(Appcontext);

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Top Doctors to Book an Appointment
        </h1>
        <p className="text-gray-600 mt-2">
          Book an appointment with the top doctors in your city
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctors.slice(0, 10).map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/appointments/${item._id}`)}
            className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img src={item.image} alt={item.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>

                <span
                  className={`text-sm font-medium ${
                    item.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-600">{item.degree}</p>
              <p className="text-gray-500 text-sm">{item.experience}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="text-center mt-8">
        <button
          className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors duration-300"
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
        >
          More..
        </button>
      </div>
    </div>
  );
};

export default Topdoc;
