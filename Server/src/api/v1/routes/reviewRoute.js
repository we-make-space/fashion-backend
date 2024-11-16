import express from "express";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

import { createReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post(
    "/",
    logAction("Creating a new review"),
    createReview,
    logError    
);  

export { router as reviewRoute };