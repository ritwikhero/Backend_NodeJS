// Middleware for handling auth
const { Admin } = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtPassword = process.env.JWT_SECRET;
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        msg: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, jwtPassword);

    const admin = await Admin.findOne({
      username: decoded.username,
      password: decoded.password,
    });

    if (!admin) {
      return res.status(403).json({
        msg: "Admin doesnt exist",
      });
    }

    next();
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
}

module.exports = adminMiddleware;
