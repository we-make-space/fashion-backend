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
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

const router = express.Router();

router.post(
	"/",
	logAction("Creating a new product"),
	createProduct,
	logError
);

// Route to get all products with pagination
router.get(
	"/",
	logAction("Fetching all products with pagination"),
	getAllProducts,
	logError
);

// Route to get a single product by ID
router.get(
	"/:id",
	logAction("Fetching a product by ID"),
	getProduct,
	logError
);

// Route to update a product by ID
router.patch(
	"/:id",
	logAction("Updating a product by ID"),
	updateProduct,
	logError
);

// Route to delete a product by ID
router.delete(
	"/:id",
	logAction("Deleting a product by ID"),
	deleteProduct,
	logError
);

// Route to add a comment to a product
router.post(
	"/:productId/comment",
	logAction("Adding a comment to a product"),
	addCommentToProduct,
	logError
);

// Route to get comments for a specific product with pagination
router.get(
	"/:productId/product-comments",
	logAction("Fetching comments for a specific product"),
	getCommentsForProduct,
	logError
);

// Route to like a comment
router.post(
	"/:commentId/like-comment",
	logAction("Liking a comment"),
	likeComment,
	logError
);

export { router as productRoute };
