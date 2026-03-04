const { User } = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtPassword = process.env.JWT_SECRET;
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        msg: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtPassword);

    const user = await User.findOne({
      username: decoded.username,
      password: decoded.password,
    });

    if (!user) {
      return res.status(403).json({
        msg: "User doesnt exist",
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      msg: "User doesnt exist",
    });
  }
}

module.exports = userMiddleware;
