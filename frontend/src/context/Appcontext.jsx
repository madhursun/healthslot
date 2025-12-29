import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const Appcontext = createContext();

const AppcontextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const currencysymbol = "$";
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [userdata, setuserdata] = useState(false);

  const getDoc = async (res, req) => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [token, settoken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const loaduserdata = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/getprofile", {
        headers: { token },
      });

      if (data.success) {
        setuserdata(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const value = {
    doctors,
    currencysymbol,
    backendurl,
    token,
    settoken,
    userdata,
    setuserdata,
    loaduserdata,
    getDoc,
  };

  useEffect(() => {
    getDoc();
  }, []);

  useEffect(() => {
    if (token) {
      loaduserdata();
    } else {
      setuserdata(false);
    }
  }, [token]);

  return (
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};

export default AppcontextProvider;
