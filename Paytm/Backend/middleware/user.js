const { User } = require("../db/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtPassword = process.env.JWT_SECRET;

async function userMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, jwtPassword);

    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "User doesnt exist",
    });
  }
}

module.exports = userMiddleware;
