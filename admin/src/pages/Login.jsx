import React, { useState, useContext } from "react";
import { AdminContext } from "../context/admincon";
import axios from "axios";
import { toast } from "react-toastify";
import { DocContext } from "../context/docCon";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAtoken, backendurl } = useContext(AdminContext);
  const { setdtoken } = useContext(DocContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendurl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setAtoken(data.token);
          toast.success("Admin Login Successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dtoken", data.token);
          setdtoken(data.token);
          console.log(data.token);
          toast.success("Doctor Login Successful");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-sm mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg border border-teal-100"
    >
      <p className="text-3xl font-semibold text-center text-teal-700 mb-6">
        <span className="text-teal-500">{state}</span> Login
      </p>

      {/* Email */}
      <div className="mb-5">
        <p className="text-gray-700 font-medium mb-1">Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="Enter your email"
          required
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-300 transition"
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <p className="text-gray-700 font-medium mb-1">Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          required
          placeholder="Enter your password"
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-300 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition"
      >
        {state === "Admin" ? "Login as Admin" : "Login as Doctor"}
      </button>

      <p className="text-center mt-4 text-sm text-gray-600">
        {state === "Admin" ? (
          <>
            Want Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-teal-600 font-semibold cursor-pointer"
            >
              Click here
            </span>
          </>
        ) : (
          <>
            Want Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-teal-600 font-semibold cursor-pointer"
            >
              Click here
            </span>
          </>
        )}
      </p>
    </form>
  );
};

export default Login;
