import express from "express";
import {
	addCommentToProduct,
	createProduct,
	deleteProduct,
	getAllProductLikes,
	getAllProducts,
	getCommentLikes,
	getCommentsForProduct,
	getProduct,
	getProductLikes,
	likeComment,
	likeProduct,
	seachProduct,
	updateProduct,
} from "../controllers/productController.js";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";
import multer from "multer";

const upload = multer({
	dest: './uploads/',
  });
  
const router = express.Router();

router.post(
	"/",
	upload.array('productImg[]',12),
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

//? Route to get a single product by ID
router.get(
	"/:id",
	logAction("Fetching a product by ID"),
	getProduct,
	logError
);

//? Route to update a product by ID
router.patch(
	"/:id",
	logAction("Updating a product by ID"),
	updateProduct,
	logError
);

//? Route to delete a product by ID
router.delete(
	"/:id",
	logAction("Deleting a product by ID"),
	deleteProduct,
	logError
);

//? Route to add a comment to a product
router.post(
	"/:productId/comment",
	logAction("Adding a comment to a product"),
	addCommentToProduct,
	logError
);

//? Route to get comments for a specific product with pagination
router.get(
	"/:productId/product-comments",
	logAction("Fetching comments for a specific product"),
	getCommentsForProduct,
	logError
);

//? Route to like a comment
router.post(
	"/:commentId/:userId/like-comment",
	logAction("Liking a comment"),
	likeComment,
	logError
);

//? Route to like a product
router.post(
	"/likes/product/like",
	logAction("Liking a product"),
	likeProduct,
	logError
);

//? Route to get all the likes on a product
router.get(
	"/product/:productId/likes",
	logAction("Return all likes on a product"),
	getProductLikes,
	logError
);

//? Route to get all likes on a comment
router.get(
	"/comment/:commentId/likes",
	logAction("Return all likes on a comment"),
	getCommentLikes,
	logError
);

//? Route to get all likes on a every product
router.get(
	"/products/likes",
	logAction("Return all likes on a every product"),
	getAllProductLikes,
	logError
);

router.get("/search-result/:search", logAction("Search a product"), seachProduct, logError);



export { router as productRoute };
