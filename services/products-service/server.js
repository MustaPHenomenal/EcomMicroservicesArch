import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// use Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);


app.get("/", (req, res) => {
  res.send("Service is running...");
});
connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Service running on port ${PORT}`));
