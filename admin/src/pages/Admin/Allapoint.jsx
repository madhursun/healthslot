import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/admincon";
import { AppContext } from "../../context/appcon";
import { assets } from "../../assets/assets";

const Allapoint = () => {
  const { atoken, appointments, getallappointments, cancelAppointments } =
    useContext(AdminContext);
  const { calage, slotdateformat, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getallappointments();
    }
  }, [atoken]);

  return (
    <div className="p-6">
      <p className="text-xl font-semibold mb-4">All Appointments</p>

      <div className="space-y-3">
        {/* FIXED HEADER: Same grid template as rows */}
        <div
          className="grid grid-cols-[60px_1.3fr_80px_1.2fr_1.3fr_100px_120px] 
                    bg-gray-100 px-5 py-3 rounded-lg font-semibold text-gray-700 text-sm"
        >
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[60px_1.3fr_80px_1.2fr_1.3fr_100px_120px] items-center 
               bg-white px-5 py-4 rounded-xl shadow-sm border border-gray-200 
               hover:shadow-md transition"
          >
            <p className="font-medium">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img
                src={item.userData?.image}
                className="w-10 h-10 rounded-full object-cover border"
                alt=""
              />
              <p className="font-medium text-gray-800 truncate max-w-[120px]">
                {item.userData?.name}
              </p>
            </div>

            <p className="text-gray-600">{calage(item.userData.dob)}</p>

            <div className="flex flex-col leading-tight">
              <span className="text-gray-800 font-medium">
                {slotdateformat(item.slotDate)}
              </span>
              <span className="text-xs text-gray-500">{item.slotTime}</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={item.docData?.image}
                className="w-10 h-10 rounded-full object-cover border"
                alt=""
              />
              <p className="font-medium text-gray-800 truncate max-w-[150px]">
                {item.docData?.name}
              </p>
            </div>

            <p className="font-semibold text-gray-800">
              {currency}
              {item.amount}
            </p>

            <div className="flex items-center gap-3">
              {!item.cancelled && !item.isCompleted && (
                <button onClick={() => cancelAppointments(item._id)}>
                  <img
                    src={assets.cancel_icon}
                    className="w-10 h-10 cursor-pointer"
                    alt="cancel"
                  />
                </button>
              )}

              {item.cancelled ? (
                <span className="text-red-500 font-medium capitalize text-sm">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="text-green-600 font-medium capitalize text-sm">
                  Completed
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allapoint;
