import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getUserProfile);

export default router;
