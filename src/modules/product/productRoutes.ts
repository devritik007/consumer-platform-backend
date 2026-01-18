import { Router } from "express";
import {
  addProduct,
    addCategory,
  updateProduct,
  listMyProducts,
  getCategories,
  deleteProduct,
} from "./productController.js";
import { authMiddleware, roleMiddleware } from "../../shared/middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware, roleMiddleware(["FARMER"]));

router.post("/add", addProduct);
router.post("/category", addCategory);
router.get("/categories", getCategories);
router.put("/:productId", updateProduct);
router.get("/my", listMyProducts);
router.delete("/:productId", deleteProduct);

export default router;
