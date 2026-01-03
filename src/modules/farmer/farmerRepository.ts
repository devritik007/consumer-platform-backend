import { prisma } from "../../config/prisma.js";

export const farmerRepository = {
  async create(data: any) {
    return prisma.farmerProfile.create({ data });
  },

  async update(userId: string, data: any) {
    return prisma.farmerProfile.update({
      where: { userId },
      data,
    });
  },

  async findByUserId(userId: string) {
    return prisma.farmerProfile.findUnique({
      where: { userId },
    });
  },

  async updateVerificationStatus(userId: string, isVerified: boolean) {
    return prisma.farmerProfile.update({
      where: { userId },
      data: { isVerified },
    });
  },
};
