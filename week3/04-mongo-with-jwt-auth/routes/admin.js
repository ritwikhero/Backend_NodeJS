const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const exisitingAdmin = await Admin.findOne({
    username,
    password,
  });

  if (exisitingAdmin) {
    return res.status(400).json({
      messages: "Admin already exists",
    });
  }

  await Admin.create({
    username,
    password,
  });
  return res.json({
    message: "Admin created successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const adminExist = await Admin.findOne({
    username,
    password,
  });

  if (!adminExist) {
    return res.status(400).json({
      msg: "Admin doesnt exist",
    });
  }

  const token = jwt.sign({ username, password }, process.env.JWT_SECRET);
  return res.status(200).json({
    token,
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic

  const { title, description, imageLink, price } = req.body;

  await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  return res.status(200).json({
    message: "Course created successfully",
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find({});
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
