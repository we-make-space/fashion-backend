/**
 * @swagger
 * tags:
 *   name: CartItems
 *   description: API routes for managing cart items.
 */

/**
 * @swagger
 * /cart-items:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [CartItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 description: The ID of the cart.
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add to the cart.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add to the cart.
 *     responses:
 *       200:
 *         description: Item added to the cart successfully.
 *       400:
 *         description: Invalid request or missing fields.
 *       404:
 *         description: Cart or product not found.
 */

/**
 * @swagger
 * /cart-items/{id}:
 *   patch:
 *     summary: Update a cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cart item to update.
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
 *                 description: The new quantity of the cart item.
 *     responses:
 *       200:
 *         description: Cart item updated successfully.
 *       400:
 *         description: Invalid quantity or missing fields.
 *       404:
 *         description: Cart item not found.
 */

/**
 * @swagger
 * /cart-items/{id}:
 *   delete:
 *     summary: Remove a cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cart item to remove.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item removed successfully.
 *       404:
 *         description: Cart item not found.
 */

/**
 * @swagger
 * /cart-items/{cartId}/items:
 *   get:
 *     summary: Get all items in a specific cart
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: The ID of the cart to fetch items from.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of items in the cart.
 *       404:
 *         description: Cart not found.
 */

/**
 * @swagger
 * /cart-items/{id}:
 *   get:
 *     summary: Get a specific cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cart item to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the cart item.
 *       404:
 *         description: Cart item not found.
 */
