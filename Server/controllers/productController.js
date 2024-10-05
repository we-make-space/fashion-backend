import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createProduct = asyncHandler(async (req, res) => {
	const {
		product_name,
		price,
		product_image,
		product_description,
		userEmail,
	} = req.body.data;

	console.log(req.body.data);
	try {
		const product = await prisma.product.create({
			data: {
				product_name,
				price,
				product_image,
				product_description,
				owner: { connect: { email: userEmail } },
			},
		});

		res.send({ message: "product created successfully", product });
	} catch (err) {
		if (err) {
			throw new Error(err.message);
		}
		throw new Error(err.message);
	}
});

// function to get all the documents/products
export const getAllProducts = asyncHandler(async (req, res) => {
	const products = await prisma.product.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
	res.send(products);
});

// function to get a specific document/product
export const getProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const product = await prisma.product.findUnique({
			where: { id },
		});
		res.send(product);
	} catch (err) {
		throw new Error(err.message);
	}
});
