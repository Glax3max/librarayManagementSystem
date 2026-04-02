import express from "express";
import {
  createLibrary,
  loginLibrary,
  registerStudentToLibrary
} from "../controllers/library.controller";
import { auth } from "../common/middlewares/auth.middleware";
import { authorize } from "../common/middlewares/role.middleware";

const router = express.Router();

router.post("/", createLibrary);
router.post("/login", loginLibrary);

router.post("/register-student", auth, authorize("OWNER"), registerStudentToLibrary);

export default router;