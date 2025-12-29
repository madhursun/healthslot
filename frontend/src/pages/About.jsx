import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          About <span className="text-teal-600">US</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Learn more about HealthSlot, our mission, vision, and commitment to
          providing top-quality healthcare services to our patients.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={assets.about_image}
            alt="About HealthSlot"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 space-y-4 text-gray-700">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-gray-800">HealthSlot</span>,
            your trusted platform for booking appointments with top doctors in
            your city. We aim to make healthcare accessible, convenient, and
            reliable for everyone.
          </p>

          <p>
            At HealthSlot, we are committed to excellence. Our platform connects
            patients with certified healthcare professionals and ensures a
            seamless appointment experience, saving your time and effort.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Our Vision
            </h2>
            <p>
              Our vision at HealthSlot is to revolutionize healthcare
              accessibility by providing an intuitive platform that empowers
              patients to manage their health effectively. We strive to ensure
              that quality medical care is just a few clicks away, anytime and
              anywhere.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h2>
            <p>
              Our mission is to simplify the appointment booking process, foster
              trust between patients and doctors, and enhance the overall
              healthcare experience. We believe that timely access to medical
              expertise can improve lives, and HealthSlot is here to make that
              possible.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Us</h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Efficiency */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex-1 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              Efficiency
            </h3>
            <p className="text-gray-600 text-sm">
              Book appointments quickly with minimal effort.
            </p>
          </div>

          {/* Convenience */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex-1 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              Convenience
            </h3>
            <p className="text-gray-600 text-sm">
              Access top doctors anytime, from anywhere.
            </p>
          </div>

          {/* Personalization */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex-1 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">
              Personalization
            </h3>
            <p className="text-gray-600 text-sm">
              Tailored recommendations to suit your health needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
