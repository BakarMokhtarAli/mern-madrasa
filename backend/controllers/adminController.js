import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

import Admin from "../models/admin.js";

export const getAdmins = catchAsync(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: "success",
    results: admins.length,
    data: admins,
  });
});

export const createAdmin = catchAsync(async (req, res, next) => {
  // check if password and confirm password match
  if (!req.body.confirmPassword) {
    return next(new AppError("Please confirm your password", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }
  // check if admin already exists
  const existingAdmin = await Admin.findOne({ email: req.body.email });
  if (existingAdmin) {
    return next(new AppError("Email is already exists", 400));
  }
  const newAdmin = await Admin.create(req.body);

  res.status(201).json({
    status: "success",
    message: "created successfully",
    data: newAdmin,
  });
});

export const updateAdmin = catchAsync(async (req, res, next) => {
  const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedAdmin) {
    return next(new AppError("Admin not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: updatedAdmin,
  });
});

export const deleteAdmin = catchAsync(async (req, res, next) => {
  const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
  if (!deletedAdmin) {
    return next(new AppError("Admin not found", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Admin deleted successfully",
  });
});
