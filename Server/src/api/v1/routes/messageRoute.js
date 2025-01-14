import express from "express";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";
import { createMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.get(
    "/:chatId",
    logAction("Fetching all messages"),
    getMessages,
    logError
)

router.post(
    "/",
    logAction("Creating a new message"),
    createMessage,
    logError
)

export { router as messageRoute };