/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Users Api Collection
 */

/**
 * @swagger
 *
 * components:
 *   responses:
 *     ErrorResponse:
 *       description: Error response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Status indicating an error
 *                 example: error
 *               statusCode:
 *                 type: integer
 *                 description: HTTP status code
 *                 example: 400
 *               message:
 *                 type: string
 *                 description: Error message
 *                 example: Something went wrong!
 */

/**
 * @swagger
 *
 * /api/users/profile:
 *   get:
 *     summary: Get Personal User Profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: User fetched successfully.
 *                 data:
 *                   type: object
 *                   description: User profile data
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User's unique identifier
 *                       example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                       example: john@doe.com
 *                     username:
 *                       type: string
 *                       description: User's username
 *                       example: johndoe
 *                     role:
 *                       type: string
 *                       description: User's role
 *                       example: LANDLORD
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 *     securitySchemes:
 *       BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */

/**
 * @swagger
 *
 * /api/users/profile/{userId}:
 *   get:
 *     summary: Get User Profile by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User's unique identifier
 *         required: true
 *         schema:
 *           type: string
 *           example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: User fetched successfully.
 *                 data:
 *                   type: object
 *                   description: User profile data
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User's unique identifier
 *                       example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                       example: john@doe.com
 *                     username:
 *                       type: string
 *                       description: User's username
 *                       example: johndoe
 *                     role:
 *                       type: string
 *                       description: User's role
 *                       example: LANDLORD
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 *     securitySchemes:
 *       BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */
