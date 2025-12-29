import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { AdminContext } from "../../context/admincon";
import { toast } from "react-toastify";
import axios from "axios";

const Adddoc = () => {
  const [docimg, setDocimg] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [experience, setexperience] = useState("1 year");
  const [fees, setfees] = useState("");
  const [speciality, setspeciality] = useState("General Physician");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [about, setabout] = useState("");
  const [degree, setdegree] = useState("");

  const { backendurl, atoken } = useContext(AdminContext);

  const onsubmithandle = async (e) => {
    e.preventDefault();
    try {
      if (!docimg) {
        return toast.error("Please upload doctor's image");
      }

      const formdata = new FormData();
      formdata.append("image", docimg);
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("experience", experience);
      formdata.append("fees", fees);
      formdata.append("speciality", speciality);
      formdata.append(
        "address",
        JSON.stringify({
          line1: address1,
          line2: address2,
        })
      );
      formdata.append("about", about);
      formdata.append("degree", degree);

      //
      formdata.forEach((value, key) => {
        console.log(key + ": " + value);
      });

      const { data } = await axios.post(
        backendurl + "/api/admin/add-doc",
        formdata,
        {
          headers: { atoken },
        }
      );
      if (data.success) {
        toast.success("Doctor added successfully");
        setDocimg(false);
        setname("");
        setemail("");
        setpassword("");
        setfees("");
        setaddress1("");
        setaddress2("");
        setabout("");
        setdegree("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <form
      onSubmit={onsubmithandle}
      className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-teal-100 mt-6"
    >
      {/* Title */}
      <p className="text-3xl font-semibold text-teal-700 mb-6">Add Doctor</p>

      {/* First Row: Upload + Basic Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Upload small box */}
        <div className="flex flex-col items-start">
          <label
            htmlFor="doc-img"
            className="cursor-pointer border border-dashed border-teal-300 p-4 rounded-xl bg-teal-50/30 hover:bg-teal-50 transition"
          >
            <img
              src={docimg ? URL.createObjectURL(docimg) : assets.upload_area}
              className="w-20 opacity-80"
            />
          </label>
          <input
            onChange={(e) => setDocimg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />

          <p className="text-gray-600 mt-2 text-xs">
            Upload photo <span className="text-teal-600">(max 2MB)</span>
          </p>
        </div>

        {/* Basic Details */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-medium text-gray-700 mb-1">Doctor Name</p>
            <input
              onChange={(e) => setname(e.target.value)}
              value={name}
              className="w-full p-2 border rounded-lg"
              placeholder="Full name"
            />
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-1">Email</p>
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              className="w-full p-2 border rounded-lg"
              placeholder="Email"
            />
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-1">Password</p>
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type="password"
              className="w-full p-2 border rounded-lg"
              placeholder="Password"
            />
          </div>
        </div>
      </div>

      {/* Second Row: Experience / Fees / Speciality / Education */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div>
          <p className="font-medium text-gray-700 mb-1">Experience</p>
          <select
            onChange={(e) => setexperience(e.target.value)}
            value={experience}
            className="w-full p-2 border rounded-lg"
          >
            <option>1 year</option>
            <option>2 years</option>
            <option>3 years</option>
            <option>4 years</option>
            <option>5 years</option>
            <option>6 years</option>
            <option>7 years</option>
            <option>8 years</option>
            <option>9 years</option>
            <option>10+ years</option>
          </select>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-1">Fees</p>
          <input
            onChange={(e) => setfees(e.target.value)}
            value={fees}
            className="w-full p-2 border rounded-lg"
            type="number"
            placeholder="Fee amount"
          />
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-1">Speciality</p>
          <select
            onChange={(e) => {
              setspeciality(e.target.value);
            }}
            value={speciality}
            className="w-full p-2 border rounded-lg"
          >
            <option>General Physician</option>
            <option>Neurologist</option>
            <option>Dermatologist</option>
            <option>Gynecologist</option>
            <option>Pediatrician</option>
            <option>Gastroenterologist</option>
          </select>
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-1">Education</p>
          <input
            onChange={(e) => setdegree(e.target.value)}
            value={degree}
            className="w-full p-2 border rounded-lg"
            placeholder="Degree"
          />
        </div>
      </div>

      {/* Third Row: Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <p className="font-medium text-gray-700 mb-1">Address Line 1</p>
          <input
            onChange={(e) => setaddress1(e.target.value)}
            value={address1}
            className="w-full p-2 border rounded-lg"
            placeholder="Address 1"
          />
        </div>

        <div>
          <p className="font-medium text-gray-700 mb-1">Address Line 2</p>
          <input
            onChange={(e) => setaddress2(e.target.value)}
            value={address2}
            className="w-full p-2 border rounded-lg"
            placeholder="Address 2"
          />
        </div>
      </div>

      {/* About SMALL field */}
      <div className="mt-6">
        <p className="font-medium text-gray-700 mb-1">About</p>
        <textarea
          onChange={(e) => setabout(e.target.value)}
          value={about}
          rows="3"
          className="w-full p-2 border rounded-lg"
          placeholder="Short description"
        ></textarea>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default Adddoc;
