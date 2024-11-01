import express from "express";
import {
	CreateUser,
	DeleteUser,
	GetAllUsers,
	GetUserProducts,
	UpdateUser,
} from "../controllers/userController.js";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

const router = express.Router();

//? Creating a user
router.post("/", logAction("Creating a new user"), CreateUser);

//? Get all users
router.get("/all", logAction("Fetching all users"), GetAllUsers);

//? Update a user by ID
router.patch("/:id", logAction("Updating a user by ID"), UpdateUser);

//? Delete a user by ID
router.delete("/:id", logAction("Deleting a user by ID"), DeleteUser);

//? Get products for a specific user by user ID
router.get(
	"/:id",
	logAction("Fetching products for a specific user"),
	GetUserProducts
);

router.use(logError);

export { router as userRoute };
