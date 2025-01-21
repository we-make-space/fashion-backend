import express from "express";
import {
	createReview,
	getReviewsByProductId,
	updateReview,
	deleteReview,
} from "../controllers/reviewController.js";
// import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

const router = express.Router();

// Route for creating a review
router.post("/", createReview);

// Route for getting reviews by product ID
router.get(
	"/:productId/reviews",
	// logAction("Getting reviews on a product"),
	getReviewsByProductId,
	// logError
);

// Route for updating a review
router.put(
	"/:id", 
	// logAction("Updating a review"), 
	updateReview, 
	// logError
);

// Route for deleting a review
router.delete(
	"/:id", 
	// logAction("deleting a review"), 
	deleteReview, 
	// logError
);

export { router as reviewRoute };