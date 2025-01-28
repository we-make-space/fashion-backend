import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { OrderStatus } from "@prisma/client";

//* Create order for products
export const createOrder = asyncHandler(async (req, res) => {
	const { userId, status, totalAmount, orderItems, addressId } = req.body;

	console.log("Received request to create order", orderItems);
	try {
	
		const order = await prisma.order.create({
			data: {
				user: {
					connect: { id: userId },
				},
				status: status || "PENDING",
				totalAmount,
items: {
createMany: {
	data: await Promise.all(orderItems.map(async item => {
	const product = await prisma.product.findUnique({
		where: { id: item.productId },
		select: { price: true },
	});
	if (!product) {
		throw new Error(`Product with id ${item.productId} not found`);
	}
	return {
		productId: item.productId,
		quantity: item.quantity,
		price: product.price,
	};
	})),
},
},
				Shipping: {
					create: {
						address: {
							connect: { 
								id: addressId
							},
						},
						carrier: "Emmmaaaa",
						trackingNumber: "1222222",
						status: "PENDING",
					}
				}
			},
		});

		console.log("Order created successfully", order);

		res.status(201).json({ message: "Order created successfully", order});
	} catch (error) {
		console.error("Error creating order:", error);
		res.status(500).json({ error: "An error occurred while creating the order" });
	}
});

//* Get all orders with pagination
export const getAllOrders = asyncHandler(async (req, res) => {
	try {
	const page = parseInt(req.query.page, 10) || 1; 
	const limit = parseInt(req.query.limit, 10) || 10; 
	const skip = (page - 1) * limit;

	//* Fetch paginated orders
	const orders = await prisma.order.findMany({
		skip,
		take: limit,
		include: {
		items: {
			select: {
			product: {
				select: {
				product_name: true,
				price: true,
				product_image: true,
				owner: {
					select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					},
				},
				},
			},
			quantity: true,
			},
		},
		user: {
			select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
			},
		},
		Shipping: {
			select: {
			carrier: true,
			trackingNumber: true,
			address: {
				select: {
				id: true,
				street: true,
				city: true,
				town: true,
				Region: true,
				country: true,
				},
			},
			},
		},
		},
	});

	const totalOrders = await prisma.order.count();

	const totalPages = Math.ceil(totalOrders / limit);

	res.status(200).json({
		meta: {
			totalOrders,
			currentPage: page,
			totalPages,
		},
		data: orders,
	});
	} catch (error) {
	console.error("Error fetching orders:", error);
	res.status(500).json({ error: "An error occurred while fetching orders" });
	}
});


/**
 * Get an order by ID
 */
export const getOrder = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const order = await prisma.order.findUnique({
			where: { id },
			include:{
				items: {
					include: {
						product: true,
					}
				},
				Shipping: {
					include:{
						address: true
					}
				},
				user: {
					select: {
						firstName: true,
						lastName: true,
						email: true,
						phoneNumber: true,
						image: true
					}
				}

			}
		});
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.status(200).json(order);
	} catch (error) {
		console.error("Error fetching order:", error);
		res.status(500).json({ error: "An error occurred while fetching the order" });
	}
});

/**
 * Update an order
 */
/**
 * Update an order
 */
export const updateOrder = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { status: statusInput } = req.query;

	const status = Object.values(OrderStatus).find(
		(s) => s === statusInput.toUpperCase()
	);

	if (!status) {
		return res.status(400).json({
			error: `Invalid status. Supported statuses are: ${Object.values(OrderStatus).join(", ")}`,
		});
	}

	try {
		const order = await prisma.order.update({
			where: { id },
			data: { status },
		});

		res.status(200).json(order);
	} catch (error) {
		console.error("Error updating order:", error);
		res.status(500).json({ error: "An error occurred while updating the order" });
	}
});


