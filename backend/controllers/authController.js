import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

import Admin from "../models/admin.js";
import Student from "../models/student.js";

import { JWT_SCRET } from "../config/config.js";
// admin login

export const adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin || !(await admin.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const expiresIn = 5 * 60 * 1000; // 5 minutes

  // sign jwt
  const token = jwt.sign({ _id: admin._id }, JWT_SCRET, { expiresIn });
  // set cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    maxAge: expiresIn * 1000,
  });

  res.status(200).json({
    status: "success",
    message: "Login successful",
    token,
  });
});

// student login

export const studentLogin = catchAsync(async (req, res, next) => {
  const { full_name, password } = req.body;

  const student = await Student.findOne({ full_name });

  if (!student || password !== student.password) {
    throw new AppError("Invalid student name or password", 401);
  }

  const expiresIn = 5 * 60 * 1000; // 5 minutes

  // sign jwt
  const token = jwt.sign({ _id: student._id }, JWT_SCRET, { expiresIn });
  // set cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    maxAge: expiresIn * 1000,
  });

  res.status(200).json({
    status: "success",
    message: "Login successful",
    token,
  });
});

// logout

export const logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({ status: "success", message: "Logged out" });
};
