import express from "express";
import {
  appointmentcancel,
  appointmentcomplete,
  appointmentdoc,
  docdashboard,
  docprofile,
  docprofileupdate,
  doctorlist,
  logindoctor,
} from "../controllers/docController.js";
import authdoctor from "../middleware/authdoctor.js";

const Docrouter = express.Router();

Docrouter.get("/list", doctorlist);
Docrouter.post("/login", logindoctor);
Docrouter.get("/appointments", authdoctor, appointmentdoc);
Docrouter.post("/complete-appointment", authdoctor, appointmentcomplete);
Docrouter.post("/cancel-appointment", authdoctor, appointmentcancel);
Docrouter.get("/dashboard", authdoctor, docdashboard);
Docrouter.get("/profile", authdoctor, docprofile);
Docrouter.post("/update-profile", authdoctor, docprofileupdate);
export default Docrouter;
