const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const zod = require("zod");
dotenv.config();
const jwtPassword = process.env.JWT_SECRET;

//User routes

const signupBody = zod.object({
  username: zod.email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinBody = zod.object({
  username: zod.email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const { success } = signupBody.safeParse({
      username,
      password,
      firstName,
      lastName,
    });

    if (!success) {
      return res.status(411).json({
        message: "Invalid inputs",
      });
    }

    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
    });

    const userId = user._id;
    const token = jwt.sign({ userId }, jwtPassword);

    return res.status(200).json({
      message: "User created successfully",
      token,
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

    const { success } = signinBody.safeParse({
      username,
      password,
    });

    if (!success) {
      return res.status(411).json({
        message: "Invalid inputs",
      });
    }

    const existingUser = await User.findOne({
      username,
      password,
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userId = existingUser._id;
    const token = jwt.sign({ userId }, jwtPassword);

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

router.put("/update", userMiddleware, async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        message: "Invalid inputs",
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No fields to update",
      });
    }

    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $set: req.body,
      },
    );
    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/search", userMiddleware, async (req, res) => {
  try {
    const { filter } = req.query;
    if (!filter) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const name = new RegExp(filter, "i");
    const users = await User.find({
      $or: [
        { firstName: { $regex: name } },
        { lastName: { $regex: name } },
        { username: { $regex: name } },
      ],
    });

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Users found successfully",
      user: users.map((user) => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      })),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
