const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.zqnhm2y.mongodb.net/paytm?retryWrites=true&w=majority`,
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//schemas

// const UserSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   password: String,
// });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
