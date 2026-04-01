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

router.post("/transfer", userMiddleware, async(req,res) =>{
    try {
        
        const 

    } catch (error) {
        
    }
});

module.exports = router;
