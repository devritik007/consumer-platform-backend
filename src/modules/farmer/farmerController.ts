import { error } from "node:console";
import { farmerService } from "./farmerService.js";
import type { Request, Response } from "express";

export const createFarmerProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const profile = await farmerService.createProfile(userId, req.body);
    res
      .status(201)
      .json({ message: "Farmer profile created successfully", profile });
  } catch (error: any) {
    if (error.message === "Farmer profile already exists for this user.") {
      return res
        .status(400)
        .json({ message: "Farmer profile already exists for this user." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminverifyFarmer = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;
    const farmerProfile = await farmerService.verifyFarmer(userId, status);
    res
      .status(200)
      .json({ message: "Farmer verification status updated", farmerProfile });
  } catch {
    error;
  }
  {
    res.status(500).json({ message: "Internal server error" });
  }
};
