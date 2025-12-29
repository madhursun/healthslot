import React, { useContext, useState } from "react";
import { Appcontext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Myprofile = () => {
  const { userdata, setuserdata, token, backendurl, loaduserdata } =
    useContext(Appcontext);

  const [isedit, setisedit] = useState(false);
  const [image, setimage] = useState(false);

  const updateprofile = async () => {
    try {
      const formdata = new FormData();

      formdata.append("name", userdata.name);
      formdata.append("phone", userdata.phone);
      formdata.append("address", JSON.stringify(userdata.address));
      formdata.append("gender", userdata.gender);
      formdata.append("dob", userdata.dob);

      image && formdata.append("image", image);

      const { data } = await axios.post(
        backendurl + "/api/user/update-profile",
        formdata,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loaduserdata();
        setisedit(false);
        setimage(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSave = () => {
    setisedit(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <div className="flex flex-col items-center mb-4 w-full">
        {isedit ? (
          <label
            htmlFor="image"
            className="relative cursor-pointer group mx-auto"
          >
            <img
              src={image ? URL.createObjectURL(image) : userdata.image}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border shadow-md mx-auto"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition">
              <img
                src={assets.upload_icon}
                alt="upload"
                className="w-8 h-8 invert"
              />
            </div>

            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setimage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            src={userdata.image}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border shadow-md mx-auto"
          />
        )}
      </div>

      <div className="flex flex-col items-center">
        {isedit ? (
          <input
            type="text"
            value={userdata.name}
            onChange={(e) =>
              setuserdata((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
          />
        ) : (
          <h2 className="text-xl font-semibold mb-2">{userdata.name}</h2>
        )}

        <p className="text-gray-500 mb-4">{userdata.email}</p>

        <div className="w-full space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Phone:</span>
            {isedit ? (
              <input
                type="text"
                value={userdata.phone}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border rounded px-2 py-1 text-sm"
              />
            ) : (
              <span>{userdata.phone}</span>
            )}
          </div>

          <div className="flex justify-between">
            <span>Gender:</span>
            {isedit ? (
              <select
                value={userdata.gender}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border rounded px-2 py-1 text-sm"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <span>{userdata.gender}</span>
            )}
          </div>

          <div className="flex justify-between">
            <span>Date of Birth:</span>
            {isedit ? (
              <input
                type="date"
                value={userdata.dob.split("T")[0]}
                onChange={(e) =>
                  setuserdata((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border rounded px-2 py-1 text-sm"
              />
            ) : (
              <span>{userdata?.dob?.split("T")[0]}</span>
            )}
          </div>

          <div className="flex flex-col mt-2">
            <span className="font-medium">Address:</span>
            {isedit ? (
              <>
                <input
                  type="text"
                  value={userdata.address.line1}
                  onChange={(e) =>
                    setuserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="border rounded px-2 py-1 text-sm mt-1"
                />
                <input
                  type="text"
                  value={userdata.address.line2}
                  onChange={(e) =>
                    setuserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="border rounded px-2 py-1 text-sm mt-1"
                />
              </>
            ) : (
              <p>
                {userdata?.address?.line1 || ""} <br />
                {userdata?.address?.line2 || ""}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => (isedit ? updateprofile() : setisedit(true))}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
        >
          {isedit ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Myprofile;
