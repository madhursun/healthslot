import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(Appcontext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showfilter, setshowfilter] = useState(false);

  const navigate = useNavigate();

  const applyfilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [speciality, doctors]);

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 bg-gray-50 text-gray-800">
      {/* Heading */}
      <p className="text-3xl md:text-4xl font-semibold text-center mb-10">
        Browse through our specialist{" "}
        <span className="text-teal-600">Doctors</span>.
      </p>
      <button
        className="sm:hidden bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 mb-5"
        onClick={() => setshowfilter((prev) => !prev)}
      >
        Filters
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Sidebar / Filters */}
        <div
          className={`bg-white p-6 rounded-2xl shadow-md md:w-1/4 flex flex-col gap-3
    max-h-[450px] overflow-y-auto transition-all duration-300 ${
      showfilter ? "block" : "hidden md:flex"
    }`}
        >
          <p className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
            Specialities
          </p>

          <div className="flex flex-col gap-2">
            {[
              "General Physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
            ].map((spec) => (
              <p
                key={spec}
                onClick={() =>
                  speciality === spec
                    ? navigate("/doctors")
                    : navigate(`/doctors/${spec}`)
                }
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 text-gray-700
          ${
            speciality === spec
              ? "bg-teal-600 text-white font-medium shadow-sm"
              : "hover:bg-teal-100 hover:text-teal-600"
          }`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-2 h-2 rounded-full 
      ${item.available ? "bg-green-500" : "bg-red-500"}`}
                  ></span>

                  <span
                    className={`text-sm font-medium ${
                      item.available ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.available ? "Available" : "Not Available"}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-600">{item.speciality}</p>
                <p className="text-gray-500 text-sm">{item.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
