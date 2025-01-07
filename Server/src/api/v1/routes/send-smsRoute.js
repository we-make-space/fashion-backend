import express from "express";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";
import { sendSms } from "../controllers/smsController.js";

const router = express.Router();

router.post(
    "/",
    logAction("Sending an sms"),
    sendSms,
    logError
);

export { router as sendSmsRoute };