import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/CategoryController.js";

import express from "express";
const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory
);

export default router;
