import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";

// Create a new review for a product

export const createReview = asyncHandler(async (req, res) => {
	const { rating, comment, productId, userEmail } = req.body;

	console.log("Received Review Data:", {
		rating,
		comment,
		productId,
		userEmail,
	});

	const parsedRating = Number(rating); // Attempt to convert rating to a number
	if (
		!rating ||
		isNaN(parsedRating) ||
		parsedRating < 1 ||
		parsedRating > 5
	) {
		return res.status(400).json({
			error: "Valid rating between 1-5 is required.",
		});
	}

	if (!comment || comment.trim() === "") {
		return res.status(400).json({
			error: "Comment cannot be empty.",
		});
	}

	if (!productId) {
		return res.status(400).json({
			error: "Product ID is required.",
		});
	}

	try {
		// Check if the product exists first
		const existingProduct = await prisma.product.findUnique({
			where: { id: productId },
		});

		if (!existingProduct) {
			return res.status(404).json({ error: "Product not found." });
		}

		// Optional: Check if user has already reviewed this product
		const existingReview = await prisma.review.findFirst({
			where: {
				productId,
				userEmail,
			},
		});

		if (existingReview) {
			return res.status(400).json({
				error: "You have already submitted a review for this product.",
			});
		}

		// Create the review
		const newReview = await prisma.review.create({
			data: {
				rating: Number(rating), // Ensure it's a number
				comment: comment.trim(),
				userEmail: userEmail || "guest@example.com",
				productId,
			},
		});

		res.status(201).json(newReview);
	} catch (error) {
		console.error("Detailed Review Creation Error:", error);

		// More specific error handling
		if (error.code === "P2002") {
			return res.status(409).json({
				error: "A review with these details already exists.",
			});
		}

		res.status(500).json({
			error: "An unexpected error occurred while creating the review.",
			details: error.message,
		});
	}
});

// Get all reviews for a specific product
export const getReviewsByProductId = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	try {
		const reviews = await prisma.review.findMany({
			where: { productId },
			include: {
				user: {
					select: {
						firstName: true,
						lastName: true,
						image: true,
					},
				},
			},
		});

		// Optionally, you can filter out any reviews without user data
		const filteredReviews = reviews.map((review) => ({
			...review,
			user: review.user || null, // Ensure user is null if not present
		}));

		res.status(200).json(filteredReviews);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});


// Update a review by ID
export const updateReview = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { rating, comment } = req.body;

	try {
		const review = await prisma.review.update({
			where: { id },
			data: { rating, comment },
		});
		res.status(200).json(review);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Delete a review by ID
export const deleteReview = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		await prisma.review.delete({
			where: { id },
		});
		res.status(204).send(); // No content response
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});