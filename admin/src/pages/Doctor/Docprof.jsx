import React, { useContext, useEffect, useState } from "react";
import { DocContext } from "../../context/docCon";
import { AppContext } from "../../context/appcon";
import axios from "axios";
import { toast } from "react-toastify";

const Docprof = () => {
  const { dtoken, backendurl, profiledata, setprofiledata, getprofiledata } =
    useContext(DocContext);
  const { currency } = useContext(AppContext);
  const [isediting, setIsEditing] = useState(false);

  const updateProfile = async () => {
    try {
      const updatedata = {
        fees: profiledata.fees,
        available: profiledata.available,
        address: profiledata.address,
      };
      const { data } = await axios.post(
        backendurl + "/api/doctor/update-profile",
        updatedata,
        {
          headers: { dtoken },
        }
      );
      if (data.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        getprofiledata();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (dtoken) {
      getprofiledata();
    }
  }, [dtoken]);

  if (!profiledata) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading profile...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <div className="text-center">
          <img
            src={profiledata.image}
            alt="Doctor"
            className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 mx-auto"
          />
          <p className="mt-3 text-sm text-gray-500">
            {profiledata.experience} experience
          </p>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            {profiledata.name}
          </h2>

          <p className="text-gray-600 mt-1">
            {profiledata.degree} · {profiledata.speciality}
          </p>

          {/* About */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">About</h3>
            <p className="text-gray-600 text-sm mt-1">
              {profiledata.about || "No description provided"}
            </p>
          </div>

          {/* Fees */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Consultation Fees</p>
              {isediting ? (
                <input
                  type="number"
                  value={profiledata.fees}
                  onChange={(e) =>
                    setprofiledata((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  className="w-full mt-1 p-2 border rounded-xl"
                />
              ) : (
                <p className="text-lg font-semibold text-teal-600">
                  {currency}
                  {profiledata.fees}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-2">
              <input
                type="checkbox"
                checked={profiledata.available}
                disabled={!isediting}
                onChange={() =>
                  setprofiledata((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                className="accent-teal-600"
              />
              <span className="text-gray-700">Available for appointments</span>
            </div>
          </div>

          {/* Address */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Address</h3>

            {isediting ? (
              <>
                <input
                  type="text"
                  value={profiledata.address?.line1 || ""}
                  onChange={(e) =>
                    setprofiledata((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  className="w-full mt-2 p-2 border rounded-xl"
                />

                <input
                  type="text"
                  value={profiledata.address?.line2 || ""}
                  onChange={(e) =>
                    setprofiledata((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  className="w-full mt-2 p-2 border rounded-xl"
                />
              </>
            ) : (
              <p className="text-gray-600 text-sm mt-1">
                {profiledata.address?.line1}
                <br />
                {profiledata.address?.line2}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            {isediting ? (
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docprof;
