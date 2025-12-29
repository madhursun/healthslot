import React, { useContext } from "react";
import { Appcontext } from "../context/Appcontext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Myappointments = () => {
  const { backendurl, token, getDoc } = useContext(Appcontext);

  const [appointments, setappointments] = useState([]);
  const navigate = useNavigate();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotdateformat = (slotDate) => {
    const dateArr = slotDate.split("_");
    return dateArr[0] + " " + months[Number(dateArr[1])] + " " + dateArr[2];
  };

  const getuserappointments = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setappointments(data.appointments.reverse());
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const cancelappoi = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getuserappointments();
        getDoc();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const initpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amounnt: order.amount,
      curreny: order.currency,
      name: "Appointment Payment",
      description: "Appointment Paymnet",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        try {
          const { data } = await axios.post(
            backendurl + "/api/user/verifyrazorpay",
            res,
            { headers: { token } }
          );
          if (data.success) {
            getuserappointments();
            navigate("/my-appointments");
          }
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentrazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initpay(data.order);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      getuserappointments();
    }
  }, [token]);

  return (
    <div className="px-6 md:px-12 lg:px-20 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center md:text-left">
        My Appointments
      </h1>

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-2xl p-6 gap-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                src={item.docData.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-full border-2 border-teal-500 shadow-sm"
              />
            </div>

            {/* Doctor Details */}
            <div className="flex-1 text-center md:text-left space-y-1">
              <p className="text-xl font-semibold text-gray-800">
                {item.docData.name}
              </p>
              <p className="text-green-600 font-medium">
                {item.docData.speciality}
              </p>

              <div className="mt-2">
                <p className="text-gray-700 font-medium">Address:</p>
                <p className="text-gray-600">{item.docData.address.line1}</p>
                <p className="text-gray-600">{item.docData.address.line2}</p>
              </div>

              <p className="mt-2 text-gray-700">
                <span className="font-medium text-gray-800">Date & Time:</span>{" "}
                {slotdateformat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold border border-green-300 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Paid
                </span>
              )}

              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentrazorpay(item._id)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelappoi(item._id)}
                  className="bg-gray-200 hover:bg-red-400 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <span className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-100 text-red-700 border border-red-300 shadow-sm">
                  Appointment Cancelled
                </span>
              )}

              {item.isCompleted && (
                <span className="px-4 py-2 text-sm font-semibold rounded-lg bg-teal-100 text-white-100 border border-green-300 shadow-sm">
                  Appointment Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappointments;
