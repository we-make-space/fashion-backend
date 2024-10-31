import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
// import { body, validationResult } from "express-validator";

//! Create a new user method

export const CreateUser = asyncHandler(async (req, res) => {
	console.log("creating a user");

	let { email } = req.body;
	const userExists = await prisma.user.findUnique({
		where: { email: email },
	});
	if (!userExists) {
		const user = await prisma.user.create({ data: req.body });
		res.send({
			message: "User registered successfully",
			user: user,
		});
	} else res.status(209).send({ message: "User already registered" });
});

//* Get all users method

export const GetAllUsers = asyncHandler(async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				comment: true,
				likes: true,
				ownedProducts: true,
			},
		});

		if (!users || users.length === 0) {
			return res.status(404).json({ message: "No users found" });
		}

		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users:", error);

		res.status(500).json({
			error: "An error occurred while fetching users",
			details: error.message,
		});
	}
});

//* Updating a user
export const UpdateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { firstName, lastName, image, bio, phoneNumber } = req.body;

	try {
		const user = await prisma.user.update({
			where: { id },
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
	const { id } = req.params;

	try {
		await prisma.user.delete({ where: { id } });
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(500).json({ error: error.message });
	}
});

//! Get specific products owned by a user

export const GetUserProducts = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const user = await prisma.user.findUnique({
			where: { id },
			include: { ownedProducts: true },
		});
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user.ownedProducts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});