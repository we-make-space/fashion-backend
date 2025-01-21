/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API routes for managing the shopping cart.
 */

/**
 * @swagger
 * /cart/addtocart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add to the cart.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add to the cart.
 *     responses:
 *       200:
 *         description: Product added to the cart successfully.
 *       400:
 *         description: Invalid request or missing fields.
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * /cart/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to remove from the cart.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from the cart successfully.
 *       404:
 *         description: Product not found in the cart.
 */

/**
 * @swagger
 * /cart/update/{productId}:
 *   put:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to update in the cart.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: The new quantity of the product in the cart.
 *     responses:
 *       200:
 *         description: Product quantity updated successfully.
 *       400:
 *         description: Invalid quantity or missing fields.
 *       404:
 *         description: Product not found in the cart.
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all items in the cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: A list of all items in the cart.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Create a new cart for a user
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user for whom the cart is being created.
 *     responses:
 *       201:
 *         description: Cart created successfully.
 *       400:
 *         description: Invalid request or missing fields.
 */
