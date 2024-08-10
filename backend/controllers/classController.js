import Class from "../models/class.js";
import AppError from "../utils/AppError.js";
import catchAsyncErrors from "../utils/catchAsync.js";
export const createClass = catchAsyncErrors(async (req, res) => {
  const newClass = new Class(req.body);
  await newClass.save();
  res.status(201).json(newClass);
});

export const getClasses = catchAsyncErrors(async (req, res) => {
  const classes = await Class.find().populate({
    path: "students",
    select: "full_name -class",
  });

  res.status(200).json({
    status: "success",
    results: classes.length,
    classes,
  });
});

export const getOneClass = catchAsyncErrors(async (req, res, next) => {
  const classDoc = await Class.findById(req.params.id);
  if (!classDoc) {
    return next(new AppError("Class not found", 404));
  }
  res.status(200).json({
    status: "success",
    class: classDoc,
  });
});

export const updateClass = catchAsyncErrors(async (req, res, next) => {
  const updatedClass = await Class.findById(req.params.id);
  if (!updatedClass) {
    return next(new AppError("Class not found", 404));
  }

  const class_name = req.body.class_name;
  updateClass.class_name = class_name;
  await updatedClass.save();
  // res.json(updatedClass);
  res.status(200).json({
    status: "class updated success",
    updatedClass,
  });
});

export const deleteClass = catchAsyncErrors(async (req, res, next) => {
  const deletedClass = await Class.findByIdAndDelete(req.params.id);
  if (!deletedClass) {
    return next(new AppError("Class not found", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Class deleted successfully",
  });
});
