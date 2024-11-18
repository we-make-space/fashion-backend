import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";

// Create a new category
export const createCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;
	try {
		const category = await prisma.category.create({
			data: { name },
		});
		res.status(201).json(category);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get all categories with their associated products
export const getCategories = asyncHandler(async (req, res) => {
	try {
		const categories = await prisma.category.findMany({
			include: {
				products: true,
			},
		});
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Update a category by ID
export const updateCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	try {
		const category = await prisma.category.update({
			where: { id },
			data: { name },
		});
		res.status(200).json(category);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Delete a category by ID
export const deleteCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		// Optionally, you can check for products associated with this category
		const categoryWithProducts = await prisma.category.findUnique({
			where: { id },
			include: { products: true },
		});

		if (categoryWithProducts.products.length > 0) {
			return res
				.status(400)
				.json({
					error: "Cannot delete category with associated products.",
				});
		}

		await prisma.category.delete({
			where: { id },
		});
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
