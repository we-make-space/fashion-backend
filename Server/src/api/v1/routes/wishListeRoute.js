import express from 'express';
// import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";
import { addToWishList } from '../controllers/wishListController.js';

const router = express.Router();

router.post(
	'/',
	// logAction("Creating a new wish List"),
	addToWishList
	// logError
);
