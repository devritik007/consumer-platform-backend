import { prisma } from "../../config/prisma.js";

export const productRepository = {
    async findAll() {
        return prisma.category.findMany({
            orderBy: { name: "asc" },
        });
    },

    async create(data: any) {
        return prisma.product.create({ data });
    },

    async update(productId: string, data: any) {
        return prisma.product.update({
            where: { id: productId },
            data,
        });
    },

    async findById(productId: string) {
        return prisma.product.findUnique({
            where: { id: productId },
        });
    },

    async findAllByFarmerId(farmerProfileId: string) {
        return prisma.product.findMany({
            where: {
                farmerProfileId,
                isActive: true,
            },
            include: {
                category: true,
            },
        });
    },

    async softDelete(productId: string) {
        return prisma.product.update({
            where: { id: productId },
            data: { isActive: false },
        });
    },
};