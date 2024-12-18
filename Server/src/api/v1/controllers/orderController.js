import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createOrder = asyncHandler(async (req, res) => {
    const { userId, status, totalAmount, orderItems, addressId } = req.body;
    try {
     
        const order = await prisma.order.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                status: status || "PENDING",
                totalAmount,
                items: {
                    create: await Promise.all(orderItems.map(async item => {
                        const product = await prisma.product.findUnique({
                            where: { id: item.productId },
                            select: { price: true },
                        });
                        if (!product) {
                            throw new Error(`Product with id ${item.productId} not found`);
                        }
                        return {
                            product: {
                                connect: { id: item.productId },
                            },
                            quantity: item.quantity,
                            price: product.price,
                        };
                    })),
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

        res.status(201).json({ message: "Order created successfully", order});
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "An error occurred while creating the order" });
    }
});

/**
 * Get all orders
 */
export const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await prisma?.order?.findMany(
          {
            include: {
              orderItems: {
            include: {
              product: true,
              quantity: true
            }
              }
            }
          }
        );
        if (!orders) {
            return res.status(500).json({ error: "An error occurred while fetching orders" });
        }
        res.status(200).json(orders);
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
