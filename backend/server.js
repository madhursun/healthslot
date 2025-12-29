import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongo.js";

import adminRouter from "./routes/adminroute.js";
import Docrouter from "./routes/docroute.js";
import userRouter from "./routes/userroutes.js";

const app = express();

const PORT = process.env.PORT || 5000;
connectDB();
// connectCloudinary();

app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin", adminRouter);

app.use("/api/doctor", Docrouter);
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("HealthSlot Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
