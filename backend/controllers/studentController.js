import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import Student from "../models/student.js";
import Class from "../models/class.js";

import APIFeatures from "../utils/ApiFeatures.js";

export const createStudent = catchAsync(async (req, res, next) => {
  const newStudent = await Student.create(req.body);
  res.status(201).json({
    status: "success",
    data: newStudent,
  });
});

export const getStudents = catchAsync(async (req, res, next) => {
  // search query
  // if (req.query.search) {
  //   const searchQuery = req.query.search.toLowerCase();
  //   const query = searchQuery
  //     ? { full_name: { $regex: searchQuery, $options: "i" } }
  //     : {};
  //   const students = await Student.find(query);
  //   return res.status(200).json({
  //     status: "success",
  //     results: students.length,
  //     data: students,
  //   });
  // }
  const features = new APIFeatures(Student.find(), req.query)
    .filter()
    .sort()
    .limitingFields()
    .paginate()
    .search();
  const students = await features.query.populate({
    path: "class",
    select: "class_name",
  });

  // Get total number of documents for pagination
  const totalStudents = await Student.countDocuments();

  res.status(200).json({
    status: "success",
    results: students.length,
    total: totalStudents,
    data: students,
  });
});

export const getStudentById = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(new AppError("Student not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: student,
  });
});

export const updateStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    return next(new AppError("Student not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: student,
  });
});

export const deleteStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return next(new AppError("Student not found", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const addToClass = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,

    { class: req.body.class },

    { new: true, runValidators: true }
  );
  // check if class is exist
  const isClassExist = await Class.findById(req.body.class);
  if (!isClassExist) {
    return next(new AppError("Class not found", 404));
  }
  if (!student) {
    return next(new AppError("Student not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Student added to class",
    data: student,
  });
});
