import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';
import { redisClient } from '../config/Redis.js';
import { cloudinary } from '../config/cloudinary.js';

//! A method to create a product
export const createProduct = asyncHandler(async (req, res) => {
	const data = JSON.parse(req.body.data);
	const {
		product_name,
		price,
		product_description,
	} = data;

	const categoryId = '6724d6341a85aabc45eeff0b';
	const userEmail = req.body.userEmail;

	try {
		if (req.files) {
			const uploadPromises = req.files.map(async (file) => {
				return await cloudinary.uploader.upload(file.path, {
					upload_preset: 'fashion-app'
				});
			});
			const uploadResults = await Promise.all(uploadPromises);

			if (uploadResults) {
				const product = await prisma.product.create({
					data: {
						product_name,
						price: parseFloat(price),
						product_image: uploadResults.map((r) => r.secure_url),
						product_description,
						owner: { connect: { email: userEmail } },
						category: { connect: { id: categoryId } },
					},
				});

				res.status(200).json({ message: 'product created successfully', product });
			}
		} else {
			throw new Error('Missing required parameter - file');
		}
	} catch (err) {
		throw new Error(err.message);
	}
});

//& function to get all the documents/products
// API route handler
export const getAllProducts = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;

	if (page < 1) {
		return res.status(400).json({ error: 'Page must be a positive integer.' });
	}
	if (limit < 1) {
		return res.status(400).json({ error: 'Limit must be a positive integer.' });
	}

	try {
		const skip = (page - 1) * limit;
		let products = null;
		const key = `allProduct:${page}:${limit}`;

		const value = await redisClient.get(key);
		if (value) {
			products = JSON.parse(value);
			console.log('Fetched from Redis');
		} else {
			products = await prisma.product.findMany({
				skip,
				take: limit,
				orderBy: {
					createdAt: 'desc'
				},
				include: {
					owner: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							image: true
						}
					},
					category: {
						select: {
							id: true,
							name: true
						}
					},
					reviews: {
						select: {
							rating: true,
							comment: true,
							userEmail: true,
							user: {
								select: {
									firstName: true,
									lastName: true,
									image: true
								}
							}
						}
					},
					Inventory: {
						select: {
							productId: true,
							stock: true
						}
					},
					comments: {
						select: {
							content: true,
							createdAt: true,
							userEmail: true,
							User: {
								select: {
									firstName: true,
									lastName: true,
									image: true
								}
							}
						}
					},
					likes: {
						select: {
							id: true,
							user: {
								select: {
									firstName: true,
									lastName: true,
									image: true
								}
							}
						}
					},
					_count: {
						select: {
							comments: true,
							likes: true
						}
					}
				}
			});

			await redisClient.set(key, JSON.stringify(products), {
				EX: 60
			});
			console.log('Fetched from Prisma');
		}

		const totalProducts = await prisma.product.count();
		const totalPages = Math.ceil(totalProducts / limit);

		res.status(200).json({
			totalProducts,
			totalPages,
			currentPage: page,
			hasMore: page < totalPages,
			data: products
		});
	} catch (error) {
		console.error('Error fetching products:', error);
		res.status(500).json({
			error: 'An error occurred while fetching products'
		});
	}
});

export const getAllSellerProducts = asyncHandler(async (req, res) => {
	const { email } = req.params;
	try {
		const products = await prisma.product.findMany({
			where: {
				userEmail: email,
			},

		});
		res.status(200).json(products);
	} catch (error) {
		throw new Error(error.message);
	}
});

//& function to get a single product
export const getProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const product = await prisma.product.findUnique({
			where: { id },
			include: {
				likes: {
					include: {
						user: {
							select: {
								firstName: true,
								lastName: true,
								image: true
							}
						}
					}
				},
				owner: {
					select: {
						firstName: true,
						lastName: true,
						image: true
					}
				},
				comments: {
					include: {
						User: {
							select: {
								firstName: true,
								lastName: true,
								image: true
							}
						}
					}
				},
				reviews: {
					include: {
						user: {
							select: {
								firstName: true,
								lastName: true,
								image: true
							}
						}
					}
				},
				Inventory: {
					select: {
						productId: true,
						stock: true
					}
				},
				category: {
					select: {
						name: true,
					},
				},
			},
		});

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//& Update an existing product
export const updateProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const {
		product_name,
		price,
		product_image,
		product_description,
		categoryId,
		sizes,
		colors,
		stock // Added stock to the request body
	} = req.body;

	try {
		console.log('Update request:', {
			id,
			product_name,
			price,
			product_image,
			product_description,
			categoryId,
			sizes,
			colors,
			stock // Added stock to the log
		});

		// Find the existing product
		const existingProduct = await prisma.product.findUnique({
			where: { id }
		});

		if (!existingProduct) {
			return res.status(404).json({ error: 'Product not found' });
		}

		console.log('Existing product:', existingProduct);

		// Update the product details
		const updatedProduct = await prisma.product.update({
			where: { id },
			data: {
				product_name: product_name !== undefined ? product_name : existingProduct.product_name,
				price: price !== undefined ? price : existingProduct.price,
				product_image: product_image !== undefined ? product_image : existingProduct.product_image,
				product_description:
					product_description !== undefined ? product_description : existingProduct.product_description,
				categoryId: categoryId !== undefined ? categoryId : existingProduct.categoryId,
				sizes: sizes !== undefined ? sizes : existingProduct.sizes,
				colors: colors !== undefined ? colors : existingProduct.colors
			}
		});

		console.log('Updated product:', updatedProduct);

		//? the stock is provided, update the inventory as well
		if (stock !== undefined) {
			const inventoryItem = await prisma.inventory.findUnique({
				where: { productId: id }
			});

			if (!inventoryItem) {
				//? creates the inventory item doesn't exist, create a new inventory record
				await prisma.inventory.create({
					data: {
						productId: id,
						stock
					}
				});
			} else {
				//? Update the stock of the existing inventory item
				await prisma.inventory.update({
					where: { productId: id },
					data: { stock }
				});
			}

			console.log('Inventory updated with stock:', stock);
		}

		res.status(200).json(updatedProduct);
	} catch (error) {
		console.error('Error updating product:', error);
		res.status(500).json({
			error: 'An error occurred while updating the product.'
		});
	}
});

//* Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	console.log(`Received DELETE request for /api/v1/products/${id}`);
	console.log('Deleting a product by ID');

	try {
		const product = await prisma.product.findUnique({
			where: { id },
			select: {
				product_image: true
			}
		});

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		if (product.product_image) {
			const publicIds = product.product_image.map((image) => image.split('/').pop().split('.')[0]);
			await Promise.all(publicIds.map((publicId) => cloudinary.uploader.destroy(publicId)));
		}

		await prisma.product.delete({
			where: { id }
		});

		res.status(200).json({
			message: 'Product deleted successfully',
			product
		});
	} catch (error) {
		if (error.code === 'P2025') {
			return res.status(404).json({ message: 'Product not found' });
		}

		console.error('Error deleting product:', error);

		res.status(500).json({
			error: 'An error occurred while deleting the product',
			details: error.message
		});
	}
});

//* Controller to add a comment to a product
export const addCommentToProduct = asyncHandler(async (req, res) => {
	const { content, userEmail } = req.body;
	const { productId } = req.params;

	try {
		const user = await prisma.user.findUnique({
			where: { email: userEmail }
		});

		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		const comment = await prisma.comment.create({
			data: {
				content,
				createdAt: new Date(),
				User: {
					connect: {
						email: userEmail
					}
				},
				product: {
					connect: {
						id: productId
					}
				}
			}
		});

		return res.status(201).json({
			message: 'Comment added successfully',
			data: comment
		});
	} catch (error) {
		console.error('Error adding comment:', error);
		return res.status(500).json({
			message: 'An error occurred while adding the comment',
			error: error.message
		});
	}
});

//? Getting comments on specific product
export const getCommentsForProduct = asyncHandler(async (req, res) => {
	try {
		const { productId } = req.params;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		if (isNaN(page) || page < 1) {
			return res.status(400).json({ message: 'Page must be a positive integer.' });
		}
		if (isNaN(limit) || limit < 1) {
			return res.status(400).json({ message: 'Limit must be a positive integer.' });
		}

		const skip = (page - 1) * limit;

		const comments = await prisma.comment.findMany({
			where: { productId },
			include: {
				User: {
					select: {
						firstName: true,
						lastName: true,
						image: true
					}
				}
			},
			skip: skip,
			take: limit,
			orderBy: {
				createdAt: 'desc'
			}
		});

		const totalComments = await prisma.comment.count({
			where: { productId }
		});

		const totalPages = Math.ceil(totalComments / limit);

		res.status(200).json({
			message: 'Comments retrieved successfully',
			totalComments,
			totalPages,
			currentPage: page,
			hasMore: page < totalPages,
			data: comments
		});
	} catch (error) {
		console.error('Error fetching comments:', error);
		res.status(500).json({
			message: 'An error occurred while fetching comments'
		});
	}
});

//* Toggle like on a comment
export const likeComment = asyncHandler(async (req, res) => {
	console.log('Received request to toggle comment like');
	console.log('Request body:', req.body);

	let { userId, commentId } = req.body;

	if (!userId && req.params.userId) {
		userId = req.params.userId;
	}
	if (!commentId && req.params.commentId) {
		commentId = req.params.commentId;
	}

	if (!userId || !commentId) {
		console.log('Missing required fields:', { userId, commentId });
		res.status(400);
		throw new Error(`User ID and Comment ID are required. Received: userId=${userId}, commentId=${commentId}`);
	}

	try {
		console.log('Looking up comment:', commentId);
		const comment = await prisma.comment.findUnique({
			where: {
				id: commentId
			},
			select: {
				id: true,
				productId: true,
				content: true
			}
		});

		console.log('Found comment:', comment);

		if (!comment) {
			console.log('Comment not found:', commentId);
			res.status(404);
			throw new Error('Comment not found');
		}

		console.log('Checking for existing like');
		const existingLike = await prisma.like.findFirst({
			where: {
				userId: userId,
				commentId: commentId
			}
		});

		console.log('Existing like:', existingLike);

		if (existingLike) {
			console.log('Deleting existing like');
			await prisma.like.delete({
				where: {
					id: existingLike.id
				}
			});

			console.log('Like deleted successfully');
			res.status(200).json({
				message: 'Comment unliked successfully',
				liked: false
			});
		} else {
			console.log('Creating new like');
			const newLike = await prisma.like.create({
				data: {
					userId: userId,
					productId: comment.productId,
					commentId: commentId
				}
			});

			console.log('New like created:', newLike);
			res.status(201).json({
				message: 'Comment liked successfully',
				liked: true,
				like: newLike
			});
		}
	} catch (error) {
		console.error('Error in toggleCommentLike:', error);
		res.status(error.status || 400);
		throw error;
	}
});

export const likeProduct = asyncHandler(async (req, res) => {
	try {
		const { userId, productId, commentId } = req.body.data;

		console.log('Received userId:', userId);
		console.log('Received productId:', productId);
		console.log('Received commentId:', commentId);

		if (!userId || !productId) {
			return res.status(400).json({ message: 'userId and productId are required' });
		}

		// Check if the like already exists
		const existingLike = await prisma.like.findFirst({
			where: {
				userId,
				productId,
				...(commentId ? { commentId } : {})
			}
		});

		if (existingLike) {
			// If it exists, delete it (unlike)
			await prisma.like.delete({
				where: {
					id: existingLike.id
				}
			});
			return res.status(200).json({ message: 'Product unliked' });
		} else {
			// If it does not exist, create it (like)
			await prisma.like.create({
				data: {
					user: {
						connect: { id: userId }
					},
					product: {
						connect: { id: productId }
					},
					...(commentId && {
						comment: {
							connect: { id: commentId }
						}
					})
				}
			});

			console.log(`Like created for productId: ${productId}, userId: ${userId}`);

			return res.status(201).json({ message: 'Product liked' });
		}
	} catch (error) {
		console.error('Error toggling like for product:', error);
		return res.status(500).json({ message: 'An error occurred while toggling like', error });
	}
});

//? Get likes count for a product
export const getProductLikes = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	try {
		// Check the likes for the product where commentId is null
		const likesCount = await prisma.like.count({
			where: {
				productId: productId,
				commentId: null // Only count likes for the product, not comments
			}
		});

		console.log('Likes count:', likesCount); // Add this to log the count

		res.status(200).json({
			productId: productId,
			likesCount: likesCount
		});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//? Get likes count for a comment
export const getCommentLikes = asyncHandler(async (req, res) => {
	const { commentId } = req.params;

	try {
		const likesCount = await prisma.like.count({
			where: {
				commentId: commentId
			}
		});

		res.status(200).json({
			commentId: commentId,
			likesCount: likesCount
		});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

//? Get all product likes
export const getAllProductLikes = asyncHandler(async (req, res) => {
	try {
		const productsWithLikes = await prisma.product.findMany({
			include: {
				likes: true,
				owner: {
					select: {
						id: true,
						firstName: true,
						image: true
					}
				}
			}
		});

		const response = productsWithLikes
			.map((product) => ({
				id: product.id,
				product_name: product.product_name,
				likesCount: product.likes.length,
				likes: product.likes,
				owner: product.owner
			}))
			.sort((a, b) => b.likesCount - a.likesCount);

		res.status(200).json({ success: true, data: response });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Error retrieving product likes'
		});
	}
});

export const seachProduct = asyncHandler(async (req, res) => {
	const { search } = req.params;
	console.log(search);
	try {
		const products = await prisma.product.findMany({
			where: {
				product_name: {
					contains: search,
					mode: 'insensitive'
				}
			},
			include: {
				owner: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						image: true
					}
				},
				category: {
					select: {
						id: true,
						name: true
					}
				},
				reviews: {
					select: {
						rating: true,
						comment: true,
						userEmail: true,
						user: {
							select: {
								firstName: true,
								lastName: true,
								image: true
							}
						}
					}
				},
				Inventory: {
					select: {
						productId: true,
						stock: true
					}
				},
				comments: {
					select: {
						content: true,
						createdAt: true,
						userEmail: true,
						User: {
							select: {
								firstName: true,
								lastName: true,
								image: true
							}
						}
					}
				},
				likes: {
					select: {
						id: true,
						user: {
							select: {
								firstName: true,
								lastName: true,
								image: true
							}
						}
					}
				},
				_count: {
					select: {
						comments: true,
						likes: true
					}
				}
			}
		});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Error retrieving products' });
	}
});
