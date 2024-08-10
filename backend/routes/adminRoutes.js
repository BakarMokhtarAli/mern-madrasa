import express from "express";
import {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.route("/").get(getAdmins).post(createAdmin);
router.route("/:id").put(updateAdmin).delete(deleteAdmin);

export default router;
