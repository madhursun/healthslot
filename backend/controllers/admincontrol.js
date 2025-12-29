import validator from "validator";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";

import DocModel from "../models/docmodel.js";
import appointmentModel from "../models/appointmentmodel.js";
import usermodel from "../models/usermodel.js";

const adddoc = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const image = req.file;

    // ✅ Check for missing fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !image
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // ✅ Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email address" });
    }
    const existingDoctor = await DocModel.findOne({ email });
    if (existingDoctor) {
      return res.json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }

    // ✅ Password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Upload image to Cloudinary
    // const uploadResult = await cloudinary.uploader.upload(image.path, {
    //   resource_type: "image",
    //   folder: "doctors",
    // });

    // console.log("Cloudinary object:", cloudinary);
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      folder: "doctors",
    });

    const imageUrl = uploadResult.secure_url;

    // ✅ Parse address safely (if needed)
    let formattedAddress = address;
    if (typeof address === "string") {
      try {
        formattedAddress = JSON.parse(address);
      } catch {
        formattedAddress = { line1: address }; // fallback
      }
    }

    // ✅ Prepare doctor data
    const docData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: formattedAddress,
      image: imageUrl,
      available: true,
      date: Date.now(),
    };

    // ✅ Save to MongoDB
    const newDoctor = new DocModel(docData);
    await newDoctor.save();

    res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Add Doctor Error:", error.message, error.stack);

    res.status(500).json({ success: false, message: error.message });
  }
};

//api for login admin
const loginadmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // Create a token payload and sign it
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    // Return the token in a single response
    return res
      .status(200)
      .json({ success: true, message: "Login Successful", token });
  } catch (error) {
    console.error("Admin Login Error:", error.message, error.stack);

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// api to get all doc for admin panel

const alldoctors = async (req, res) => {
  try {
    const doctors = await DocModel.find({}).select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Fetch Doctors Error:", error.message, error.stack);

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//api to get all appointment list

const appointmentAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//api to cancel appointment from admin
const appointmentcancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentdata = await appointmentModel.findById(appointmentId);

    if (!appointmentdata) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Fix ObjectId compare

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentdata;

    const doctorData = await DocModel.findById(docId);
    let slots_book = doctorData.slots_book;

    // Prevent crash if date not in slots_book
    if (slots_book[slotDate]) {
      slots_book[slotDate] = slots_book[slotDate].filter((e) => e !== slotTime);
    }

    await DocModel.findByIdAndUpdate(docId, { slots_book });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (err) {
    console.error("CANCEL ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//api to display admin dashboard data
const admindashboard = async (req, res) => {
  try {
    const doctors = await DocModel.find({});
    const user = await usermodel.find({});
    const appointments = await appointmentModel.find({});

    const dashdata = {
      doctors: doctors.length,
      patients: user.length,
      appointments: appointments.length,
      latestappointments: appointments.reverse().slice(0, 5),
    };
    res.status(200).json({ success: true, dashdata });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  adddoc,
  loginadmin,
  alldoctors,
  appointmentAdmin,
  appointmentcancel,
  admindashboard,
};
