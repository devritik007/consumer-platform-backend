import { productRepository } from "./productRepository.js";
import { prisma } from "../../config/prisma.js";

export const productService = {
    async addCategory(userId: string, data: any) {
        const farmer = await prisma.farmerProfile.findUnique({
            where: { userId },
        });
        if (!farmer) {
            throw new Error("Farmer profile not found");
        }
        return prisma.category.create({ data });
    },

    async getCategories() {
        return productRepository.findAll();
    },

    async addproduct(userId: string, data: any) {
        const farmer = await prisma.farmerProfile.findUnique({
            where: { userId },
        });
        if (!farmer) {
            throw new Error("Farmer profile not found");
        }
        
        return productRepository.create({
            ...data,
            farmerProfileId: farmer.id,
        });
    },

    async updateProduct(userId: string, productId: string, data: any) {
        const farmer = await prisma.farmerProfile.findUnique({
            where: { userId },
        });
        if (!farmer) {
            throw new Error("Farmer profile not found");
        }
        
        const product = await productRepository.findById(productId);
        if (!product || !product.isActive || product.farmerProfileId !== farmer.id) {
            throw new Error("Product not found or unauthorized");
        }
        return productRepository.update(productId, data);
    },

    async listMyProducts(userId: string) {
        const farmer = await prisma.farmerProfile.findUnique({
            where: { userId },
        });
        if (!farmer) {
            throw new Error("Farmer profile not found");
        }

        return productRepository.findAllByFarmerId(farmer.id);
    },

    async deleteProduct(userId: string, productId: string) {
        const farmer = await prisma.farmerProfile.findUnique({
            where: { userId },
        }); 
        if (!farmer) {
            throw new Error("Farmer profile not found");
        }
        const product = await productRepository.findById(productId);
        if (!product || !product.isActive || product.farmerProfileId !== farmer.id) {
            throw new Error("Product not found or unauthorized");
        }
        return productRepository.softDelete(productId);
    }
};