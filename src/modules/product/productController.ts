import type { Response } from "express";
import { productService } from "./productService.js";
import { asyncHandler } from "../../shared/middleware/errorHandler.js";

export const addCategory = asyncHandler(async (req: any, res: Response) => {
  const validatedBody = req.validatedData?.body;
  const category = await productService.addCategory(req.user.id, validatedBody);
  res.status(201).json(category);
});

export const getCategories = asyncHandler(async (req: any, res: Response) => {
  const categories = await productService.getCategories();
  res.status(200).json(categories);
});

export const addProduct = asyncHandler(async (req: any, res: Response) => {
  const validatedBody = req.validatedData?.body;
  const product = await productService.addproduct(req.user.id, validatedBody);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req: any, res: Response) => {
  const validatedData = req.validatedData;
  const product = await productService.updateProduct(
    req.user.id,
    validatedData.params.productId,
    validatedData.body,
  );
  res.status(200).json(product);
});

export const listMyProducts = asyncHandler(async (req: any, res: Response) => {
  const products = await productService.listMyProducts(req.user.id);
  res.status(200).json(products);
});

export const listAllProducts = async (req: any, res: Response) => {
  try {
    const products = await productService.listAllProducts();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = asyncHandler(async (req: any, res: Response) => {
  const validatedParams = req.validatedData?.params;
  await productService.deleteProduct(req.user.id, validatedParams.productId);
  res.status(200).json({ message: "Product deleted successfully" });
});
