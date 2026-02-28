const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();
const zod = require("zod");
const { de } = require("zod/v4/locales");
// console.log("admin router");

const schema = zod.object({
  title: zod.string(),
  description: zod.string(),
  imageLink: zod.string(),
  price: zod.number(),
});

router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  // check if a user with this username already exists
  const existingAdmin = await Admin.findOne({
    username: username,
    password: password,
  });

  //   console.log(existingAdmin);

  if (existingAdmin) {
    return res.status(400).json({
      msg: "admin with this username already exists",
    });
  }

  await Admin.create({
    username: username,
    password: password,
  });

  res.json({
    message: "Admin created successfully",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  // zod

  const response = schema.safeParse({
    title,
    description,
    imageLink,
    price,
  });

  if (!response.success) {
    return res.status(400).json({
      msg: "Invalid course details",
    });
  }

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});

  res.json({
    courses: response,
  });
});

module.exports = router;
