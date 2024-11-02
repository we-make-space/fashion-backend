import express from "express";
import {
	addToCart,
	removeFromCart,
	updateCartQuantity,
	getCartItems,
    createCartForUser,
} from "../controllers/cartController.js";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

const router = express.Router();

// Route to add a product to the cart
router.post(
	"/addtocart",
	logAction("Adding item to cart successfull"),
	addToCart,
	logError
);

// Route to remove a product from the cart
router.delete(
	"/remove/:productId",
	logAction("Removed item from cart"),
	removeFromCart,
	logError
);

// Route to update the quantity of a product in the cart
router.put(
	"/update/:productId",
	logAction("Update quantity of a product in a cart"),
	updateCartQuantity,
	logError
);

// Route to get all items in the cart
router.get(
	"/",
	logAction("Fetching all items in cart"),
	getCartItems,
	logError
);

router.post(
	"/",
	logAction("Creating a cart for a user"),
	createCartForUser,
	logError
);

export default router;
export { router as cartRoute };
