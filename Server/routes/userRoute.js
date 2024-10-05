import express from "express";
import { CreateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", CreateUser);

export { router as userRoute };
