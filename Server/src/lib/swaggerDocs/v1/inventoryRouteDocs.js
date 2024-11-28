/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API routes related to inventory management.
 */

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product.
 *               stock:
 *                 type: integer
 *                 description: The initial stock quantity of the inventory item.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the inventory item.
 *     responses:
 *       201:
 *         description: Inventory item created successfully.
 *       400:
 *         description: Invalid input or missing fields.
 */

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: A list of all inventory items.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /inventory/{productId}:
 *   get:
 *     summary: Get a single inventory item by product ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID to fetch the inventory item for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory item retrieved successfully.
 *       404:
 *         description: Inventory item not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /inventory/{productId}:
 *   patch:
 *     summary: Update inventory stock
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID to update the inventory stock for.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: integer
 *                 description: The new stock quantity.
 *     responses:
 *       200:
 *         description: Inventory stock updated successfully.
 *       400:
 *         description: Invalid input or missing fields.
 *       404:
 *         description: Inventory item not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /inventory/{productId}/reduce:
 *   patch:
 *     summary: Reduce inventory stock
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID to reduce the inventory stock for.
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
 *                 description: The quantity to reduce from the stock.
 *     responses:
 *       200:
 *         description: Inventory stock reduced successfully.
 *       400:
 *         description: Invalid input or missing fields.
 *       404:
 *         description: Inventory item not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /inventory/{productId}/add:
 *   patch:
 *     summary: Add inventory stock
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID to add the inventory stock for.
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
 *                 description: The quantity to add to the stock.
 *     responses:
 *       200:
 *         description: Inventory stock added successfully.
 *       400:
 *         description: Invalid input or missing fields.
 *       404:
 *         description: Inventory item not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /inventory/{productId}:
 *   delete:
 *     summary: Delete an inventory item
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID to delete the inventory item for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully.
 *       404:
 *         description: Inventory item not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /inventory/check-availability:
 *   post:
 *     summary: Check stock availability for multiple products
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of product IDs to check stock for.
 *     responses:
 *       200:
 *         description: Stock availability information for the given products.
 *       400:
 *         description: Invalid input or missing fields.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /inventory/low-stock:
 *   get:
 *     summary: Get items below stock threshold
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: A list of items that are below the stock threshold.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /inventory/{productId}/reset:
 *   patch:
 *     summary: Reset inventory stock for a product
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID to reset the inventory stock for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory stock reset successfully.
 *       404:
 *         description: Inventory item not found.
 *       500:
 *         description: Internal server error.
 */
