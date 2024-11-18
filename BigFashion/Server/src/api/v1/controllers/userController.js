import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//* Create a new user method

export const CreateUser = asyncHandler(async (req, res) => {
	console.log("Creating a user");

	try {
		const { email, firstName, lastName, image } = req.body;

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return res.status(200).json(existingUser);
		}

		// Create new user
		const newUser = await prisma.user.create({
			data: {
				email,
				firstName: firstName || "",
				lastName: lastName || "",
				image: image || "",
				bio: "",
				location: "",
				phoneNumber: "000-000-0000",
				Cart: {
					create: {}, //? Create an empty cart for the user
				},
				wishlist: {
					create: {}, //? Create an empty wishlist
				},
			},
			include: {
				Cart: true,
				wishlist: true,
			},
		});

		res.status(201).json(newUser);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Failed to create user" });
	}
});
//* Get all users method

export const GetAllUsers = asyncHandler(async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				comment: true,
				likes: true,
				ownedProducts: true,
			},
		});

		const usersWithCart = users.map((user) => ({
			...user,
			cart: user.cart || { id: null }, // Provide a default value for cart if it doesn't exist
		}));

		if (usersWithCart.length === 0) {
			return res.status(404).json({ message: "No users found" });
		}

		res.status(200).json(usersWithCart);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({
			error: "An error occurred while fetching users",
			details: error.message,
		});
	}
});

//* Update a user

export const UpdateUser = asyncHandler(async (req, res) => {
	// Use authenticated user's email to find their account
	const { email } = req.user;
	const { firstName, lastName, image, bio, phoneNumber } = req.body;

	try {
		const user = await prisma.user.update({
			where: { email },
			data: {
				firstName,
				lastName,
				image,
				bio,
				phoneNumber,
			},
		});
		res.status(200).json({ user, message: "User updated successfully" });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(500).json({ error: error.message });
	}
});

//* Delete a User

export const DeleteUser = asyncHandler(async (req, res) => {
	// Use authenticated user's email to find their account
	const { email } = req.user;

	try {
		await prisma.user.delete({ where: { email } });
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(500).json({ error: error.message });
	}
});

//* Get specific products owned by a user

export const GetUserProducts = asyncHandler(async (req, res) => {
	// Use authenticated user's email to find their account
	const { email } = req.user;

	try {
		const user = await prisma.user.findUnique({
			where: { email },
			include: { ownedProducts: true },
		});
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user.ownedProducts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
