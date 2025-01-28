import { transformSync } from "@babel/core";
transformSync("code", {
	presets: ["@babel/preset-react"],
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
// import logger from "../../utils/logger.js";
import { corsOptions } from "../../middlewares/sitesAuthorization.js";
import swaggerSpec from "../../lib/swagger.js";
import { v1Router } from "./routes/routes.js";
import { redisClient } from "./config/Redis.js";
import { Server } from "socket.io";
import fs from "fs";
import { auth } from "express-openid-connect";
import { CreateUser } from "./controllers/userController.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9001;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
	postLogoutRedirect: process.env.CLIENT_URL
  } 
};
app.use(auth(config));

app.get("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    await CreateUser(req.oidc.user);
    return res.redirect(process.env.CLIENT_URL);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true
}));
app.use(v1Router);
// auth router attaches /login, /logout, and /callback routes to the baseURL

// app.use(cors(corsOptions));


//^ Middleware to log each request
// app.use((req, res, next) => {
// 	logger.info(`Received ${req.method} request for ${req.url}`);
// 	next();
// });


//^ Serve Swagger UI with CORS enabled for the docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

await redisClient.connect();
await redisClient.ping(); 


// Initialize a new Socket.io server with CORS settings
const io = new Server({ cors: { origin: "http://localhost:5173" } });


// Array to keep track of online users
let onlineUsers = [];


// Listen for new connections
io.on("connection", (socket) => {
console.log("a user connected", socket.id); // Log when a user connects


// Handle new user addition
socket.on("addNewUser", (userId) => {
	// Check if the user is already in the list, if not, add them
	const user = onlineUsers.find((user) => user.userId === userId);
	if (!user) {
	onlineUsers.push({ userId, socketId: socket.id });
	}
	console.log("onlineUsers", onlineUsers); // Log the updated online users list

	// Emit the updated list of online users to all clients
	io.emit("getOnlineUsers", onlineUsers);
});

socket.on("sendMessage", (data) => {
	const user = onlineUsers.find((user) => user.userId === data.recipientId);
	console.log("data", data);


	if (user) {
	io.to(user.socketId).emit("getMessage", data);
	console.log("user", user);
	} else {
	console.log("User not found");
	}
});


// Handle user disconnection
socket.on("disconnect", () => {
	// Remove the user from the online users list
	onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
	console.log("onlineUsers after disconnect", onlineUsers); // Log the updated list after disconnection

	// Emit the updated list of online users to all clients
	io.emit("getOnlineUsers", onlineUsers);
});
});

// Start the server on port 9000
io.listen(9000);

//~ Error handling middleware
// app.use((err, req, res, next) => {
// 	logger.error(`Error occurred: ${err.message}`);
// 	res.status(500).json({ error: "Something went wrong" });
// });


//* Start the server
app.listen(PORT, () => {
	(`Server is running successfully on PORT ${PORT}`);
	console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});