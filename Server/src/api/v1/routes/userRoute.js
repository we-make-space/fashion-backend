import express from "express";
import {
	checkUserExists,
	CreateUser,
	DeleteUser,
	followStatus,
	followUser,
	getAllSeller,
	GetAllUsers,
	GetUser,
	getUserFollowers,
	getUserFollowing,
	getUserId,
	GetUserProducts,
	unfollowUser,
	upadateAllUsersRole,
	UpdateUser,
} from "../controllers/userController.js";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";
import { authMiddleware, handleAuthErrors } from "../../../middlewares/auth.js";
import { authMiddlewarez } from "../../../middlewares/authz.js";

const router = express.Router();
// router.use(authMiddleware);
//? Creating a user
router.post("/", logAction("Creating a new user"), CreateUser);

//? Checking if a user exists
router.get(
	"/user/checkUserExists",
	logAction("Checking if current user exists"),
	checkUserExists
);

router.get('/:id', logAction("Fetching a user"), GetUser);

//? Get all users
router.get("/all", logAction("Fetching all users"), GetAllUsers);

//? Update a user by ID
router.patch("/:id", logAction("Updating a user by ID"), UpdateUser);

//? Delete a user by ID
router.delete("/:id", logAction("Deleting a user by ID"), DeleteUser);

// Get products for a specific user by user ID
router.get("/:id", (req, res, next) => {
	const { id } = req.params;
	logger.info(`Fetching products for user with ID: ${id}`);
	GetUserProducts(req, res).catch((error) => {
		logger.error(
			`Error fetching products for user with ID ${id}: ${error.message}`
		);
		next(error);
	});
});

router.get("/sellers/all", logAction("Fetching all sellers"), getAllSeller);

router.put("/updateRole", logAction("Updating roles"), upadateAllUsersRole)

router.post(
    "/:id/follow",
    logAction("Creating a new follower"),
    followUser,
    logError
);
router.delete(
    "/:id/unfollow",
    logAction("Deleting a follower"),
    unfollowUser,
    logError
);
router.get('/:id/followStatus', logAction("Checking follow status"), followStatus);

router.get("/me/user",logAction("Fetching current user"), getUserId);

export { router as userRoute };
