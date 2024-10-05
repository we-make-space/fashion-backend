import express from "express";
import { createProduct, getAllProducts, getProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/createproduct", createProduct);
router.get("/allproducts", getAllProducts);
router.get("/:id", getProduct)

export { router as productRoute };