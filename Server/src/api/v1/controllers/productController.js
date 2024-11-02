import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//! A method to create a product
export const createProduct = asyncHandler(async (req, res) => {
	const {
		product_name,
		price,
		product_image,
		product_description,
		userEmail,
		categoryId, 
		sizes,
		colors
	} = req.body.data;

	console.log(req.body.data);
	try {
		const product = await prisma.product.create({
			data: {
				product_name,
				price,
				product_image,
				product_description,
				owner: { connect: { email: userEmail } },
				category: { connect: { id: categoryId } }, // Link the product to the category
				sizes,
				colors,
			},
		});

		res.send({ message: "product created successfully", product });
	} catch (err) {
		if (err) {
			throw new Error(err.message);
		}
		throw new Error(err.message);
	}
});

//& function to get all the documents/products
export const getAllProducts = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
	const limit = parseInt(req.query.limit) || 30; // Default to limit of 10 if not provided

	if (page < 1) {
		return res
			.status(400)
			.json({ error: "Page must be a positive integer." });
	}
	if (limit < 1) {
		return res
			.status(400)
			.json({ error: "Limit must be a positive integer." });
	}

	try {
		const skip = (page - 1) * limit;

		const products = await prisma.product.findMany({
			skip,
			take: limit,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				owner: {
					select: {
						firstName: true,
						lastName: true,
						image: true,
					},
				},
				category: {
					select: {
						id: true,
						name: true,
					},
				},
				reviews: {
					// this include reviews, which can be empty
					select: {
						rating: true,
						comment: true,
						userEmail: true,
						user: {
							select: {
								firstName: true,
								lastName: true,
								image: true,
							},
						},
					},
				},
				comments: {
					select: {
						content: true,
						createdAt: true,
						userEmail: true,
						User: {
							select: {
								firstName: true,
								lastName: true,
								image: true,
							},
						},
					},
				},
			},
		});

		const totalProducts = await prisma.product.count();
		const totalPages = Math.ceil(totalProducts / limit);

		res.status(200).json({
			totalProducts,
			totalPages,
			currentPage: page,
			hasMore: page < totalPages,
			data: products,
		});
	} catch (error) {
		console.error("Error fetching products:", error);
		res.status(500).json({
			error: "An error occurred while fetching products",
		});
	}
});


//& function to get a single product
export const getProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const product = await prisma.product.findUnique({
			where: { id },
		});
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//& Update an existing product
export const updateProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const {
		product_name,
		price,
		product_image,
		product_description,
		categoryId, // New field
		sizes, // New field
		colors, // New field
	} = req.body;

	try {
		// Log request details for debugging
		console.log("Update request:", {
			id,
			product_name,
			price,
			product_image,
			product_description,
			categoryId,
			sizes,
			colors,
		});

		// Check if the product exists before attempting to update
		const existingProduct = await prisma.product.findUnique({
			where: { id },
		});

		if (!existingProduct) {
			return res.status(404).json({ error: "Product not found" });
		}

		// Log existing product for debugging
		console.log("Existing product:", existingProduct);

		// Update the product if it exists
		const updatedProduct = await prisma.product.update({
			where: { id },
			data: {
				product_name:
					product_name !== undefined
						? product_name
						: existingProduct.product_name,
				price: price !== undefined ? price : existingProduct.price,
				product_image:
					product_image !== undefined
						? product_image
						: existingProduct.product_image,
				product_description:
					product_description !== undefined
						? product_description
						: existingProduct.product_description,
				categoryId:
					categoryId !== undefined
						? categoryId
						: existingProduct.categoryId, // Update categoryId
				sizes: sizes !== undefined ? sizes : existingProduct.sizes, // Update sizes
				colors: colors !== undefined ? colors : existingProduct.colors, // Update colors
			},
		});

		// Log the updated product for debugging
		console.log("Updated product:", updatedProduct);

		res.status(200).json(updatedProduct);
	} catch (error) {
		console.error("Error updating product:", error);
		res.status(500).json({
			error: "An error occurred while updating the product.",
		});
	}
});

//* Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const product = await prisma.product.delete({
			where: { id },
		});

		res.status(200).json({
			message: "Product deleted successfully",
			product,
		});
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "Product not found" });
		}

		console.error("Error deleting product:", error);

		res.status(500).json({
			error: "An error occurred while deleting the product",
			details: error.message,
		});
	}
});

//* Controller to add a comment to a product
export const addCommentToProduct = asyncHandler(async (req, res) => {
	try {
		const { productId } = req.params;
		const { content, userEmail } = req.body;

		// Checking if the product exists
		const product = await prisma.product.findUnique({
			where: { id: productId },
		});

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Checking if the user exists
		const user = await prisma.user.findUnique({
			where: { email: userEmail },
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const newComment = await prisma.comment.create({
			data: {
				content,
				userEmail: user.email,
				productId: product.id,
				createdAt: new Date(),
			},
		});

		res.status(201).json({
			message: "Comment added successfully",
			data: newComment,
		});
	} catch (error) {
		console.error("Error adding comment:", error);
		res.status(500).json({
			message: "An error occurred while adding the comment",
		});
	}
});

//? Getting comments on specific product
export const getCommentsForProduct = asyncHandler(async (req, res) => {
	try {
		const { productId } = req.params;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		if (isNaN(page) || page < 1) {
			return res
				.status(400)
				.json({ message: "Page must be a positive integer." });
		}
		if (isNaN(limit) || limit < 1) {
			return res
				.status(400)
				.json({ message: "Limit must be a positive integer." });
		}

		const skip = (page - 1) * limit;

		const comments = await prisma.comment.findMany({
			where: { productId },
			include: {
				User: {
					select: {
						firstName: true,
						lastName: true,
						image: true,
					},
				},
			},
			skip: skip,
			take: limit,
			orderBy: {
				createdAt: "desc",
			},
		});

		const totalComments = await prisma.comment.count({
			where: { productId },
		});

		const totalPages = Math.ceil(totalComments / limit);

		res.status(200).json({
			message: "Comments retrieved successfully",
			totalComments,
			totalPages,
			currentPage: page,
			hasMore: page < totalPages,
			data: comments,
		});
	} catch (error) {
		console.error("Error fetching comments:", error);
		res.status(500).json({
			message: "An error occurred while fetching comments",
		});
	}
});

//! Controller to like a comment

export const likeComment = asyncHandler(async (req, res) => {
	const { commentId } = req.params;
	const { userEmail } = req.body;

	if (!userEmail) {
		return res.status(400).json({
			message: "User email is required to like a comment.",
		});
	}

	// Check if the user has already liked the comment
	const existingLike = await prisma.like.findUnique({
		where: {
			userEmail_commentId: {
				userEmail,
				commentId,
			},
		},
	});

	if (existingLike) {
		return res.status(400).json({
			message: "You have already liked this comment.",
		});
	}

	const newLike = await prisma.like.create({
		data: {
			userEmail,
			commentId,
			productId: req.body.productId,
		},
	});

	res.status(201).json({
		message: "Comment liked successfully",
		like: newLike,
	});
});

//? Liking a product

export const likeProduct = asyncHandler(async (req, res) => {
	try {
		const { userId, productId } = req.body;

		console.log("Received userId:", userId);
		console.log("Received productId:", productId);

		if (!userId || !productId) {
			return res
				.status(400)
				.json({ message: "userId and productId are required" });
		}

		// Check if the like exists
		const existingLike = await prisma.like.findUnique({
			where: {
				userId_productId_commentId: {
					userId,
					productId,
					commentId: null,
				},
			},
		});

		if (existingLike) {
			// If it exists, delete it (unlike)
			await prisma.like.delete({
				where: {
					id: existingLike.id,
				},
			});
			return res.status(200).json({ message: "Product unliked" });
		} else {
			// If it does not exist, create it (like)
			await prisma.like.create({
				data: {
					userId,
					productId,
					commentId: null,
				},
			});
			return res.status(201).json({ message: "Product liked" });
		}
	} catch (error) {
		console.error("Error toggling like for product:", error);
		return res
			.status(500)
			.json({ message: "An error occurred while toggling like", error });
	}
});
