import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/admincon";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/appcon";

const Dash = () => {
  const { atoken, getdashdata, dashdata, cancelAppointments } =
    useContext(AdminContext);

  const { slotdateformat } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getdashdata();
    }
  }, [atoken]);

  return (
    dashdata && (
      <div className="p-6 flex flex-col gap-8">
        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Doctors Card */}
          <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
            <img src={assets.doctor_icon} className="w-14" />
            <div>
              <p className="text-2xl font-semibold">{dashdata.doctors}</p>
              <p className="text-gray-600">Doctors</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
            <img src={assets.appointments_icon} className="w-14" />
            <div>
              <p className="text-2xl font-semibold">{dashdata.appointments}</p>
              <p className="text-gray-600">Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
            <img src={assets.patients_icon} className="w-14" />
            <div>
              <p className="text-2xl font-semibold">{dashdata.patients}</p>
              <p className="text-gray-600">Patients</p>
            </div>
          </div>
        </div>

        {/* LATEST BOOKINGS */}
        <div className="bg-white p-6 shadow rounded-xl">
          <div className="flex items-center gap-3 mb-5">
            <img src={assets.list_icon} className="w-7" />
            <p className="text-xl font-semibold">Latest Bookings</p>
          </div>

          <div className="flex flex-col gap-5">
            {dashdata.latestappointments.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.docData.image}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">{item.docData.name}</p>
                    <p className="text-gray-600 text-sm">
                      {slotdateformat(item.slotDate)}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-4">
                  {!item.cancelled && !item.isCompleted && (
                    <button onClick={() => cancelAppointments(item._id)}>
                      <img
                        src={assets.cancel_icon}
                        className="w-10 h-10 hover:scale-110 transition cursor-pointer"
                        alt="cancel"
                      />
                    </button>
                  )}

                  {item.cancelled ? (
                    <span className="text-red-500 font-medium">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-600 font-medium">
                      Completed
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dash;
