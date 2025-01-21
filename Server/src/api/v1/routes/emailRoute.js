import express from 'express';
// import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";
import { sendEmail } from '../controllers/emailControllers.js';

const router = express.Router();

router.post(
	'/',
	// logAction("Sending an email"),
	sendEmail
	// logError
);

export { router as emailRoute };
