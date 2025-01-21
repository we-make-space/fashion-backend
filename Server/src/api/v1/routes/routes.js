import express from "express";
import { chatRoute } from "./chatRoute.js";
import { messageRoute } from "./messageRoute.js";
import { sellerRoute } from "./sellerRoute.js";
import { orderRoute } from "./orderRoute.js";
import { emailRoute } from "./emailRoute.js";
import { sendSmsRoute } from "./send-smsRoute.js";
import { addressRoute } from "./addressRoute.js";
import { inventoryRoute } from "./inventoryRoute.js";
import { userRoute } from "./userRoute.js";
import { productRoute } from "./productRoute.js";
import { categoryRoute } from "./categoryRoute.js";
import { reviewRoute } from "./reviewRoute.js";
import { cartRoute } from "./cartRoute.js";
import { cartItemRoute } from "./cartItemRoute.js";

const API_VERSION = "/api/v1";
const v1Router = express.Router();

const routes = [
    { path: "/users", route: userRoute },
    { path: "/products", route: productRoute },
    { path: "/categories", route: categoryRoute },
    { path: "/reviews", route: reviewRoute },
    { path: "/cart", route: cartRoute },
    { path: "/cartItem", route: cartItemRoute },
    { path: "/address", route: addressRoute },
    { path: "/orders", route: orderRoute },
    { path: "/inventory", route: inventoryRoute },
    { path: "/emails", route: emailRoute },
    { path: "/sendSmsRoute", route: sendSmsRoute },
    { path: "/chats", route: chatRoute },
    { path: "/messages", route: messageRoute },
    { path: "/sellers", route: sellerRoute }
];

routes.forEach(({ path, route }) => {
    v1Router.use(`${API_VERSION}${path}`, route);
});

export { v1Router };
