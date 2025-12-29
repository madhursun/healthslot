import DocModel from "../models/docmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentmodel.js";
const changeavailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docdata = await DocModel.findById(docId);
    await DocModel.findByIdAndUpdate(docId, {
      available: !docdata.available,
    });
    res
      .status(200)
      .json({ success: true, message: "Doctor availability updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const doctorlist = async (req, res) => {
  try {
    const doctors = await DocModel.find({}).select(["-password", "-email"]);
    res
      .status(200)
      .json({ success: true, doctors, message: "Doctor list fetched" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// api for doclogin

const logindoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await DocModel.findOne({ email });
    if (!doctor) {
      return res
        .status(200)
        .json({ success: false, message: "Doctor not found" });
    }

    const ismatch = await bcrypt.compare(password, doctor.password);

    if (!ismatch) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//api for doc panel for appoi

const appointmentdoc = async (req, res) => {
  try {
    const doctorId = req.docId; // <-- USE VALUE FROM MIDDLEWARE

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID missing from auth",
      });
    }

    const appointments = await appointmentModel.find({ docId: doctorId });

    res.status(200).json({
      success: true,
      appointments,
      message: "Appointments fetched",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//api to mark appoinment as completed for doc panel

const appointmentcomplete = async (req, res) => {
  try {
    const doctorId = req.docId; // ✅ from auth middleware
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID required",
      });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId.toString() === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      return res.status(200).json({
        success: true,
        message: "Appointment completed",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Unauthorized or invalid appointment",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const appointmentcancel = async (req, res) => {
  try {
    const doctorId = req.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId.toString() === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      return res.status(200).json({
        success: true,
        message: "Appointment cancelled",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Cancel failed",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const docdashboard = async (req, res) => {
  try {
    const doctorId = req.docId;
    const appointments = await appointmentModel.find({ docId: doctorId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted && !item.payment) {
        earnings += item.amount;
      }
    });
    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashdata = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestappointments: appointments.slice(-5).reverse(),
    };
    res
      .status(200)
      .json({ success: true, dashdata, message: "Dashboard data fetched" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// api to get doc profile

const docprofile = async (req, res) => {
  try {
    const doctorId = req.docId;
    const doctorprofile = await DocModel.findById(doctorId).select("-password");
    res.status(200).json({
      success: true,
      doctorprofile,
      message: "Doctor profile fetched",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//api to update doc profile
const docprofileupdate = async (req, res) => {
  try {
    const doctorId = req.docId;
    const { fees, address, available } = req.body;
    await DocModel.findByIdAndUpdate(doctorId, {
      fees,
      address,
      available,
    });
    res.status(200).json({ success: true, message: "Doctor profile updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  changeavailability,
  doctorlist,
  logindoctor,
  appointmentdoc,
  appointmentcomplete,
  appointmentcancel,
  docdashboard,
  docprofile,
  docprofileupdate,
};
