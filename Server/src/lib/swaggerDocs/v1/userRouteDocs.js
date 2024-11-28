/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API routes related to user operations.
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *               email:
 *                 type: string
 *                 description: The user's email.
 *     responses:
 *       201:
 *         description: User created successfully.
 */

/**
 * @swagger
 * /user/checkUserExists:
 *   get:
 *     summary: Check if a user exists
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User exists or not.
 */

/**
 * @swagger
 * /:id:
 *   get:
 *     summary: Fetch a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: User details fetched successfully.
 */

/**
 * @swagger
 * /all:
 *   get:
 *     summary: Fetch all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of all users.
 */

/**
 * @swagger
 * /:id:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the user.
 *     responses:
 *       200:
 *         description: User updated successfully.
 */

/**
 * @swagger
 * /:id:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 */

/**
 * @swagger
 * /sellers/all:
 *   get:
 *     summary: Fetch all sellers
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of all sellers.
 */

/**
 * @swagger
 * /:id/follow:
 *   post:
 *     summary: Follow a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID to follow.
 *     responses:
 *       200:
 *         description: Successfully followed the user.
 */

/**
 * @swagger
 * /:id/followStatus:
 *   get:
 *     summary: Check follow status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID to check follow status for.
 *     responses:
 *       200:
 *         description: Follow status returned successfully.
 */
