const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const zod = require("zod");
dotenv.config();
const jwtPassword = process.env.JWT_SECRET;

router.get("/balance", userMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    return res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

//without transaction
// router.post("/transfer", userMiddleware, async (req, res) => {
//   try {
//     const { amount, to } = req.body;

//     const account = await Account.findOne({
//       userId: req.userId,
//     });

//     if (amount > account.balance) {
//       return res.status(400).json({
//         message: "Insufficient balance",
//       });
//     }

//     const toAccount = await Account.findOne({
//       userId: to,
//     });

//     if (!toAccount) {
//       return res.status(404).json({
//         message: "Receiver account not found",
//       });
//     }

//     await Account.updateOne(
//       {
//         userId: req.userId,
//       },
//       {
//         $inc: {
//           balance: -amount,
//         },
//       },
//     );

//     await Account.updateOne(
//       {
//         userId: to,
//       },
//       {
//         $inc: {
//           balance: amount,
//         },
//       },
//     );

//     return res.status(200).json({
//       message: "Transfer successful",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// });

//optimal way using transaction
router.post("/transfer", userMiddleware, async (req, res) => {
  try {
    const { amount, to } = req.body;

module.exports = router;
