import type { Response } from "express";
import { productService } from "./productService.js";

export const addCategory = async (req: any, res: Response) => {
    try {
        const category = await productService.addCategory(req.user.id, req.body);
        res.status(201).json(category);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getCategories = async (req: any, res: Response) => {
    try {
        const categories = await productService.getCategories();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }   
};

export const addProduct = async (req: any, res: Response) => {
    try {
        const product = await productService.addproduct(req.user.id, req.body);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProduct = async (req: any, res: Response) => {
    try {
        const product = await productService.updateProduct(req.user.id, req.params.productId, req.body);
        res.status(200).json(product);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }   
};

export const listMyProducts = async (req: any, res: Response) => {
    try {
        const products = await productService.listMyProducts(req.user.id);
        res.status(200).json(products);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProduct = async (req: any, res: Response) => {
    try {
        await productService.deleteProduct(req.user.id, req.params.productId);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};