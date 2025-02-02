import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";


// * Get All Seller
export const getAllSeller = asyncHandler(async (req, res) => {
    try {
        const sellers = await prisma.user.findMany({
            where: {
                role: "SELLER",
                ownedProducts: {
                    some: {},
                },
            },
            include: {
                ownedProducts: true,
            },
        });

        if (!sellers || sellers.length === 0) {
            return res.status(404).json({ message: "No Seller found" });
        }

        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const getAllSellerProducts = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        const products = await prisma.product.findMany({
            where: {
                userEmail: email,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include:{
                OrderItem:true,
                comments: true,
                reviews: true,
                likes: true
            }
        });
        res.status(200).json(products);
    } catch (error) {
        throw new Error(error.message);
    }
});

export const getAllSellerOrders = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        const orders = await prisma.orderItem.findMany({
            where: {
                product: {
                    userEmail: email
                }
            },
            orderBy:{
                order: {
                    createdAt: 'desc'
                }
            },
            include: {
                order: {
                    include: {
                        Shipping: {
                            include: {
                                address: true
                            }
                        },
                        user: {
                            select:{
                                firstName: true,
                                lastName: true,
                                image: true
                            }
                        }
                    }
                },
                product: {
                    select:{
                        product_image: true,
                        product_name: true
                    }
                }
            }

        })
        res.status(200).json(orders);
    } catch (error) {
        throw new Error(error.message);
    }
});

export const getSellerOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const order = await prisma.orderItem.findUnique({
            where: {
                id: id
            },
            include: {
                order: {
                    include: {
                        Shipping: {
                            include: {
                                address: true
                            }
                        },
                        user: {
                            select:{
                                firstName: true,
                                lastName: true,
                                image: true,
                                email: true,
                                phoneNumber: true
                            }
                        }
                    }
                },
                product: {
                    select:{
                        product_image: true,
                        product_name: true,
                        product_description: true,
                        price: true
                    }
                }
            }
        })
        res.status(200).json(order);
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getTopSelleingProduct = asyncHandler(async (req, res) => {
    const {email} = req.params;

    try {
        const products = await prisma.product.findMany({
            where: {
                userEmail: email,
            },
            include: {
                OrderItem: {
                    include: {
                        order: true
                    }
                }
            } ,
            orderBy: {
                OrderItem: {
                    _count: 'desc',
                },
            },
            take: 3

        })

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
})



