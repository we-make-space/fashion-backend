import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

export const authMiddlewarez = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri:
			"https://dev-dksewc7q6mj7vink.us.auth0.com.well-known/jwks.json",
	}),
	audience: "fashion_house_app",
	issuer: `https://dev-dksewc7q6mj7vink.us.auth0.com/`,
	algorithms: ["RS256"],
});
