/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API routes related to order operations.
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user placing the order.
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of product IDs in the order.
 *               totalAmount:
 *                 type: number
 *                 format: float
 *                 description: The total amount of the order.
 *               shippingAddress:
 *                 type: string
 *                 description: The shipping address for the order.
 *               status:
 *                 type: string
 *                 description: The status of the order (e.g., 'pending', 'shipped', etc.).
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: Invalid input or missing fields.
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of all orders.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details retrieved successfully.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user placing the order.
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of product IDs in the order.
 *               totalAmount:
 *                 type: number
 *                 format: float
 *                 description: The total amount of the order.
 *               shippingAddress:
 *                 type: string
 *                 description: The shipping address for the order.
 *               status:
 *                 type: string
 *                 description: The status of the order (e.g., 'pending', 'shipped', etc.).
 *     responses:
 *       200:
 *         description: Order updated successfully.
 *       400:
 *         description: Invalid input or missing fields.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
