const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtPassword = process.env.JWT_SECRET;

//User routes

router.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    await User.create({
      username,
      password,
      firstName,
      lastName,
    });

    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({
      username,
      password,
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = jwt.sign({ username, password }, jwtPassword);

    return res.status(200).json({
      message: "User signed in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
