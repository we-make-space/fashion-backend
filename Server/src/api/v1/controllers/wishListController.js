import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";


export const addToWishList = asyncHandler(async (req, res) => {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
        return res.status(400).json({ message: "Product ID and User ID are required" });
    }

    try {
        const wishList = await prisma.wishlist.create({
            data: {
                productId,
                userId,
            },
        });
        res.status(201).json(wishList);
    } catch (error) {
        console.error(error);    
        res.status(500).json({ message: "Failed to add product to wish list" });

    }
});