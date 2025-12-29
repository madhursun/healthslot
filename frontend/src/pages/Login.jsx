import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { backendurl, token, settoken } = useContext(Appcontext);
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // SIGN UP
      if (state === "Sign Up") {
        const { data } = await axios.post(backendurl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          settoken(data.token);
          toast.success("Account created successfully");
        } else {
          toast.error(data.message);
        }
        return;
      }

      // LOGIN
      if (state === "Login") {
        const { data } = await axios.post(backendurl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          settoken(data.token);
          toast.success("Logged in successfully");
        } else {
          toast.error(data.message);
        }
        return;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h1>
          <p className="text-gray-600 mt-2">
            {state === "Sign Up"
              ? "Sign up to book an appointment"
              : "Log in to book an appointment"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name field (only for Sign Up) */}
          {state === "Sign Up" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors duration-300"
          >
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Sign Up / Login */}
        <p className="mt-6 text-center text-gray-600">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-teal-600 font-semibold hover:underline"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
