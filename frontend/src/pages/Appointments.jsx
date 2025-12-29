import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { Appcontext } from "../context/Appcontext";
import Relateddoc from "../components/Relateddoc";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencysymbol, backendurl, token, getDoc } =
    useContext(Appcontext);
  const daysofweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docinfo, setdocinfo] = useState(null);
  const [docslot, setdocslot] = useState([]); // array of arrays (7 days)
  const [slotindex, setslotindex] = useState(0);
  const [slottime, setslottime] = useState("");

  // fetch doctor info from context list
  const fetchdocinfo = async () => {
    const doc = doctors?.find((d) => d._id === docId) || null;
    setdocinfo(doc);
  };

  // Helper to pad numbers
  const pad = (n) => (n < 10 ? "0" + n : "" + n);

  // Generate 7 days of half-hour slots starting at 10:00 and ending before 21:00
  const getavaislot = async () => {
    if (!docinfo) return;

    const slotsBook = docinfo.slots_book || {}; // safe default
    setdocslot([]); // reset

    const now = new Date();

    const DAYS = 7;
    const DAY_START_HOUR = 10; // start time 10:00
    const DAY_END_HOUR = 21; // exclusive (slots should be before 21:00)
    const SLOT_MINUTES = 30;

    for (let i = 0; i < DAYS; i++) {
      // base start for this day
      const baseDate = new Date(now);
      baseDate.setDate(now.getDate() + i);
      baseDate.setSeconds(0);
      baseDate.setMilliseconds(0);

      // compute start time for this day
      let start = new Date(baseDate);
      if (i === 0) {
        // Today: compute next valid slot >= now rounded to next :00 or :30,
        // but not earlier than 10:00, and if now >= 21:00 skip today's slots.
        const h = now.getHours();
        const m = now.getMinutes();

        if (h >= DAY_END_HOUR) {
          // no slots today
          setdocslot((prev) => [...prev, []]);
          continue;
        }

        // If before 10:00 start at 10:00
        if (h < DAY_START_HOUR) {
          start.setHours(DAY_START_HOUR, 0, 0, 0);
        } else {
          // round to next half hour
          let nextH = h;
          let nextM;
          if (m === 0) nextM = 0;
          else if (m > 0 && m <= 30) nextM = 30;
          else {
            // m > 30
            nextH = h + 1;
            nextM = 0;
          }
          // if rounding goes beyond end hour -> skip (handled above)
          start.setHours(nextH, nextM, 0, 0);
        }
      } else {
        // Future days: start at 10:00 exactly
        start.setHours(DAY_START_HOUR, 0, 0, 0);
      }

      // end time (same day 21:00)
      const end = new Date(baseDate);
      end.setHours(DAY_END_HOUR, 0, 0, 0);

      const timeslots = [];
      let cur = new Date(start);

      while (cur < end) {
        // format time e.g. "10:00 AM" or "04:30 pm" depending on locale
        const timeStr = cur.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = cur.getDate();
        const month = cur.getMonth(); // keep 0-based to match backend usage
        const year = cur.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const bookedForDay = Array.isArray(slotsBook[slotDate])
          ? slotsBook[slotDate]
          : [];

        const isAvailable = !bookedForDay.includes(timeStr);

        if (isAvailable) {
          timeslots.push({
            datetime: new Date(cur),
            time: timeStr,
          });
        }

        // advance by 30 minutes
        cur = new Date(cur.getTime() + SLOT_MINUTES * 60 * 1000);
      }

      setdocslot((prev) => [...prev, timeslots]);
    }
  };

  const bookappointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    // validate slot selection
    if (!docslot[slotindex] || docslot[slotindex].length === 0) {
      toast.error("No slot selected or no slots available for this day");
      return;
    }

    if (!slottime) {
      toast.error("Please choose a time slot");
      return;
    }

    try {
      // find the selected slot's datetime (the clicked slot)
      const selected = docslot[slotindex].find((s) => s.time === slottime);
      if (!selected) {
        toast.error("Selected slot not found. Please reselect.");
        return;
      }

      const date = selected.datetime;
      const day = date.getDate();
      const month = date.getMonth(); // keep month 0-based to match backend format
      const year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendurl + "/api/user/book-appointment",
        { docId, slotDate, slotTime: slottime },
        {
          headers: {
            token: token,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        // refresh doctors/slots from backend
        await getDoc();
        navigate("/my-appointments");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (err) {
      console.error("BOOK ERROR:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchdocinfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors, docId]);

  useEffect(() => {
    // whenever docinfo changes, regenerate slots
    getavaislot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docinfo]);

  if (!docinfo)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16 lg:px-24">
      {/*---docinfo---*/}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={docinfo.image}
            alt={docinfo.name}
            className="w-48 h-48 object-cover rounded-full border-4 border-teal-500 shadow-md"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4 text-gray-800">
          {/* Name */}
          <p className="text-2xl font-semibold flex items-center gap-2">
            {docinfo.name}
            <img
              src={assets.verified_icon}
              alt="verified"
              className="w-5 h-5"
            />
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <p>
              {docinfo.degree} - {docinfo.speciality}
            </p>
            <button className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full font-medium">
              {docinfo.experience}
            </button>
          </div>

          {/* About */}
          <div className="pt-4 border-t border-gray-200">
            <p className="flex items-center gap-2 font-semibold text-gray-700">
              About{" "}
              <img src={assets.info_icon} alt="info" className="w-4 h-4" />
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              {docinfo.about}
            </p>
          </div>
          <p className="text-gray-700 font-medium border-t pt-4">
            Appointment fee:{" "}
            <span className="text-teal-600 font-semibold">
              {currencysymbol}
              {docinfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slot UI */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Book an Appointment
        </h2>

        {/* Days of Week with Dates */}
        <div className="flex overflow-x-auto gap-3 pb-4 border-b">
          {daysofweek.map((day, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            const formattedDate = date.getDate();

            return (
              <button
                key={index}
                onClick={() => {
                  setslotindex(index);
                  setslottime(""); // reset selected time when switching day
                }}
                className={`min-w-[90px] flex-shrink-0 text-center px-4 py-2 rounded-lg font-medium transition-all
            ${
              slotindex === index
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-teal-100"
            }`}
              >
                <div className="text-sm font-semibold">{day}</div>
                <div className="text-xs opacity-80">{formattedDate}</div>
              </button>
            );
          })}
        </div>

        {/* Time Slots (Horizontal Scroll) */}
        <div className="flex overflow-x-auto gap-3 mt-6 pb-3">
          {docslot[slotindex] && docslot[slotindex].length > 0 ? (
            docslot[slotindex].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setslottime(item.time)}
                className={`flex-shrink-0 px-4 py-2 border rounded-lg text-sm transition-all
          ${
            slottime === item.time
              ? "bg-teal-600 text-white border-teal-600"
              : "border-gray-300 text-gray-700 hover:bg-teal-100"
          }`}
              >
                {item.time}
              </button>
            ))
          ) : (
            <div className="text-gray-500 px-4">No slots available</div>
          )}
        </div>

        <div className="text-center mt-8">
          <button
            disabled={!slottime}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              slottime
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={bookappointment}
          >
            Confirm
          </button>
        </div>
      </div>

      {/* related docs */}
      <Relateddoc docid={docId} speciality={docinfo.speciality} />
    </div>
  );
};

export default Appointments;
