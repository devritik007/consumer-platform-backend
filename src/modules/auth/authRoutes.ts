import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "./authController.js";
import { authMiddleware } from "../../shared/middleware/authMiddleware.js";
import { authRateLimiter } from "../../shared/middleware/rateLimiter.js";

const router = Router();

router.post("/register", authRateLimiter, registerUser);
router.post("/login", authRateLimiter, loginUser);

router.post("/logout", logoutUser);

router.get("/profile", authMiddleware, getUserProfile);

export default router;
