const allowedOrigins = [
	"http://localhost:8080",
	"http://localhost:5173",
];

export const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};