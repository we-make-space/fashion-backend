import winston from "winston";
import path from "path";

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(({ timestamp, level, message }) => {
			return `${timestamp} [${level.toUpperCase()}]: ${message}`;
		})
	),
	transports: [
		new winston.transports.Console(), // Log to the console
		new winston.transports.File({ filename: path.join("logs", "app.log") }), // Log to a file
	],
});

export default logger;