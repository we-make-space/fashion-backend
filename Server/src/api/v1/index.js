import { transformSync } from "@babel/core";
transformSync("code", {
	presets: ["@babel/preset-react"],
  });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import logger from "../../utils/logger.js";
import { userRoute } from "./routes/userRoute.js";
import { productRoute } from "./routes/productRoute.js";
import { categoryRoute } from "./routes/categoryRoute.js";
import { reviewRoute } from "./routes/reviewRoute.js";
import { cartRoute } from "./routes/cartRoute.js";
import { cartItemRoute } from "./routes/cartItemRoute.js";
import { corsOptions } from "../../middlewares/sitesAuthorization.js";
import { addressRoute } from "./routes/addressRoute.js";
import { inventoryRoute } from "./routes/inventoryRoute.js";
import swaggerSpec from "../../lib/swagger.js";
import { orderRoute } from "./routes/orderRoute.js";
import { emailRoute } from "./routes/emailRoute.js";
import { sendSmsRoute } from "./routes/send-smsRoute.js";
import { redisClient } from "./config/Redis.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(cors(corsOptions));

//^ Middleware to log each request
app.use((req, res, next) => {
	logger.info(`Received ${req.method} request for ${req.url}`);
	next();
});

//^ Serve Swagger UI with CORS enabled for the docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/images', express.static('images'));
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/cartItem", cartItemRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/emails", emailRoute)
app.use("/api/v1/sendSmsRoute", sendSmsRoute);



await redisClient.connect();
await redisClient.ping(); 

//~ Error handling middleware
app.use((err, req, res, next) => {
	logger.error(`Error occurred: ${err.message}`);
	res.status(500).json({ error: "Something went wrong" });
});

//* Start the server
app.listen(PORT, () => {
	logger.info(`Server is running successfully on PORT ${PORT}`);
	console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
