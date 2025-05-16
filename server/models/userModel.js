const mongoose = require("mongoose");
const validator = require("validator");

const UserScheam = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [validator.isEmail, "field must be a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  verified: { type: Boolean, default: false },
  emailVerificationOtp: {
    type: String,
  },
  emailVerificationOtpExpires: {
    type: Date,
  },
  resetPasswordOTP: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
});

module.exports = mongoose.model("User", UserScheam);