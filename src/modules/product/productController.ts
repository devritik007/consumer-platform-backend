import type { Response } from "express";
import { productService } from "./productService.js";

export const addCategory = async (req: any, res: Response) => {
  try {
    const validatedBody = req.validatedData?.body;
    const category = await productService.addCategory(
      req.user.id,
      validatedBody,
    );
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
    const validatedBody = req.validatedData?.body;
    const product = await productService.addproduct(req.user.id, validatedBody);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req: any, res: Response) => {
  try {
    const validatedData = req.validatedData;
    const product = await productService.updateProduct(
      req.user.id,
      validatedData.params.productId,
      validatedData.body,
    );
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

export const listAllProducts = async (req: any, res: Response) => {
  try {
    const products = await productService.listAllProducts();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req: any, res: Response) => {
  try {
    const validatedParams = req.validatedData?.params;
    await productService.deleteProduct(req.user.id, validatedParams.productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
