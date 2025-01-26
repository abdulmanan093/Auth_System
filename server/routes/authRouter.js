const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const {
  validateSignup,
  validateLogin,
} = require("../middlewares/authValidation");
const {
  signupUser,
  loginUser,
  logout,
} = require("../controllers/authController");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});


router.post("/signup", validateSignup, signupUser);

router.post("/login", loginLimiter, validateLogin, loginUser);

router.get("/logout", logout);

module.exports = router;
