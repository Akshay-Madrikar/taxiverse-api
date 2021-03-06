const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const User = require("../models/user");
require("dotenv").config();
const { sendWelcomeEmail } = require("../emails/account");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      email: req.body.user.email,
      password: req.body.user.password,
    });

    sendWelcomeEmail(user.email);

    await user.save();

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET
    );

    // persist the token as 't in cookie with expiry date
    res.cookie("t", token, {
      expire: new Date() + 999,
    });

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: "Email ID exists",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.user.email,
      req.body.user.password
    );
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET
    );

    // persist the token as 't in cookie with expiry date
    res.cookie("t", token, {
      expire: new Date() + 999,
    });

    const { _id, name, email, role, block_status } = user;

    if (block_status === 1) {
      return res.status(400).json({
        error: "User is blocked!!!",
      });
    }

    res.status(202).json({
      user: { _id, name, email, role },
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: "Email or password do not match",
    });
  }
};

exports.signout = async (req, res) => {
  try {
    res.clearCookie("t");
    res.status(200).json({
      message: "Signout sucess!",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.requiredSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(401).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(401).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};
