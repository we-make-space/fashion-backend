import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "../../utils/logger.js";
import { userRoute } from "./routes/userRoute.js";
import { productRoute } from "./routes/productRoute.js";
import { categoryRoute } from "./routes/categoryRoute.js";
import { reviewRoute } from "./routes/reviewRoute.js";
import { cartRoute } from "./routes/cartRoute.js";
import { cartItemRoute } from "./routes/cartItemRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Middleware to log each request
app.use((req, res, next) => {
	logger.info(`Received ${req.method} request for ${req.url}`);
	next();
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/cartItem", cartItemRoute);

// Error handling middleware
app.use((err, req, res, next) => {
	logger.error(`Error occurred: ${err.message}`);
	res.status(500).json({ error: "Something went wrong" });
});

// Start the server
app.listen(PORT, () => {
	logger.info(`Server is running successfully on PORT ${PORT}`);
});
