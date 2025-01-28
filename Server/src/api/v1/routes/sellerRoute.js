import express from "express";
// import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";
import { getAllSeller, getAllSellerOrders, getAllSellerProducts, getSellerOrderById, getTopSelleingProduct } from "../controllers/sellerController.js";


const router = express.Router();

router.get("/all", 
	// logAction("Fetching all sellers"), 
	getAllSeller);

router.get(
	"/sellerProducts/:email",
	// logAction("Fetching all seller products by email"),
	getAllSellerProducts,
	// logError
);

router.get("/SellerOrders/:email", 
	// logAction("Fetching all seller orders"), 
	getAllSellerOrders,	
	// logError
);

router.get("/sellerOrderById/:id", 
	// logAction("Fetching all seller orders by id"), 
	getSellerOrderById,	
	// logError
);

router.get("/topSellingProducts/:email", 
	// logAction("Fetching all seller orders by id"), 
	getTopSelleingProduct,	
	// logError
);




export { router as sellerRoute };