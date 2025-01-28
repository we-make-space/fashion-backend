import express from "express";

import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";
import { followUser, unfollowUser } from "../controllers/followerController.js";
const router = express.Router();


router.post(
    "/",
    logAction("Creating a new follower"),
    followUser,
    logError
);
router.delete(
    "/",
    logAction("Deleting a follower"),
    unfollowUser,
    logError
);







export { router as followerRoute };