import { prisma } from '../config/prismaConfig.js';
import asyncHandler from 'express-async-handler';

// Add product to cart
export const addToCart = asyncHandler(async (req, res) => {
	const { userId, productId, quantity } = req.body; // Grab userId from request body

	if (!userId) {
		return res.status(400).json({ error: 'User ID is required.' });
	}

	try {
		// Check if the cart already exists for the user
		let cart = await prisma.cart.findUnique({
			where: { userId },
			include: { items: true }
		});

		// If no cart exists, create one
		if (!cart) {
			cart = await prisma.cart.create({
				data: { userId }
			});
		}

		// Check if the product is already in the cart
		const existingCartItem = await prisma.cartItem.findUnique({
			where: {
				cartId_productId: {
					cartId: cart.id,
					productId
				}
			}
		});

		if (existingCartItem) {
			// Update quantity if product is already in the cart
			const updatedCartItem = await prisma.cartItem.update({
				where: { id: existingCartItem.id },
				data: { quantity: existingCartItem.quantity + quantity }
			});
			return res.status(200).json(updatedCartItem);
		} else {
			// Add new product to the cart
			const newCartItem = await prisma.cartItem.create({
				data: {
					cartId: cart.id,
					productId,
					quantity
				}
			});
			return res.status(201).json(newCartItem);
		}
	} catch (error) {
		console.error('Error adding product to cart:', error);
		res.status(500).json({ error: 'Failed to add product to cart' });
	}
});

// Remove product from cart
export const removeFromCart = asyncHandler(async (req, res) => {
	const { userId } = req.body; // Grab userId from request body
	const { productId } = req.params;

	if (!userId) {
		return res.status(400).json({ error: 'User ID is required.' });
	}

	try {
		// Find user's cart
		const cart = await prisma.cart.findUnique({
			where: { userId }
		});

		if (!cart) {
			return res.status(404).json({ error: 'Cart not found' });
		}

		// Remove the item from the cart
		await prisma.cartItem.delete({
			where: {
				cartId_productId: {
					cartId: cart.id,
					productId
				}
			}
		});

		res.status(200).json({ message: 'Product removed from cart' });
	} catch (error) {
		console.error('Error removing product from cart:', error);
		res.status(500).json({ error: 'Failed to remove product from cart' });
	}
});

// Update product quantity in cart
export const updateCartQuantity = asyncHandler(async (req, res) => {
	const { userId } = req.body; // Grab userId from request body
	const { productId } = req.params;
	const { quantity } = req.body;

	if (!userId) {
		return res.status(400).json({ error: 'User ID is required.' });
	}

	try {
		// Find user's cart
		const cart = await prisma.cart.findUnique({
			where: { userId }
		});

		if (!cart) {
			return res.status(404).json({ error: 'Cart not found' });
		}

		// Update the quantity of the item
		const updatedCartItem = await prisma.cartItem.update({
			where: {
				cartId_productId: {
					cartId: cart.id,
					productId
				}
			},
			data: { quantity }
		});

		res.status(200).json(updatedCartItem);
	} catch (error) {
		console.error('Error updating cart item quantity:', error);
		res.status(500).json({ error: 'Failed to update cart item quantity' });
	}
});

// Get cart items
export const getCartItems = asyncHandler(async (req, res) => {
	const { userId } = req.body; // Grab userId from request body

	if (!userId) {
		return res.status(400).json({ error: 'User ID is required.' });
	}

	try {
		// Find user's cart with all items and product details
		const cart = await prisma.cart.findUnique({
			where: { userId },
			include: {
				items: {
					include: {
						product: {
							select: {
								id: true,
								product_name: true,
								price: true,
								product_image: true
							}
						}
					}
				}
			}
		});

		if (!cart || cart.items.length === 0) {
			return res.status(200).json({ message: 'Your cart is empty' });
		}

		res.status(200).json(cart.items);
	} catch (error) {
		console.error('Error retrieving cart items:', error);
		res.status(500).json({ error: 'Failed to retrieve cart items' });
	}
});

// Create a new cart and link it to the user
export const createCartForUser = asyncHandler(async (req, res) => {
	const { userId } = req.body; // Assuming userId is provided in the request body

	try {
		// Create a new cart
		const cart = await prisma.cart.create({
			data: {
				userId // Link cart to user
			}
		});

		// Update the user's cartId
		await prisma.user.update({
			where: { id: userId },
			data: { cartId: cart.id } // Set the cartId in the user's record
		});

		res.status(201).json({ cartId: cart.id });
	} catch (error) {
		console.error('Error creating cart for user:', error);
		res.status(500).json({ error: 'Failed to create cart' });
	}
});
