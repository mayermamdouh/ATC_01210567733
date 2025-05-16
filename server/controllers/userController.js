const User = require("../models/userModel");
const asyncWrapper = require("../middlewares/asyncWrapper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  const findTheSameEmail = await User.findOne({ email: email });
  if (findTheSameEmail) {
    const error = AppError.create("User already exists", 400, "fail");
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  const expiresIn = newUser.role === "ADMIN" ? "7d" : "1d";
  const token = jwt.sign(
    { email: newUser.email, id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn }
  );
  newUser.token = token;
  await newUser.save();

  const {
    password: hashedPasswordField,
    registerData,
    __v,
    ...userData
  } = newUser._doc;

  res.status(201).json({ status: "success", data: { user: userData } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = AppError.create("Email and password required", 400, "fail");
    return next(error);
  }
  const user = await User.findOne({ email });
  if (!user) {
    const error = AppError.create("You don't have an account.", 401, "fail");
    return next(error);
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  const expiresIn = user.role === "ADMIN" ? "7d" : "1d";
  let token = jwt.sign(
    { email: user.email, id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn }
  );

  if (user && matchPassword) {
    return res.status(200).json({
      status: "success",
      data: { token: token },
    });
  } else {
    const error = AppError.create(
      "Email or password are uncorrect",
      401,
      "fail"
    );
    return next(error);
  }
});

module.exports = {
  register,
  login,
};
