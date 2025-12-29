import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // ✅ loads .env variables

const authdoctor = (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    // ✅ Check for missing token
    if (!dtoken) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });
    }

    // ✅ Verify token using secret
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.docId = decoded.id;

    next(); // ✅ Continue to route handler
  } catch (error) {
    console.error("Auth Admin Middleware Error:", error.message);
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authdoctor;
