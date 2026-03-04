const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtPassword = process.env.JWT_SECRET;

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({
      username: username,
      password: password,
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    await User.create({
      username,
      password,
    });

    return res.status(200).json({
      msg: "User created successfully",
    });
    ``;
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({
      username: username,
      password: password,
    });

    if (!existingUser) {
      return res.status(400).json({
        msg: "User doesnt exist",
      });
    }

    const token = jwt.sign({ username, password }, process.env.JWT_SECRET);
    return res.json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        msg: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtPassword);

    if (!decoded) {
      return res.status(403).json({
        msg: "Invalid authorization token",
      });
    }
    const course = await Course.find({});
    return res.json({
      course,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  try {
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const password = req.headers.password;

    const userExists = User.findOne({
      username: username,
      password: password,
    });

    if (!userExists) {
      return res.status(400).json({
        msg: "User doesnt exist",
      });
    }

    await User.updateOne(
      {
        username: username,
      },
      {
        $push: {
          purchasedCourses: courseId,
        },
      },
    );
    res.json({
      message: "Purchase complete!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const username = req.headers.username;
    const password = req.headers.password;
    const user = await User.findOne({
      username: username,
      password: password,
    });
    const courses = await Course.find({
      _id: {
        $in: user.purchasedCourses,
      },
    });

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
