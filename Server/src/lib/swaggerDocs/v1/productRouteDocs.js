/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API routes related to product operations.
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product's name.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The product's price.
 *               description:
 *                 type: string
 *                 description: The product's description.
 *               image:
 *                 type: string
 *                 description: The product's image URL.
 *     responses:
 *       201:
 *         description: Product created successfully.
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Fetch all products with pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: The page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: The number of products to fetch per page.
 *     responses:
 *       200:
 *         description: A list of products with pagination.
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Fetch all products for dashboard
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products for the dashboard.
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Fetch a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details fetched successfully.
 */

/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the product.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The new price of the product.
 *               description:
 *                 type: string
 *                 description: The new description of the product.
 *               image:
 *                 type: string
 *                 description: The new image URL of the product.
 *     responses:
 *       200:
 *         description: Product updated successfully.
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 */

/**
 * @swagger
 * /{productId}/comment:
 *   post:
 *     summary: Add a comment to a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The comment text.
 *     responses:
 *       201:
 *         description: Comment added successfully.
 */

/**
 * @swagger
 * /{productId}/product-comments:
 *   get:
 *     summary: Fetch comments for a specific product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID.
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: The page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: The number of comments to fetch per page.
 *     responses:
 *       200:
 *         description: A list of comments for the product.
 */

/**
 * @swagger
 * /{commentId}/{userId}/like-comment:
 *   post:
 *     summary: Like a comment
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The comment ID.
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The user ID who is liking the comment.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully liked the comment.
 */

/**
 * @swagger
 * /likes/product/like:
 *   post:
 *     summary: Like a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product ID to be liked.
 *               userId:
 *                 type: string
 *                 description: The user ID who is liking the product.
 *     responses:
 *       200:
 *         description: Successfully liked the product.
 */

/**
 * @swagger
 * /product/{productId}/likes:
 *   get:
 *     summary: Get all likes on a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID to fetch likes for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of likes on the product.
 */

/**
 * @swagger
 * /comment/{commentId}/likes:
 *   get:
 *     summary: Get all likes on a comment
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The comment ID to fetch likes for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of likes on the comment.
 */

/**
 * @swagger
 * /products/likes:
 *   get:
 *     summary: Get all likes across all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of all likes across products.
 */
