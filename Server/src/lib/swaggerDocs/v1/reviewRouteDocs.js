/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API routes related to review operations.
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product being reviewed.
 *               rating:
 *                 type: integer
 *                 description: The rating of the product (1-5).
 *               comment:
 *                 type: string
 *                 description: The review comment.
 *     responses:
 *       201:
 *         description: Review created successfully.
 */

/**
 * @swagger
 * /{productId}/reviews:
 *   get:
 *     summary: Get reviews by product ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The product ID to fetch reviews for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of reviews for the product.
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the review to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: The updated rating of the product (1-5).
 *               comment:
 *                 type: string
 *                 description: The updated review comment.
 *     responses:
 *       200:
 *         description: Review updated successfully.
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the review to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Review deleted successfully.
 */
