import { farmerRepository } from "./farmerRepository.js";

export const farmerService = {
  async createProfile(userId: string, data: any) {
    const existingProfile = await farmerRepository.findByUserId(userId);
    if (existingProfile) {
      throw new Error("Farmer profile already exists for this user.");
    }

    return farmerRepository.create({ ...data, userId });
  },

  async updateProfile(userId: string, data: any) {
    const safeData = { ...data };
    delete safeData.userId;
    delete safeData.isVerified; // Prevent changing verification status directly

    const existingProfile = await farmerRepository.findByUserId(userId);
    if (!existingProfile) {
      throw new Error("Farmer profile not found.");
    }

    return farmerRepository.update(userId, safeData);
  },

  async verifyFarmer(userId: string, status: boolean) {
    const existingProfile = await farmerRepository.findByUserId(userId);
    if (!existingProfile) {
      throw new Error("Farmer profile not found.");
    }

    return await farmerRepository.updateVerificationStatus(userId, status);
  },
};
