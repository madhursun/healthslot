import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAtoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [doctors, setdoctors] = useState([]);
  const [appointments, setappointments] = useState([]);
  const [dashdata, setdashdata] = useState(false);
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const getallDocs = async () => {
    // function to get all doctors

    try {
      const { data } = await axios.post(
        backendurl + "/api/admin/all-doctors",
        {},
        {
          headers: { atoken },
        }
      );

      if (data.success) {
        setdoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const changeavailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/admin/change-availability",
        { docId },
        {
          headers: { atoken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getallDocs();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  //get all apppointments
  const getallappointments = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/admin/appointments", {
        headers: { atoken },
      });

      if (data.success) {
        console.log(data);
        setappointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const cancelAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/admin/cancel-appointments",
        { appointmentId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getallappointments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getdashdata = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/admin/dashboard", {
        headers: { atoken },
      });
      if (data.success) {
        setdashdata(data.dashdata);
        console.log(data.dashdata);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const value = {
    atoken,
    setAtoken,
    backendurl,
    doctors,
    getallDocs,
    changeavailability,
    getallappointments,
    appointments,
    cancelAppointments,
    dashdata,
    getdashdata,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
