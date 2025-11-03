import express from "express";
const router = express.Router();
import * as productController from"../controllers/ProductController.js";

router.post("/", productController.createProduct);       // إنشاء منتج
router.get("/", productController.getProducts);          // جميع المنتجات
router.get("/:id", productController.getProductById);    // منتج واحد
router.put("/:id", productController.updateProduct);     // تعديل
router.delete("/:id", productController.deleteProduct);  // حذف
export default router;
