import express from "express";

import {
  adddoc,
  admindashboard,
  alldoctors,
  appointmentAdmin,
  appointmentcancel,
  loginadmin,
} from "../controllers/admincontrol.js";
import upload from "../middleware/multer.js";
import authadmin from "../middleware/authadmin.js";
import { changeavailability } from "../controllers/docController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doc", authadmin, upload.single("image"), adddoc);

adminRouter.post("/login", loginadmin);
adminRouter.post("/all-doctors", authadmin, alldoctors);
adminRouter.post("/change-availability", authadmin, changeavailability);
adminRouter.get("/appointments", authadmin, appointmentAdmin);
adminRouter.post("/cancel-appointments", authadmin, appointmentcancel);
adminRouter.get("/dashboard", authadmin, admindashboard);

export default adminRouter;
