import express from "express";
import {
  createClass,
  getClasses,
  updateClass,
  getOneClass,
  deleteClass,
} from "../controllers/classController.js";

const router = express.Router();

router.route("/").post(createClass).get(getClasses);
router.route("/:id").put(updateClass).get(getOneClass).delete(deleteClass);

export default router;
