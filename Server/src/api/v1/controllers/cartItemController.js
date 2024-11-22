import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";

// Add a cart item
export const addCartItem = asyncHandler(async (req, res) => {
	const { cartId, productId, quantity } = req.body;

	try {
		const cartItem = await prisma.cartItem.create({
			data: {
				cartId,
				productId,
				quantity,
			},
		});
		res.status(201).json(cartItem);
	} catch (error) {
		console.error("Error adding cart item:", error);
		res.status(500).json({ error: "Failed to add cart item" });
	}
});

// Update a cart item
export const updateCartItem = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { quantity } = req.body;

	try {
		const cartItem = await prisma.cartItem.update({
			where: { id },
			data: { quantity },
		});
		res.status(200).json(cartItem);
	} catch (error) {
		console.error("Error updating cart item:", error);
		res.status(500).json({ error: "Failed to update cart item" });
	}
});

// Remove a cart item
export const removeCartItem = asyncHandler(async (req, res) => {
	const { id } = req.params; // Assuming the cart item ID is passed in the URL

	try {
		await prisma.cartItem.delete({
			where: { id },
		});
		res.status(200).json({ message: "Cart item removed" });
	} catch (error) {
		console.error("Error removing cart item:", error);
		res.status(500).json({ error: "Failed to remove cart item" });
	}
});

// Get all cart items for a specific cart
export const getCartItemsByCartId = asyncHandler(async (req, res) => {
	const { cartId } = req.params; // Assuming the cart ID is passed in the URL

	try {
		const cartItems = await prisma.cartItem.findMany({
			where: { cartId },
			include: {
				product: {
					select: {
						id: true,
						product_name: true,
						price: true,
						product_image: true,
						owner: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
								email: true,
							},
						},
					},
				},
			},
		});

		if (cartItems.length === 0) {
			return res
				.status(404)
				.json({ message: "No items found in this cart" });
		}

		res.status(200).json(cartItems);
	} catch (error) {
		console.error("Error retrieving cart items:", error);
		res.status(500).json({ error: "Failed to retrieve cart items" });
	}
});

// Get a specific cart item by ID
export const getCartItemById = asyncHandler(async (req, res) => {
	const { id } = req.params; 

	try {
		const cartItem = await prisma.cartItem.findUnique({
			where: { id },
			include: {
				product: {
					select: {
						id: true,
						product_name: true,
						price: true,
						product_image: true,
						owner: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
								email: true,
							},
						},
					},
				},
			},
		});

		if (!cartItem) {
			return res.status(404).json({ message: "Cart item not found" });
		}

		res.status(200).json(cartItem);
	} catch (error) {
		console.error("Error retrieving cart item:", error);
		res.status(500).json({ error: "Failed to retrieve cart item" });
	}
});
