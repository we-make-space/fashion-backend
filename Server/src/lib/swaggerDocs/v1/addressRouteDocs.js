/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: API routes related to address operations.
 */

/**
 * @swagger
 * /users/{userId}/addresses:
 *   post:
 *     summary: Create an address for the user
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The user ID to associate the address with.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressLine1:
 *                 type: string
 *                 description: The first line of the address.
 *               addressLine2:
 *                 type: string
 *                 description: The second line of the address (optional).
 *               city:
 *                 type: string
 *                 description: The city of the address.
 *               postalCode:
 *                 type: string
 *                 description: The postal code of the address.
 *               country:
 *                 type: string
 *                 description: The country of the address.
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number associated with the address.
 *     responses:
 *       201:
 *         description: Address created successfully.
 */

/**
 * @swagger
 * /users/{userId}/addresses:
 *   get:
 *     summary: Get all addresses for a user
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The user ID to fetch addresses for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of addresses for the user.
 */

/**
 * @swagger
 * /addresses/{addressId}:
 *   patch:
 *     summary: Update an address
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: The ID of the address to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressLine1:
 *                 type: string
 *                 description: The updated first line of the address.
 *               addressLine2:
 *                 type: string
 *                 description: The updated second line of the address (optional).
 *               city:
 *                 type: string
 *                 description: The updated city of the address.
 *               postalCode:
 *                 type: string
 *                 description: The updated postal code of the address.
 *               country:
 *                 type: string
 *                 description: The updated country of the address.
 *               phoneNumber:
 *                 type: string
 *                 description: The updated phone number associated with the address.
 *     responses:
 *       200:
 *         description: Address updated successfully.
 */

/**
 * @swagger
 * /addresses/{addressId}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: The ID of the address to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Address deleted successfully.
 */

/**
 * @swagger
 * /addresses/{addressId}/default:
 *   patch:
 *     summary: Set an address as default
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: The ID of the address to set as default.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address set as default successfully.
 */
