import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

// ^ Get all inventory items
export const getInventoryItems = asyncHandler(async (req, res) => {
	const inventoryItems = await prisma.inventory.findMany({
		include: {
			product: true
		}
	});
	res.status(200).json({ success: true, inventoryItems });
});

// ^ Get a single inventory item by productId
export const getInventoryItemByProductId = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	const inventoryItem = await prisma.inventory.findUnique({
		where: { productId },
		include: {
			product: true //? Include product details
		}
	});

	if (!inventoryItem) {
		return res.status(404).json({ success: false, message: 'Inventory item not found' });
	}

	res.status(200).json({ success: true, inventoryItem });
});

// ^ Update inventory stock for a product
export const updateInventoryStock = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const { stock } = req.body;

	const inventoryItem = await prisma.inventory.findUnique({
		where: { productId }
	});

	if (!inventoryItem) {
		return res.status(404).json({ success: false, message: 'Inventory item not found' });
	}

	const updatedInventory = await prisma.inventory.update({
		where: { productId },
		data: { stock }
	});

	res.status(200).json({ success: true, inventory: updatedInventory });
});

// ^ Reduce stock when an order is placed
export const reduceInventoryStock = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const { quantity } = req.body;

	const inventoryItem = await prisma.inventory.findUnique({
		where: { productId }
	});

	if (!inventoryItem) {
		return res.status(404).json({ success: false, message: 'Inventory item not found' });
	}

	if (inventoryItem.stock < quantity) {
		return res.status(400).json({
			success: false,
			message: 'Insufficient stock for this product'
		});
	}

	const updatedInventory = await prisma.inventory.update({
		where: { productId },
		data: { stock: inventoryItem.stock - quantity }
	});

	res.status(200).json({ success: true, inventory: updatedInventory });
});

// ^ Add stock to an inventory item
export const addInventoryStock = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const { quantity } = req.body;

	const inventoryItem = await prisma.inventory.findUnique({
		where: { productId }
	});

	if (!inventoryItem) {
		return res.status(404).json({ success: false, message: 'Inventory item not found' });
	}

	const updatedInventory = await prisma.inventory.update({
		where: { productId },
		data: { stock: inventoryItem.stock + quantity }
	});

	res.status(200).json({ success: true, inventory: updatedInventory });
});

// ^ Create a new inventory item
export const createInventoryItem = asyncHandler(async (req, res) => {
	const { productId, stock } = req.body;

	const product = await prisma.product.findUnique({
		where: { id: productId }
	});

	if (!product) {
		return res.status(404).json({ success: false, message: 'Product not found' });
	}

	const inventoryItem = await prisma.inventory.create({
		data: { productId, stock }
	});

	res.status(201).json({ success: true, inventory: inventoryItem });
});

// ^ Delete an inventory item
export const deleteInventoryItem = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	const inventoryItem = await prisma.inventory.findUnique({
		where: { productId }
	});

	if (!inventoryItem) {
		return res.status(404).json({ success: false, message: 'Inventory item not found' });
	}

	await prisma.inventory.delete({
		where: { productId }
	});

	res.status(200).json({
		success: true,
		message: 'Inventory item deleted successfully'
	});
});

// ^ Check inventory availability for multiple products
export const checkInventoryAvailability = asyncHandler(async (req, res) => {
	const { productIds } = req.body;

	const inventoryItems = await prisma.inventory.findMany({
		where: {
			productId: { in: productIds }
		}
	});

	const unavailableProducts = productIds.filter(
		(id) => !inventoryItems.some((item) => item.productId === id && item.stock > 0)
	);

	if (unavailableProducts.length > 0) {
		return res.status(400).json({
			success: false,
			message: 'Some products are out of stock',
			unavailableProducts
		});
	}

	res.status(200).json({
		success: true,
		message: 'All products are available in stock'
	});
});

// ^ Get low stock items
export const getLowStockItems = asyncHandler(async (req, res) => {
	const { threshold = 10 } = req.query; // Default threshold is 10

	const lowStockItems = await prisma.inventory.findMany({
		where: {
			stock: { lt: parseInt(threshold) }
		},
		include: {
			product: true
		}
	});

	res.status(200).json({
		success: true,
		lowStockItems
	});
});

// ^ Reset stock for a product
export const resetInventoryStock = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const { defaultStock = 0 } = req.body; //? Default is 0 unless

	const inventoryItem = await prisma.inventory.findUnique({
		where: { productId }
	});

	if (!inventoryItem) {
		return res.status(404).json({ success: false, message: 'Inventory item not found' });
	}

	const updatedInventory = await prisma.inventory.update({
		where: { productId },
		data: { stock: defaultStock }
	});

	res.status(200).json({
		success: true,
		message: 'Stock reset successfully',
		inventory: updatedInventory
	});
});
