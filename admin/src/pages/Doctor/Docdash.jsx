import React, { useContext, useEffect } from "react";
import { DocContext } from "../../context/docCon";
import { AppContext } from "../../context/appcon";
import { assets } from "../../assets/assets";

const Docdash = () => {
  const {
    dtoken,
    dashdata,
    getdashdata,
    completeappointment,
    cancelappointment,
  } = useContext(DocContext);

  const { currency, slotdateformat } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getdashdata();
    }
  }, [dtoken, getdashdata]);

  if (!dashdata) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* TOP CARDS */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Earnings */}
        <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
          <img src={assets.earning_icon} className="w-14" alt="earnings" />
          <div>
            <p className="text-2xl font-semibold">
              {currency}
              {dashdata.earnings}
            </p>
            <p className="text-gray-600">Earnings</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
          <img
            src={assets.appointments_icon}
            className="w-14"
            alt="appointments"
          />
          <div>
            <p className="text-2xl font-semibold">{dashdata.appointments}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
          <img src={assets.patients_icon} className="w-14" alt="patients" />
          <div>
            <p className="text-2xl font-semibold">{dashdata.patients}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      {/* LATEST BOOKINGS */}
      <div className="bg-white p-6 shadow rounded-xl">
        <div className="flex items-center gap-3 mb-5">
          <img src={assets.list_icon} className="w-7" alt="list" />
          <p className="text-xl font-semibold">Latest Bookings</p>
        </div>

        <div className="flex flex-col gap-5">
          {dashdata.latestappointments?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition"
            >
              {/* Patient Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.userData?.image}
                  className="w-14 h-14 rounded-full object-cover"
                  alt="patient"
                />
                <div>
                  <p className="font-semibold">{item.userData?.name}</p>
                  <p className="text-gray-600 text-sm">
                    {slotdateformat(item.slotDate)}
                  </p>
                </div>
              </div>

              {/* Status / Actions */}
              <div className="flex gap-3 items-center">
                {item.cancelled ? (
                  <span className="text-red-500 font-semibold">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-600 font-semibold">
                    Completed
                  </span>
                ) : (
                  <>
                    <img
                      src={assets.tick_icon}
                      alt="complete"
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                      onClick={() => completeappointment(item._id)}
                    />
                    <img
                      src={assets.cancel_icon}
                      alt="cancel"
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                      onClick={() => cancelappointment(item._id)}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Docdash;
