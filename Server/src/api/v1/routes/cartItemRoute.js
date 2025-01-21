import express from "express";
import {
	addCartItem,
	updateCartItem,
	removeCartItem,
	getCartItemsByCartId,
	getCartItemById,
} from "../controllers/cartItemController.js";
// import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

const router = express.Router();

// Route to add a cart item
router.post(
	"/cart-items",
	// logAction("Adding an item to the cart"),
	addCartItem,
	// logError
);

//? Route to update a cart item by ID
router.patch(
	"/:id",
	// logAction("Updating the cart item details"),
	updateCartItem,
	// logError
);

//? Route to remove a cart item by ID
router.delete(
	"/:id",
	// logAction("removing item from cart"),
	removeCartItem,
	// logError
);

// Route to get all cart items for a specific cart
router.get(
	"/:cartId/items",
	// logAction("Fetching items from a specific cart"),
	getCartItemsByCartId,
	// logError
);

// Route to get a specific cart item by ID
router.get(
	"/cart-items/:id",
	// logAction("Get a specific cart item"),
	getCartItemById,
	// logError
);

export default router;
export { router as cartItemRoute };
