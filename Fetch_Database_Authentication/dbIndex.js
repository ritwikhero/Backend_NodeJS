const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const jwtPassword = "123456";
const app = express();
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.zqnhm2y.mongodb.net/user-app?retryWrites=true&w=majority`,
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const User = mongoose.model("User", {
  name: String,
  username: String,
  password: String,
});

async function userExists(username, password) {
  // should check in the database
  const userExist = await User.findOne({
    username: username,
    password: password,
  });
  return userExist;
}

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const exsistingUser = await userExists(username, password);

  if (exsistingUser) {
    return res.status(403).json({
      msg: "User already exists in our database",
    });
  }

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
    msg: "User created successfully",
  });
});

app.get("/users", async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username from the database
    const filteredUsers = await User.find({ username: { $ne: username } });
    res.json({ users: filteredUsers });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);
