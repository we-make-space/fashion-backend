import express from "express";

import {
	CreateUser,
	DeleteUser,
	GetAllUsers,
	GetUserProducts,
	UpdateUser,
} from "../controllers/userController.js";
import logger from "../../../utils/logger.js";

const router = express.Router();

// Creating a user
router.post("/", (req, res, next) => {
	logger.info("Creating a new user");
	CreateUser(req, res).catch((error) => {
		logger.error(`Error creating user: ${error.message}`);
		next(error);
	});
});

// Get all users
router.get("/all", (req, res, next) => {
	logger.info("Fetching all users");
	GetAllUsers(req, res).catch((error) => {
		logger.error(`Error fetching all users: ${error.message}`);
		next(error);
	});
});

// Update a user by ID
router.patch("/:id", (req, res, next) => {
	const { id } = req.params;
	logger.info(`Updating user with ID: ${id}`);
	UpdateUser(req, res).catch((error) => {
		logger.error(`Error updating user with ID ${id}: ${error.message}`);
		next(error);
	});
});

// Delete a user by ID
router.delete("/:id", (req, res, next) => {
	const { id } = req.params;
	logger.info(`Deleting user with ID: ${id}`);
	DeleteUser(req, res).catch((error) => {
		logger.error(`Error deleting user with ID ${id}: ${error.message}`);
		next(error);
	});
});

// Get products for a specific user by user ID
router.get("/get/product/:id", (req, res, next) => {
	const { id } = req.params;
	logger.info(`Fetching products for user with ID: ${id}`);
	GetUserProducts(req, res).catch((error) => {
		logger.error(
			`Error fetching products for user with ID ${id}: ${error.message}`
		);
		next(error);
	});
});

export { router as userRoute };
