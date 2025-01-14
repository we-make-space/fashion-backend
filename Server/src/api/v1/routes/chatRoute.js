import express from "express";
import { createChat, findChat, findUserChat } from "../controllers/chatController.js";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";


const router = express.Router();

router.post("/", logAction("Creating a new chat"), createChat, logError);
router.get("/find/:senderId/:receiverId", logAction("Fetching all chats"), findChat, logError);
router.get("/:id", logAction("Fetching user chats"), findUserChat, logError);

export { router as chatRoute };
