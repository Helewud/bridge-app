/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth Api Collection
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
 * /api/auth/register:
 *   post:
 *     summary: User Registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: john@doe.com
 *               username:
 *                 type: string
 *                 description: User's username
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: johndoe
 *               role:
 *                 type: string
 *                 description: User's role
 *                 example: LANDLORD
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
 *                   example: User creation successful, check email inbox to continue.
 *                 data:
 *                   type: object
 *                   description: User data
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User's unique identifier
 *                       example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                     username:
 *                       type: string
 *                       description: User's username
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                       example: john@doe.com
 *                     isVerified:
 *                       type: boolean
 *                       description: Indicates whether the user is verified
 *                       example: false
 *                     role:
 *                       type: string
 *                       description: User's role
 *                       example: LANDLORD
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of user creation
 *                       example: 2023-10-08T10:51:51.102Z
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 */

/**
 * @swagger
 *
 * /api/auth/email/{email}:
 *   get:
 *     summary: Resend User Email Verification
 *     tags: [Auth]
 *     parameters:
 *       - name: email
 *         in: path
 *         description: User's email address
 *         required: true
 *         schema:
 *           type: string
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
 *                   example: Token sent successfully, check email inbox to continue.
 *                 data:
 *                   type: object
 *                   description: Additional data (empty in this case)
 *                   example: {}
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 */

/**
 * @swagger
 *
 * /api/auth/email:
 *   post:
 *     summary: Verify User Email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: john@doe.com
 *               token:
 *                 type: string
 *                 description: Verification token
 *                 example: 147099
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
 *                   example: Email verified successfully!
 *                 data:
 *                   type: object
 *                   description: Additional data (empty in this case)
 *                   example: {}
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 */

/**
 * @swagger
 *
 * /api/auth/login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: john@doe.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: johndoe
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
 *                   example: User logged in successfully.
 *                 data:
 *                   type: object
 *                   description: User and token data
 *                   properties:
 *                     user:
 *                       type: object
 *                       description: User information
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: User's unique identifier
 *                           example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                         username:
 *                           type: string
 *                           description: User's username
 *                           example: johndoe
 *                         email:
 *                           type: string
 *                           description: User's email address
 *                           example: john@doe.com
 *                         isVerified:
 *                           type: boolean
 *                           description: Indicates whether the user is verified
 *                           example: true
 *                         role:
 *                           type: string
 *                           description: User's role
 *                           example: LANDLORD
 *                         lastLogin:
 *                           type: string
 *                           format: date-time
 *                           description: Timestamp of the last login (null in this case)
 *                     token:
 *                       type: string
 *                       description: Authentication token
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMzhhYzEyLWI3ZWUtNDFiNy04NDczLThlY2M3NGU1ZDEwYyIsInJvbGUiOiJMQU5ETE9SRCIsImlhdCI6MTY5Njc2MjU2MywiZXhwIjoxNjk3MzY3MzYzfQ.u6fdW_1WLpQnPIhRk9AvIbzGdEAkIrsNzliabLWabj0
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 */

/**
 * @swagger
 *
 * /api/auth/reset/{email}:
 *   get:
 *     summary: Request Password Reset Token
 *     tags: [Auth]
 *     parameters:
 *       - name: email
 *         in: path
 *         description: User's email address
 *         required: true
 *         schema:
 *           type: string
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
 *                   example: Token sent successfully, check email inbox to continue.
 *                 data:
 *                   type: object
 *                   description: Additional data (empty in this case)
 *                   example: {}
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 */

/**
 * @swagger
 *
 * /api/auth/reset:
 *   post:
 *     summary: Reset User Password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: john@doe.com
 *               password:
 *                 type: string
 *                 description: New password
 *                 example: johndoe
 *               token:
 *                 type: string
 *                 description: Reset token
 *                 example: 812178
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
 *                   example: Password reset successfully, proceed to login.
 *                 data:
 *                   type: object
 *                   description: Additional data (empty in this case)
 *                   example: {}
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 */

/**
 * @swagger
 *
 * /api/auth/change-password:
 *   post:
 *     summary: Change User Password
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password
 *                 example: johndoe1111
 *               oldPassword:
 *                 type: string
 *                 description: Old password
 *                 example: johndoe
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
 *                   example: Password changed successfully, proceed to login.
 *                 data:
 *                   type: object
 *                   description: Additional data (empty in this case)
 *                   example: {}
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 *     securitySchemes:
 *       BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */
