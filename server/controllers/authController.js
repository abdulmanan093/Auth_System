const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "You already have an account, please login",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Your account has been created successfully. Please login.",
      success: true,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Email or Password incorrect", success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "Email or Password incorrect", success: false });
    }

    const token = generateToken(user);
    res.cookie("token", token);

    return res.status(200).json({
      message: "Login success",
      success: true,
      token,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
