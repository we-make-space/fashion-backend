import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrder,
} from "../controllers/orderController.js";
// import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";

const router = express.Router();

router.post(
    "/",
    // logAction("Creating a new order"),
    createOrder,
    // logError
);

router.get(
    "/",
    // logAction("Fetching all orders"),
    getAllOrders,
    // logError
);

router.get(
    "/:id",
    // logAction("Fetching an order"),
    getOrder,
    // logError
);

router.put(
    "/:id",
    // logAction("Updating an order"),
    updateOrder,
    // logError
);

export { router as orderRoute}
