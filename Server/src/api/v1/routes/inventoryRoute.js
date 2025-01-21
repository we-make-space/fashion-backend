import express from "express";
import {
	getInventoryItems,
	getInventoryItemByProductId,
	updateInventoryStock,
	reduceInventoryStock,
	addInventoryStock,
	createInventoryItem,
	deleteInventoryItem,
	checkInventoryAvailability,
	getLowStockItems,
	resetInventoryStock,
} from "../controllers/inventoryController.js";
// import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

const router = express.Router();

//^ Create a new inventory item
router.post(
	"/",
	// logAction("Creating a new inventory item"),
	createInventoryItem,
	// logError
);

//^ Get all inventory items
router.get(
	"/",
	// logAction("Fetching all inventory items"),
	getInventoryItems,
	// logError
);

//^ Get a single inventory item by productId
router.get(
	"/:productId",
	// logAction("Get a single inventory item by productId"),
	getInventoryItemByProductId,
	// logError
);

//^ Update the inventory stock
router.patch(
	"/:productId",
	// logAction("Updating an inventory stock"),
	updateInventoryStock,
	// logError
);

//^ Reduced inventory stock
router.patch(
	"/:productId/reduce",
	// logAction("Reduced inventory stock"),
	reduceInventoryStock,
	// logError
);

//^ Added inventory stock
router.patch(
	"/:productId/add",
	// logAction("Added inventory stock"),
	addInventoryStock,
	// logError
);

//^ Delete an inventory item
router.delete(
	"/:productId",
	// logAction("Deleting an inventory item"),
	deleteInventoryItem,
	// logError
);

//^ Checking stock for multiple products
router.post(
	"/check-availability",
	// logAction("Checking stock for multiple products"),
	checkInventoryAvailability,
	// logError
); 

//^ Getting items below stock threshold
router.get(
	"/low-stock",
	// logAction("Getting items below stock threshold"),
	getLowStockItems,
	// logError
); 

//^ Reseting stock for a product
router.patch(
	"/:productId/reset",
	// logAction("Reseting stock for a product"),
	resetInventoryStock,
	// logError
); 

export { router as inventoryRoute };
