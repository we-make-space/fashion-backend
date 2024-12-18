import express from "express";
import {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../controllers/addressControllers.js";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

const router = express.Router();

router.post(
	"/:userId",
	logAction("Creating an address for the user/location"),
	addAddress,
	logError
);

router.get(
	"/:userId",
	logAction("Get address from the database/location"),
	getAddresses,
	logError
);

router.patch(
	"/addresses/:addressId",
	logAction("Updating an address/location"),
	updateAddress,
	logError
);

router.delete(
	"/addresses/:addressId",
	logAction("Deleting an address/location"),
	deleteAddress,
	logError
);

router.patch(
	"/addresses/:addressId/default",
	logAction("Updating a default address/location"),
	setDefaultAddress,
	logError
);

export { router as addressRoute };
