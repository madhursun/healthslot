import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // ✅ loads .env variables

const authadmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;

    // ✅ Check for missing token
    if (!atoken) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });
    }

    // ✅ Verify token using secret
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    // ✅ Check admin email from decoded payload
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    // ✅ Optionally attach decoded data to request
    req.admin = decoded;

    next(); // ✅ Continue to route handler
  } catch (error) {
    console.error("Auth Admin Middleware Error:", error.message);
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authadmin;
