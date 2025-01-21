import express from "express";
import {
	createCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "../controllers/categoryController.js";
// import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

const router = express.Router();

//? Route to create a new category
router.post(
	"/",
	// logAction("Creating a new category"),
	createCategory,
	// logError
);

//? Route to get all categories
router.get(
	"/", 
	// logAction("Fetching all categories"), 
	getCategories, 
	// logError
);

//? Route to update a category by ID
router.patch(
	"/:id",
	// logAction("Updating a category by ID"),
	updateCategory,
	// logError
);

//? Route to delete a category by ID
router.delete(
	"/:id",
	// logAction("Deleting a category by ID"),
	deleteCategory,
	// logError
);

export { router as categoryRoute };
