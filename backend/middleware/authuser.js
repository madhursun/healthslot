import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // ✅ loads .env variables

const authuser = (req, res, next) => {
  try {
    const { token } = req.headers;

    // ✅ Check for missing token
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });
    }

    // ✅ Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next(); // ✅ Continue to route handler
  } catch (error) {
    console.error("Auth Admin Middleware Error:", error.message);
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authuser;
