import winston from "winston";

const authenticationLogger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: path.join("logs", "auth-failures.log") }),
	],
});

export default authenticationLogger;