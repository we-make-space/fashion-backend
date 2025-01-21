// import dotenv from "dotenv";
import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

// dotenv.config();

const authMiddleware = expressjwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://dev-dksewc7q6mj7vink.us.auth0.com/.well-known/jwks.json'
	}),
	audience: 'fashion_house_app',
	issuer: 'https://dev-dksewc7q6mj7vink.us.auth0.com/',
	algorithms: ['RS256']
}).unless({ path: [''] }); //^ put routes that you would want to access without authentication

// app.use((req, res, next) => {
// 	const token = req.headers.authorization?.split(" ")[1]; // Bearer token
// 	if (token) {
// 		const payload = jwt.decode(token);
// 		if (payload.exp < Date.now() / 1000) {
// 			return res.status(401).send("Token expired");
// 		}
// 	}
// 	next();
// });

//^ Custom error handler middleware
const handleAuthErrors = (err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		logger.error(`Unauthorized access attempt: ${req.originalUrl}`, {
			ip: req.ip,
			headers: req.headers
		});
		return res.status(401).send('Invalid token');
	}
	next(err);
};

export { authMiddleware, handleAuthErrors };
