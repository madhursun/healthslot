import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/admincon";

const Doclist = () => {
  const { doctors, atoken, getallDocs, changeavailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getallDocs();
    }
  }, [atoken]);

  return (
    <div
      className="grid gap-10"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
    >
      {doctors.map((item, index) => (
        <div
          key={index}
          className="group bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300 border border-gray-100"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-56 object-contain rounded-md 
            bg-white group-hover:bg-teal-100 transition-all duration-500"
          />

          <div className="mt-5">
            <p className="text-lg font-semibold">{item.name}</p>
            <p className="text-gray-500 text-sm">{item.speciality}</p>

            {/* Availability Toggle */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={item.available}
                onChange={() => changeavailability(item._id)}
                className="w-4 h-4 accent-green-600 cursor-pointer"
              />

              <p
                className={`text-sm font-medium ${
                  item.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.available ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Doclist;
