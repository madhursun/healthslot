import validator from "validator";
import bcrypt from "bcrypt";
import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import DocModel from "../models/docmodel.js";
import appointmentModel from "../models/appointmentmodel.js";
import razorpay from "razorpay";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "missing Details" });
    }
    //valid email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }

    //valid pass
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter strong password" });
    }
    //hashing pass
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashpassword,
    };

    const newUser = new usermodel(userData);

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// api for user login
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "user does not exist" });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (ismatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.status(500).json({ success: false, message: "invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// api to get user profile data
const getprofile = async (req, res) => {
  try {
    const userid = req.userId;
    const userData = await usermodel.findById(userid).select("-password");
    const user = userData.toObject();
    user.address = user.address || { line1: "", line2: "" };

    res.json({ success: true, userData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//api to update user profile

const updateprofile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userid = req.userId;
    const imagefile = req.file;

    if (!name || !gender || !dob || !phone) {
      return res.json({ success: false, message: "data missing" });
    }
    await usermodel.findByIdAndUpdate(userid, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imagefile) {
      const imageupload = await cloudinary.uploader.upload(imagefile.path, {
        resource_type: "image",
      });
      const imageurl = imageupload.secure_url;

      await usermodel.findByIdAndUpdate(userid, { image: imageurl });
    }
    // if (req.body.removeImage === "true") {
    //   await usermodel.findByIdAndUpdate(userid, { image: "" });
    // }

    res.json({ success: true, message: "user update succesfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// api to book appointment

const bookappointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId; // ← Correct userId

    const docData = await DocModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "doctor not available" });
    }
    let slots_book = docData.slots_book || {};

    if (slots_book[slotDate]) {
      if (slots_book[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slot not available" });
      } else {
        slots_book[slotDate].push(slotTime);
      }
    } else {
      slots_book[slotDate] = [];
      slots_book[slotDate].push(slotTime);
    }

    const userData = await usermodel.findById(userId).select("-password");

    const docInfo = docData.toObject();
    delete docInfo.slots_book;

    const appointmentdata = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newappointment = new appointmentModel(appointmentdata);
    await newappointment.save();

    //save new slot

    await DocModel.findByIdAndUpdate(docId, { slots_book });

    res.json({ success: true, message: "appointment booked" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//api to get user appointmetns

const listappointments = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });
    res.json({
      success: true,
      appointments,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// to cancel appoi

const cancelappointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentdata = await appointmentModel.findById(appointmentId);

    if (!appointmentdata) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Fix ObjectId compare
    if (appointmentdata.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

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

// api for payment

const razorpayinstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazor = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentdata = await appointmentModel.findById(appointmentId);
    if (!appointmentdata || appointmentdata.cancelled) {
      return res.json({ success: false, message: "not found" });
    }
    const options = {
      amount: appointmentdata.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    //order creation
    const order = await razorpayinstance.orders.create(options);

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//verify payment

const verifypay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderinfo = await razorpayinstance.orders.fetch(razorpay_order_id);
    console.log(orderinfo);
    if (orderinfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderinfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successfull" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  registerUser,
  loginuser,
  getprofile,
  updateprofile,
  bookappointment,
  listappointments,
  cancelappointment,
  paymentRazor,
  verifypay,
};
