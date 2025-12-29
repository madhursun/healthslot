import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Contact <span className="text-teal-600">Us</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Get in touch with HealthSlot for any inquiries, support, or career
          opportunities.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={assets.contact_image}
            alt="Contact HealthSlot"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Office Info */}
        <div className="md:w-1/2 space-y-4 text-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Office
          </h2>
          <p className="text-gray-600">PUNE, XYZ Area</p>
          <p className="text-gray-600">Tel: (7897) 5464-5464</p>
          <p className="text-gray-600">Email: contact@healthslot.com</p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Careers
            </h3>
            <p className="text-gray-600 mb-4">
              Join our team and be part of transforming healthcare.
            </p>
            <button className="px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors duration-300 shadow-md hover:shadow-lg">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
