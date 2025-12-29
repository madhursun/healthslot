import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="text-white px-6 md:px-12 lg:px-20 py-12">
      {/* Top sections */}
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-8">
        {/* Left Section */}
        <div className="flex-[3] space-y-4">
          <img src={assets.logoproject} alt="" className="w-32" />
          <p className="text-gray-500 text-sm md:text-base">
            HealthSlot is your trusted platform for booking appointments with
            top doctors. We connect you with experienced healthcare
            professionals across various specialties, ensuring you receive the
            best care possible.
          </p>
        </div>

        {/* Mid Section */}
        <div className="flex-1">
          <p className="font-semibold text-gray-500 mb-4">Company</p>
          <ul className="space-y-2 text-gray-500 text-sm md:text-base">
            {["Home", "About Us", "Contact Us", "Privacy Policy"].map(
              (item, i) => (
                <li
                  key={i}
                  className="hover:text-teal-500 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <p className="font-semibold text-gray-500 mb-4">Get in Touch</p>
          <ul className="space-y-2 text-gray-500 text-sm md:text-base">
            <li>+91 987654321</li>
            <li>healthslot@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-4">
        <p>© 2025 HealthSlot. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
