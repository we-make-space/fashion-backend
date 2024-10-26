import express from "express";
import {
	addCommentToProduct,
	createProduct,
	deleteProduct,
	getAllProducts,
	getCommentsForProduct,
	getProduct,
	likeComment,
	updateProduct,
} from "../controllers/productController.js";
import logger from "../../../utils/logger.js";

const router = express.Router();

// Create a new product
router.post("/", (req, res, next) => {
	logger.info("Creating a new product");
	createProduct(req, res).catch((error) => {
		logger.error(`Error creating product: ${error.message}`);
		next(error);
	});
});

// Get all products
router.get("/list", (req, res, next) => {
	logger.info("Fetching all products");
	getAllProducts(req, res).catch((error) => {
		logger.error(`Error fetching all products: ${error.message}`);
		next(error);
	});
});

// Get a product by ID
router.get("/:id", (req, res, next) => {
	const { id } = req.params;
	logger.info(`Fetching product with ID: ${id}`);
	getProduct(req, res).catch((error) => {
		logger.error(`Error fetching product with ID ${id}: ${error.message}`);
		next(error);
	});
});

// Update a product by ID
router.patch("/:id", (req, res, next) => {
	const { id } = req.params;
	logger.info(`Updating product with ID: ${id}`);
	updateProduct(req, res).catch((error) => {
		logger.error(`Error updating product with ID ${id}: ${error.message}`);
		next(error);
	});
});

// Delete a product by ID
router.delete("/:id", (req, res, next) => {
	const { id } = req.params;
	logger.info(`Deleting product with ID: ${id}`);
	deleteProduct(req, res).catch((error) => {
		logger.error(`Error deleting product with ID ${id}: ${error.message}`);
		next(error);
	});
});

// Add a comment to a product
router.post("/:productId/comment", (req, res, next) => {
	const { productId } = req.params;
	logger.info(`Adding comment to product with ID: ${productId}`);
	addCommentToProduct(req, res).catch((error) => {
		logger.error(
			`Error adding comment to product with ID ${productId}: ${error.message}`
		);
		next(error);
	});
});

// Get comments for a specific product
router.get("/:productId/product-comment", (req, res, next) => {
	const { productId } = req.params;
	logger.info(`Fetching comments for product with ID: ${productId}`);
	getCommentsForProduct(req, res).catch((error) => {
		logger.error(
			`Error fetching comments for product with ID ${productId}: ${error.message}`
		);
		next(error);
	});
});

// Like a comment by comment ID
router.post("/:commentId/like-comment", (req, res, next) => {
	const { commentId } = req.params;
	logger.info(`Liking comment with ID: ${commentId}`);
	likeComment(req, res).catch((error) => {
		logger.error(
			`Error liking comment with ID ${commentId}: ${error.message}`
		);
		next(error);
	});
});

export { router as productRoute };
