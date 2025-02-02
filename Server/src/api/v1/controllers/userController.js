import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { Role } from "@prisma/client";
// import { Role } from "@prisma/client";
// import { Role } from "@prisma/client";

// import { body, validationResult } from "express-validator";

//* Create a new user method

export const CreateUser = asyncHandler(async (user) => {
	console.log("Creating a user");

	try {
		const { given_name, family_name, picture } = user;

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: {
				auth0Id: user.sub,
			},
		});

		if (existingUser) {
			throw new Error(`User with email ${user.sub} already exists.`);
		}

		// Create new user
		const newUser = await prisma.user.create({
			data: {
				email: user.email,
				firstName: given_name,
				lastName: family_name,
				image: picture,
				bio: "",
				auth0Id: user.sub,
				phoneNumber: "000-000-0000",
				Cart: {
					create: {}, //? Create an empty cart for the user
				},
				// Include optional fields with default values if necessary
				role: "USER",
				coverImage: null,
				cartId: null,
				comment: {},
				likes: {},
				reviews: {},
				followers: {},
				following: {},
				ownedProducts: {},
				wishlist: {},
				addresses: {},
				orders: {},
				sellerProfile: {},
				messages: {}
			},
			include: {
				Cart: true,
			},
		});

		console.log("New user created:", newUser);
	} catch (error) {
		console.error("Error creating user:", error);
	}
});

// ^ A controller to check if current user exist

export const checkUserExists = asyncHandler(async (req, res) => {
	const { email } = req.query;

	if (!email) {
		return res.status(400).json({ error: "Email parameter is required" });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Return the user info directly without restructuring
		return res.status(200).json({
			userExists: true,
			userInfo: user,
		});
	} catch (error) {
		console.error("Error checking user existence:", error);
		return res.status(500).json({
			error: "An error occurred while checking user existence",
		});
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
				reviews: true,
				ownedProducts: {
					include: {
						likes: true,
						reviews: true,
						// orders: true,
						owner: true,
						comments: true,
					},
				},
			},
		});

		const usersWithCart = users.map((user) => ({
			...user,
			cart: user.cart || { id: null }, // Provide a default value for cart if it doesn't exist
		}));

		if (usersWithCart.length === 0) {
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

//* Update a user

export const UpdateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const updateData = {};

	if (req.body.firstName) updateData.firstName = req.body.firstName;
	if (req.body.lastName) updateData.lastName = req.body.lastName;
	if (req.body.image) updateData.image = req.body.image;
	if (req.body.bio) updateData.bio = req.body.bio;
	if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
	if (req.body.role) updateData.role = Role[req.body.role.toUpperCase()];

	try {
		const user = await prisma.user.update({
			where: { id },
			data: updateData,
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

// ^ Get user
export const GetUserAuth = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { auth0Id: id },
			include: {
				ownedProducts: true,
			}
		});
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
export const GetUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				ownedProducts: true,
			}
		});
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// * Get all users that are following a user

export const getUserFollowers = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				followers: {
					select: {
						id: true,
						follower: {
							select: {
								firstName: true,
								lastName: true,
								email: true,
							},
						},
					},
				},
			},
		});
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user.followers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// ^ Get all users that a user is following
export const getUserFollowings = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				following: {
					select: {
						followee: {
							include: {
								ownedProducts: true,
							},
						},
					},
				},
			},
		});
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user.following);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});


export const upadateAllUsersRole = asyncHandler(async (req, res) => {
	const { role } = req.body;
	role.toUpperCase();

	try {
		if (!role) {
			return res.status(400).json({ message: "role is required" });
		}
		if (role.toUpperCase() !== "ADMIN" && role.toUpperCase() !== "SELLER") {
			return res.status(400).json({ message: "Invalid role" });
		}
		const updatedUsers = await prisma.user.updateMany({
			data: { role: Role[role.toUpperCase()] },
		});
		res.status(200).json(updatedUsers);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});


export const toggleFollowUser = asyncHandler(async (req, res) => {
	const followingId = req.params.id;
	const { followerId } = req.body;

	if (!followerId || !followingId) {
		return res
			.status(400)
			.json({ message: "Missing followerId or followingId" });
	}
	if (followerId === followingId) {
		return res.status(400).json({ message: "You cannot follow yourself" });
	}
  
	try {
	  const followerExists = await prisma.follower.findUnique({
		where: { followerId_followeeId: { followerId, followeeId: followingId } },
	  });
  
	  if (followerExists) {
		return res.status(400).json({ message: "You are already following this user" });
	  }
  
	  await prisma.follower.create({
		data: {
		  followerId,
		  followeeId: followingId,
		},
	  });
  
	  res.status(201).json({ message: "User followed successfully" });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: "Error following user" });
	}
  });
  
  // Unfollow a user
  export const unfollowUser = asyncHandler(async (req, res) => {
	const { followerId, followingId } = req.body;
  
	if (!followerId || !followingId) {
	  return res.status(400).json({ message: "Missing followerId or followingId" });
	}
	if (followerId === followingId) {
	  return res.status(400).json({ message: "You cannot unfollow yourself" });
	}
  
	try {
	  const followerExists = await prisma.follower.findUnique({
		where: { followerId_followeeId: { followerId, followeeId: followingId } },
	  });
  
	  if (!followerExists) {
		return res.status(400).json({ message: "You are not following this user" });
	  }
  
	  await prisma.follower.delete({
		where: { followerId_followeeId: { followerId, followeeId: followingId } },
	  });
  
	  res.status(200).json({ message: "User unfollowed successfully" });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: "Error unfollowing user" });
	}
  });

// ? User following status
export const followStatus = asyncHandler(async (req, res) => {
	const followingId = req.params.id;
	const { followerId } = req.body;

	try {
		const followStatus = await prisma.follower.findFirst({
			where: {
				followerId: followerId,
				followeeId: followingId,
			},
		});

		if (followStatus) {
			res.json({ isFollowing: true });
		} else {
			res.json({ isFollowing: false });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export const getUserId = asyncHandler(async (req, res) => {
	const { email } = req.body;
	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user.id);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export const getUserOrder = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
const orders = await prisma.order.findMany({
  where: { userId: id },
  orderBy: {
	createdAt: 'desc'
  },
  include: {
	Shipping: {
	  include: {
		address: true
	  }
	},
	items: {
	  include: {
		product: {
		  include: {
			owner: {
			  select: {
				firstName: true,
				lastName: true,
				image: true,
			  },
			}
		  }
		}
	  }
	},
	user: true
  }
});

		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export const checkAuth = asyncHandler(async (req, res) => {
	console.log(req.oidc);
	if(req.oidc.isAuthenticated()) {
		console.log(req.oidc.user);
		return res.status(200).json({isAuthenticated: true, user: req.oidc.user});
	}else{
		return res.status(200).json({isAuthenticated: false});
	}
});
