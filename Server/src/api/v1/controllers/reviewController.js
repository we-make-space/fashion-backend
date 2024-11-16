import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createReview = asyncHandler(async (req, res) => {
    const { productId, comment, userEmail, rating } = req.body;

    // Validate input data
    if (!productId || !comment || !userEmail || !rating) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if rating is a number and not greater than 5
    if (typeof rating !== 'number' || rating > 5) {
      return res.status(400).json({ message: 'Rating must be a number and not greater than 5' });
    }

    // Create review
    try {
      const newReview = await prisma.review.create({
        data: {
          product: { connect: { id: productId } },  
          user: { connect: { email: userEmail } },
          comment,
          rating
        },
      });    
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})