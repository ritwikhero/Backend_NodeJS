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
// have to add apis for transcations
// const mongoose = require('mongoose');
// const Account = require('./path-to-your-account-model');

// const transferFunds = async (fromAccountId, toAccountId, amount) => {
//     // Decrement the balance of the fromAccount
// 	  await Account.findByIdAndUpdate(fromAccountId, { $inc: { balance: -amount } });

//     // Increment the balance of the toAccount
//     await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
// }

// // Example usage
// transferFunds('fromAccountID', 'toAccountID', 100);

module.exports = userMiddleware;
