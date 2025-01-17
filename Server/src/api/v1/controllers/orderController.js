import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

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
	// Extract page and limit from query parameters, set defaults if not provided
	const page = parseInt(req.query.page, 10) || 1; // Default to page 1
	const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
	const skip = (page - 1) * limit;

	// Fetch paginated orders
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
		},
	});

	// Fetch total number of orders for pagination metadata
	const totalOrders = await prisma.order.count();

	// Calculate total pages
	const totalPages = Math.ceil(totalOrders / limit);

	// Return response with pagination metadata
	res.status(200).json({
		data: orders,
		meta: {
		totalOrders,
		currentPage: page,
		totalPages,
		},
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
export const updateOrder = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { status, total, } = req.body;
	try {
		const order = await prisma.order.update({
			where: { id },
			data: {
				status,
				total,
				
			},
		});
		res.status(200).json(order);
	} catch (error) {
		console.error("Error updating order:", error);
		res.status(500).json({ error: "An error occurred while updating the order" });
	}
});
