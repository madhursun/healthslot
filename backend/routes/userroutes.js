import express from "express";

import {
  bookappointment,
  cancelappointment,
  getprofile,
  listappointments,
  loginuser,
  paymentRazor,
  registerUser,
  updateprofile,
  verifypay,
} from "../controllers/userController.js";
import authuser from "../middleware/authuser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginuser);
userRouter.get("/getprofile", authuser, getprofile);
userRouter.post(
  "/update-profile",
  authuser,
  upload.single("image"),
  updateprofile
);

userRouter.post("/book-appointment", authuser, bookappointment);
userRouter.get("/appointments", authuser, listappointments);
userRouter.post("/cancel-appointment", authuser, cancelappointment);
userRouter.post("/payment-razorpay", authuser, paymentRazor);
userRouter.post("/verifyrazorpay", authuser, verifypay);

export default userRouter;
