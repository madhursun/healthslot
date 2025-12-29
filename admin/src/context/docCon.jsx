import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DocContext = createContext();

const DocContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [dtoken, setdtoken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : null
  );
  const [appointments, setappointments] = useState([]);

  const [dashdata, setdashdata] = useState(false);
  const [profiledata, setprofiledata] = useState(null);

  const getappointments = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/doctor/appointments",
        {
          headers: { dtoken },
        }
      );

      if (data.success) {
        setappointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const completeappointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/doctor/complete-appointment",
        { appointmentId }, // ✅ ONLY appointmentId
        {
          headers: { dtoken }, // ✅ token only
        }
      );

      if (data.success) {
        toast.success(data.message);
        getappointments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const cancelappointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: { dtoken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getappointments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Cancel failed");
    }
  };

  const getdashdata = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/dashboard", {
        headers: { dtoken },
      });
      if (data.success) {
        setdashdata(data.dashdata);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const getprofiledata = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/profile", {
        headers: { dtoken },
      });
      if (data.success) {
        setprofiledata(data.doctorprofile);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const value = {
    dtoken,
    setdtoken,
    backendurl,
    getappointments,
    appointments,
    setappointments,
    completeappointment,
    cancelappointment,
    dashdata,
    getdashdata,
    setdashdata,
    profiledata,
    getprofiledata,
    setprofiledata,
  };

  return (
    <DocContext.Provider value={value}>{props.children}</DocContext.Provider>
  );
};

export default DocContextProvider;
