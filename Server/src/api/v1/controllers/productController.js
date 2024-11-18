import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { GenderEnum, CategoryEnum } from "@prisma/client";
import { cloudinary } from "../config/cloudinary.js";

//! A method to create a product
export const createProduct = asyncHandler(async (req, res) => {
	const {
		product_name,
		price,
		product_description,
		userEmail,
	} = req.body.data;

	console.log(req.body.data);
	try {
		const product = await prisma.product.create({
			data: {
				product_name,
				price: parseFloat(price),
				// sizes: Array.isArray(sizes) ? sizes : [sizes], // Check if sizes is an array, if not, convert it to an array
				// colors: Array.isArray(colors) ? colors : [colors], // Same check for colors
				active:  active === "on",
				product_image: {
					createMany: {
						data: Array.isArray(product_image) ? product_image : [product_image],
					}
				},
				stock: parseInt(stock),
				product_description,
				owner: { connect: { email: userEmail } },
			},
		});
		console.log("Product created successfully");

		res.status(201).json({ message: "Product created successfully", product });
	
	} catch (err) {
		console.error("Error creating product:", err); // Added logging
		res.status(500).json({ error: "An error occurred while creating the product" });
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
				product_image:{
					select: {
						url: true,
					}
				},
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
				likes: {
					select: {
						id: true,
						user: {
							select: {
								firstName: true,
								lastName: true,
								image: true,
							},
						},
					},
				},
				_count: {
					select: {
						comments: true,
						likes: true,
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

//& function to get all products (Emma)
export const getAllProductsTrial = asyncHandler(async (req, res) => {
	try {
		const products = await prisma.product.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				createdAt: false,
				updatedAt: false,
				owner: {
					select: {
						firstName: true,
						lastName: true,
						image: true,
					},
				},
				orderItems: {
					select: {
						quantity: true,
						order: {
							select: {
								id: true,
								status: true,
								total: true,
								userId: true,
							},
						},
					},
				}, // Including orders
				product_image: {
					select: {
						url: true,
						id: true,
					},
				},
			},
		});

		res.status(200).json(products);
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
		console.log("Update request:", {
			id,
			product_name,
			price,
			product_image,
			product_description,
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

		const updatedProduct = await prisma.product.update({
			where: { id },
			data: {
				product_name: product_name || existingProduct.product_name,
				price: price !== undefined ? price : existingProduct.price,
				product_image: product_image || existingProduct.product_image,
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

		console.log("Updated product:", updatedProduct);

		res.status(200).json(updatedProduct);
	} catch (error) {
		console.error("Error updating product:", error);
		res.status(500).json({ error: error.message });
	}
});

//* Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		// Delete order items associated with the product
		await prisma.orderItem.deleteMany({
			where: { productId: id },
		});
	

		const product = await prisma.product.delete({
			where: { id },
		});

		res.status(200).json({
			message: "Product deleted successfully",
			product,
		});
		console.log("Product deleted successfully");
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
	const { content, userEmail } = req.body;
	const { productId } = req.params;

	try {
		const user = await prisma.user.findUnique({
			where: { email: userEmail },
		});

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const comment = await prisma.comment.create({
			data: {
				content,
				createdAt: new Date(),
				User: {
					connect: {
						email: userEmail, 
					},
				},
				product: {
					connect: {
						id: productId, 
					},
				},
			},
		});

		return res.status(201).json({
			message: "Comment added successfully",
			data: comment,
		});
	} catch (error) {
		console.error("Error adding comment:", error);
		return res.status(500).json({
			message: "An error occurred while adding the comment",
			error: error.message,
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

/*
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
*/

// Toggle like on a comment
// Middleware to log requests
export const logRequest = (req, res, next) => {
	console.log("Request Body:", req.body);
	console.log("Request Params:", req.params);
	console.log("Request Query:", req.query);
	next();
};

// Toggle like on a comment
export const likeComment = asyncHandler(async (req, res) => {
	console.log("Received request to toggle comment like");
	console.log("Request body:", req.body);

	let { userId, commentId } = req.body;

	// Check if values are coming from params instead of body
	if (!userId && req.params.userId) {
		userId = req.params.userId;
	}
	if (!commentId && req.params.commentId) {
		commentId = req.params.commentId;
	}

	// Validate input for comment like
	if (!userId || !commentId) {
		console.log("Missing required fields:", { userId, commentId });
		res.status(400);
		throw new Error(
			`User ID and Comment ID are required. Received: userId=${userId}, commentId=${commentId}`
		);
	}

	try {
		console.log("Looking up comment:", commentId);
		// First get the comment to get its associated productId
		const comment = await prisma.comment.findUnique({
			where: {
				id: commentId,
			},
			select: {
				id: true,
				productId: true,
				content: true,
			},
		});

		console.log("Found comment:", comment);

		if (!comment) {
			console.log("Comment not found:", commentId);
			res.status(404);
			throw new Error("Comment not found");
		}

		// Check if like already exists
		console.log("Checking for existing like");
		const existingLike = await prisma.like.findFirst({
			where: {
				userId: userId,
				commentId: commentId,
			},
		});

		console.log("Existing like:", existingLike);

		if (existingLike) {
			console.log("Deleting existing like");
			// Unlike - remove the existing like
			await prisma.like.delete({
				where: {
					id: existingLike.id,
				},
			});

			console.log("Like deleted successfully");
			res.status(200).json({
				message: "Comment unliked successfully",
				liked: false,
			});
		} else {
			console.log("Creating new like");
			// Like - create new like
			const newLike = await prisma.like.create({
				data: {
					userId: userId,
					productId: comment.productId,
					commentId: commentId,
				},
			});

			console.log("New like created:", newLike);
			res.status(201).json({
				message: "Comment liked successfully",
				liked: true,
				like: newLike,
			});
		}
	} catch (error) {
		console.error("Error in toggleCommentLike:", error);
		res.status(error.status || 400);
		throw error;
	}
});

//? Liking a product

/*
export const likeProduct = asyncHandler(async (req, res) => {
	try {
		console.log("Request body:", req.body); // Add this line to inspect the body

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
				userId_productId: {
					userId,
					productId,
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

*/

export const likeProduct = asyncHandler(async (req, res) => {
	try {
		const { userId, productId, commentId } = req.body.data;

		console.log("Received userId:", userId);
		console.log("Received productId:", productId);
		console.log("Received commentId:", commentId);

		if (!userId || !productId) {
			return res
				.status(400)
				.json({ message: "userId and productId are required" });
		}

		// Check if the like already exists
		const existingLike = await prisma.like.findFirst({
			where: {
				userId,
				productId,
				...(commentId ? { commentId } : {}),
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
					user: {
						connect: { id: userId },
					},
					product: {
						connect: { id: productId },
					},
					...(commentId && {
						comment: {
							connect: { id: commentId },
						},
					}),
				},
			});

			console.log(
				`Like created for productId: ${productId}, userId: ${userId}`
			);

			return res.status(201).json({ message: "Product liked" });
		}
	} catch (error) {
		console.error("Error toggling like for product:", error);
		return res
			.status(500)
			.json({ message: "An error occurred while toggling like", error });
	}
});

//? Get likes count for a product
export const getProductLikes = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	try {
		// Check the likes for the product where commentId is null
		const likesCount = await prisma.like.count({
			where: {
				productId: productId,
				commentId: null, // Only count likes for the product, not comments
			},
		});

		console.log("Likes count:", likesCount); // Add this to log the count

		res.status(200).json({
			productId: productId,
			likesCount: likesCount,
		});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//? Get likes count for a comment
export const getCommentLikes = asyncHandler(async (req, res) => {
	const { commentId } = req.params;

	try {
		const likesCount = await prisma.like.count({
			where: {
				commentId: commentId,
			},
		});

		res.status(200).json({
			commentId: commentId,
			likesCount: likesCount,
		});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//? Get all product likes
export const getAllProductLikes = asyncHandler(async (req, res) => {
	try {
		// Retrieve all products with their likes and owner details
		const productsWithLikes = await prisma.product.findMany({
			include: {
				likes: true,
				owner: {
					select: {
						id: true,
						firstName: true,
						image: true,
					},
				},
			},
		});

		const response = productsWithLikes
			.map((product) => ({
				id: product.id,
				product_name: product.product_name,
				likesCount: product.likes.length,
				likes: product.likes,
				owner: product.owner,
			}))
			.sort((a, b) => b.likesCount - a.likesCount);

		res.status(200).json({ success: true, data: response });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Error retrieving product likes",
		});
	}
});
