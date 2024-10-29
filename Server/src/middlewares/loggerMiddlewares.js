import logger from "../utils/logger.js";

// middlewares/loggerMiddleware.js

/**
 * Logs request information before calling the controller function.
 * @param {string} action - A description of the action being logged.
 * @returns {function} - An Express middleware function.
 */
const logAction = (action) => {
	return (req, res, next) => {
		logger.info(action);
		next();
	};
};

/**
 * Handles errors and logs them using Winston.
 */
const logError = (error, req, res, next) => {
	logger.error(`Error: ${error.message}`);
	next(error);
};

export { logAction, logError };