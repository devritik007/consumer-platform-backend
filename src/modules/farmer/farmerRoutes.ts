import { Router } from "express";
import {
  authMiddleware,
  roleMiddleware,
} from "../../shared/middleware/authMiddleware.js";
import { adminverifyFarmer, createFarmerProfile } from "./farmerController.js";

const router = Router();

router.post(
  "/profile",
  authMiddleware,
  roleMiddleware(["farmer"]),
  createFarmerProfile
);

router.patch(
  "/verify",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminverifyFarmer
);

export default router;
