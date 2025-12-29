import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Relateddoc = ({ speciality, docId }) => {
  const { doctors } = useContext(Appcontext);

  const [reldoc, setreldoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const docdata = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setreldoc(docdata);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Related Doctors
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Book an appointment with the top doctors in your city
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {reldoc.slice(0, 10).map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/appointments/${item._id}`);
              scrollTo(0, 0);
            }}
            className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            {/* Doctor Image */}
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Doctor Info */}
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
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {item.name}
              </h2>
              <p className="text-gray-600 mb-1">{item.speciality}</p>
              <p className="text-gray-500 text-sm">{item.experience}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="text-center mt-10">
        <button
          className="px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors duration-300 shadow-md hover:shadow-lg"
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

export default Relateddoc;
