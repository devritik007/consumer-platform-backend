import { Router } from "express";
import {
  addProduct,
  addCategory,
  updateProduct,
  listMyProducts,
  listAllProducts,
  getCategories,
  deleteProduct,
} from "./productController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../../shared/middleware/authMiddleware.js";
import {
  validateRequest,
  sanitizeRequestBody,
} from "../../shared/middleware/validationMiddleware.js";
import {
  addProductSchema,
  updateProductSchema,
  deleteProductSchema,
  addCategorySchema,
} from "../../shared/validation/schemas.js";

const router = Router();

router.get("/all", listAllProducts);
router.get("/categories", getCategories);
router.use(authMiddleware, roleMiddleware(["FARMER"]));

router.post(
  "/add",
  sanitizeRequestBody,
  validateRequest(addProductSchema),
  addProduct,
);
router.post(
  "/category",
  sanitizeRequestBody,
  validateRequest(addCategorySchema),
  addCategory,
);
router.get("/categories", getCategories);
router.put(
  "/:productId",
  sanitizeRequestBody,
  validateRequest(updateProductSchema),
  updateProduct,
);
router.get("/my", listMyProducts);
router.delete(
  "/:productId",
  validateRequest(deleteProductSchema),
  deleteProduct,
);

export default router;
