import express from "express";

import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  addToClass,
  // getStudentByRollNo,
  // getStudentsByClassId,
  // getStudentsByClassSection,
} from "../controllers/studentController.js";

const router = express.Router();

router.route("/").get(getStudents).post(createStudent);
router
  .route("/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

router.route("/:id/add-to-class/").put(addToClass);
export default router;
