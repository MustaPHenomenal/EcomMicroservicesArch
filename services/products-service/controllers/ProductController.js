import Product from "../models/Product.js";
import Category from "../models/Category.js";

// ✅ إنشاء منتج جديد (لـ admin)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

// ✅ جلب جميع المنتجات (مع فلترة وبحث)
export const getProducts = async (req, res) => {
  try {
    const { category, gender, minPrice, maxPrice, search, featured } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (gender) filter.gender = gender;
    if (featured === "true") filter.isFeatured = true;
    if (minPrice || maxPrice)
      filter.price = { ...(minPrice && { $gte: minPrice }), ...(maxPrice && { $lte: maxPrice }) };
    if (search) filter.name = { $regex: search, $options: "i" };

    const products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

// ✅ جلب منتج واحد بالتفصيل
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};

// ✅ تحديث منتج (لـ admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// ✅ حذف منتج (لـ admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};
