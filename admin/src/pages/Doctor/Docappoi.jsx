import React, { useContext, useEffect } from "react";
import { DocContext } from "../../context/docCon";
import { AppContext } from "../../context/appcon";
import { assets } from "../../assets/assets";

const Docappoi = () => {
  const {
    dtoken,
    getappointments,
    appointments,
    completeappointment,
    cancelappointment,
  } = useContext(DocContext);
  const { calage, slotdateformat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) getappointments();
  }, [dtoken]);

  return (
    <div className="p-6">
      <p className="text-2xl font-semibold text-teal-700 mb-6">
        All Appointments
      </p>

      {/* Header Row */}
      <div className="grid grid-cols-7 bg-teal-100 py-3 px-4 rounded-md font-semibold text-teal-700">
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      {/* Appointment Rows */}
      <div className="mt-2 space-y-2">
        {[...appointments].reverse().map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-7 items-center bg-white shadow-sm border border-gray-200 rounded-md py-3 px-4 hover:shadow-md transition"
          >
            {/* Index */}
            <p className="font-medium">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-3">
              <img
                src={item.userData.image}
                className="w-10 h-10 rounded-full border"
                alt="patient"
              />
              <p className="font-medium">{item.userData.name}</p>
            </div>

            {/* Payment Type */}
            <p className="font-semibold text-gray-700">
              {item.payment ? (
                <span className="text-green-600">Online</span>
              ) : (
                <span className="text-orange-600">Cash</span>
              )}
            </p>

            {/* Age */}
            <p>{calage(item.userData.dob)}</p>

            {/* Date & Time */}
            <p className="text-sm text-gray-700">
              {slotdateformat(item.slotDate)} <br />
              <span className="text-xs text-gray-500">{item.slotTime}</span>
            </p>

            {/* Fees */}
            <p className="font-medium">
              {currency}
              {item.amount}
            </p>

            {/* Action Icons */}
            {/* Action Icons */}
            <div className="flex gap-3 items-center">
              {item.cancelled ? (
                <span className="text-red-500 font-semibold">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="text-green-600 font-semibold">Completed</span>
              ) : (
                <>
                  <img
                    onClick={() => completeappointment(item._id)}
                    src={assets.tick_icon}
                    alt="approve"
                    className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                  />

                  <img
                    onClick={() => cancelappointment(item._id)}
                    src={assets.cancel_icon}
                    alt="cancel"
                    className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Docappoi;
