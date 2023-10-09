/**
 * @swagger
 * tags:
 *   - name: Properties
 *     description: Properties Api Collection
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
 * /api/properties/listing/add:
 *   post:
 *     summary: Add Property for Listing
 *     tags: [Properties]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 description: Price of the property
 *                 example: 20000
 *               address:
 *                 type: string
 *                 description: Address of the property
 *                 example: 24, nice street, oluwole
 *               city:
 *                 type: string
 *                 description: City of the property
 *                 example: ikeja
 *               state:
 *                 type: string
 *                 description: State of the property
 *                 example: Lagos
 *               numberOfRooms:
 *                 type: string
 *                 description: Number of rooms in the property
 *                 example: 4
 *               amenities:
 *                 type: array
 *                 description: List of amenities in the property
 *                 items:
 *                   type: string
 *                   example: "24 Hours light"
 *               description:
 *                 type: string
 *                 description: Description of the property
 *                 example: a conducive house for a small family
 *               media:
 *                 type: array
 *                 description: List of media files associated with the property
 *                 items:
 *                   type: string
 *                   example: "start"
 *             required:
 *               - price
 *               - address
 *               - city
 *               - state
 *               - numberOfRooms
 *               - amenities
 *               - description
 *               - media
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
 *                   example: Property added for listing successfully.
 *                 data:
 *                   type: object
 *                   description: Property data
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Property's unique identifier
 *                       example: 1feca729-57e1-4910-a3b6-9cf677c45789
 *                     userId:
 *                       type: string
 *                       description: User's unique identifier who added the property
 *                       example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                     price:
 *                       type: number
 *                       description: Price of the property
 *                       example: 20000
 *                     address:
 *                       type: string
 *                       description: Address of the property
 *                       example: 24, nice street, oluwole
 *                     city:
 *                       type: string
 *                       description: City of the property
 *                       example: ikeja
 *                     state:
 *                       type: string
 *                       description: State of the property
 *                       example: Lagos
 *                     numberOfRooms:
 *                       type: string
 *                       description: Number of rooms in the property
 *                       example: 4
 *                     amenities:
 *                       type: array
 *                       description: List of amenities in the property
 *                       items:
 *                         type: string
 *                         example: "24 Hours light"
 *                     description:
 *                       type: string
 *                       description: Description of the property
 *                       example: a conducive house for a small family
 *                     media:
 *                       type: array
 *                       description: List of media files associated with the property
 *                       items:
 *                         type: string
 *                         example: "start"
 *                     status:
 *                       type: string
 *                       description: Property status (e.g., OPEN)
 *                       example: OPEN
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of property creation
 *                       example: 2023-10-09T14:44:28.429Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of property update
 *                       example: 2023-10-09T14:44:28.429Z
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of property deletion (null if not deleted)
 *                       example: null
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
 * /api/properties/listing/edit:
 *   put:
 *     summary: Edit Property
 *     tags: [Properties]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *                 description: The unique identifier of the property to edit
 *                 example: 1feca729-57e1-4910-a3b6-9cf677c45789
 *               price:
 *                 type: number
 *                 description: Price of the property
 *                 example: 20000
 *               address:
 *                 type: string
 *                 description: Address of the property
 *                 example: 24, nice street, oluwole
 *               city:
 *                 type: string
 *                 description: City of the property
 *                 example: ikeja
 *               state:
 *                 type: string
 *                 description: State of the property
 *                 example: Lagos
 *               numberOfRooms:
 *                 type: string
 *                 description: Number of rooms in the property
 *                 example: 4
 *               amenities:
 *                 type: array
 *                 description: List of amenities in the property
 *                 items:
 *                   type: string
 *                   example: "24 Hours light"
 *               description:
 *                 type: string
 *                 description: Description of the property
 *                 example: a conducive house for a small family
 *               media:
 *                 type: array
 *                 description: List of media files associated with the property
 *                 items:
 *                   type: string
 *                   example: "start"
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
 *                   example: Property updated successfully.
 *                 data:
 *                   type: object
 *                   description: Property data
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Property's unique identifier
 *                       example: 1feca729-57e1-4910-a3b6-9cf677c45789
 *                     userId:
 *                       type: string
 *                       description: User's unique identifier who added the property
 *                       example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                     price:
 *                       type: number
 *                       description: Price of the property
 *                       example: 50000
 *                     address:
 *                       type: string
 *                       description: Address of the property
 *                       example: 24, nice street, oluwole
 *                     city:
 *                       type: string
 *                       description: City of the property
 *                       example: ikeja
 *                     state:
 *                       type: string
 *                       description: State of the property
 *                       example: Lagos
 *                     numberOfRooms:
 *                       type: string
 *                       description: Number of rooms in the property
 *                       example: 4
 *                     amenities:
 *                       type: array
 *                       description: List of amenities in the property
 *                       items:
 *                         type: string
 *                         example: "24 Hours light"
 *                     description:
 *                       type: string
 *                       description: Description of the property
 *                       example: a conducive house for a small family
 *                     media:
 *                       type: array
 *                       description: List of media files associated with the property
 *                       items:
 *                         type: string
 *                         example: "start"
 *                     status:
 *                       type: string
 *                       description: Property status (e.g., OPEN)
 *                       example: OPEN
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of property creation
 *                       example: 2023-10-09T14:44:28.429Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of property update
 *                       example: 2023-10-09T14:59:17.460Z
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of property deletion (null if not deleted)
 *                       example: null
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
 * /api/properties/listing:
 *   get:
 *     summary: Get All Properties on the Platform
 *     tags: [Properties]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Filter by property status (e.g., OPEN, CLOSED)
 *         required: false
 *         type: string
 *       - name: startDate
 *         in: query
 *         description: Filter by property start date (e.g., YYYY-MM-DD)
 *         required: false
 *         type: string
 *         format: date
 *       - name: endDate
 *         in: query
 *         description: Filter by property end date (e.g., YYYY-MM-DD)
 *         required: false
 *         type: string
 *         format: date
 *       - name: startPrice
 *         in: query
 *         description: Filter by minimum property price
 *         required: false
 *         type: number
 *       - name: endPrice
 *         in: query
 *         description: Filter by maximum property price
 *         required: false
 *         type: number
 *       - name: startNumberOfRooms
 *         in: query
 *         description: Filter by minimum number of rooms
 *         required: false
 *         type: string
 *       - name: endNumberOfRooms
 *         in: query
 *         description: Filter by maximum number of rooms
 *         required: false
 *         type: string
 *       - name: limit
 *         in: query
 *         description: Limit the number of results per page
 *         required: false
 *         type: integer
 *         format: int32
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         type: integer
 *         format: int32
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
 *                   example: User properties fetched successfully.
 *                 data:
 *                   type: array
 *                   description: List of user properties
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Property's unique identifier
 *                         example: 1feca729-57e1-4910-a3b6-9cf677c45789
 *                       userId:
 *                         type: string
 *                         description: User's unique identifier who added the property
 *                         example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                       price:
 *                         type: number
 *                         description: Price of the property
 *                         example: 50000
 *                       address:
 *                         type: string
 *                         description: Address of the property
 *                         example: 24, nice street, oluwole
 *                       city:
 *                         type: string
 *                         description: City of the property
 *                         example: 50000
 *                       state:
 *                         type: string
 *                         description: State of the property
 *                         example: Lagos
 *                       numberOfRooms:
 *                         type: string
 *                         description: Number of rooms in the property
 *                         example: 4
 *                       amenities:
 *                         type: array
 *                         description: List of amenities in the property
 *                         items:
 *                           type: string
 *                           example: "24 Hours light"
 *                       description:
 *                         type: string
 *                         description: Description of the property
 *                         example: a conducive house for a small family
 *                       media:
 *                         type: array
 *                         description: List of media files associated with the property
 *                         items:
 *                           type: string
 *                           example: "start"
 *                       status:
 *                         type: string
 *                         description: Property status (e.g., OPEN)
 *                         example: OPEN
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of property creation
 *                         example: 2023-10-09T14:44:28.429Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of property update
 *                         example: 2023-10-09T14:59:17.460Z
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of property deletion (null if not deleted)
 *                         example: null
 *                       user:
 *                         type: object
 *                         description: User information
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: User's unique identifier
 *                             example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                           email:
 *                             type: string
 *                             description: User's email address
 *                             example: helewud@gmail.com
 *                           username:
 *                             type: string
 *                             description: User's username
 *                             example: johndoe
 *                           role:
 *                             type: string
 *                             description: User's role (e.g., LANDLORD)
 *                             example: LANDLORD
 *       '401':
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
 * /api/properties/listing/{propertyId}:
 *   get:
 *     summary: Fetch Property by Property Id
 *     tags: [Properties]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: propertyId
 *         in: path
 *         description: ID of the property to fetch
 *         required: true
 *         type: string
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
 *                   example: Property fetched successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Property's unique identifier
 *                       example: 1feca729-57e1-4910-a3b6-9cf677c45789
 *                     userId:
 *                       type: string
 *                       description: User's unique identifier who added the property
 *                       example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                     price:
 *                       type: number
 *                       description: Price of the property
 *                       example: 50000
 *                     address:
 *                       type: string
 *                       description: Address of the property
 *                       example: 24, nice street, oluwole
 *                     city:
 *                       type: string
 *                       description: City of the property
 *                       example: 50000
 *                     state:
 *                       type: string
 *                       description: State of the property
 *                       example: Lagos
 *                     numberOfRooms:
 *                       type: string
 *                       description: Number of rooms in the property
 *                       example: 4
 *                     amenities:
 *                       type: array
 *                       description: List of amenities in the property
 *                       items:
 *                         type: string
 *                         example: "24 Hours light"
 *                     description:
 *                       type: string
 *                       description: Description of the property
 *                       example: a conducive house for a small family
 *                     media:
 *                       type: array
 *                       description: List of media files associated with the property
 *                       items:
 *                         type: string
 *                         example: "start"
 *                     status:
 *                       type: string
 *                       description: Property status (e.g., OPEN)
 *                       example: OPEN
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of property creation
 *                       example: 2023-10-09T14:44:28.429Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of property update
 *                       example: 2023-10-09T14:59:17.460Z
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of property deletion (null if not deleted)
 *                       example: null
 *                     user:
 *                       type: object
 *                       description: User information
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: User's unique identifier
 *                           example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                         email:
 *                           type: string
 *                           description: User's email address
 *                           example: helewud@gmail.com
 *                         username:
 *                           type: string
 *                           description: User's username
 *                           example: johndoe
 *                         role:
 *                           type: string
 *                           description: User's role (e.g., LANDLORD)
 *                           example: LANDLORD
 *       '401':
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
 * /api/properties/user:
 *   get:
 *     summary: Fetch Personal Listed Properties
 *     tags: [Properties]
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
 *                   example: Properties fetched successfully.
 *                 data:
 *                   type: array
 *                   description: List of properties associated with the user
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Property's unique identifier
 *                         example: 1feca729-57e1-4910-a3b6-9cf677c45789
 *                       userId:
 *                         type: string
 *                         description: User's unique identifier who added the property
 *                         example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                       price:
 *                         type: number
 *                         description: Price of the property
 *                         example: 50000
 *                       address:
 *                         type: string
 *                         description: Address of the property
 *                         example: 24, nice street, oluwole
 *                       city:
 *                         type: string
 *                         description: City of the property
 *                         example: 50000
 *                       state:
 *                         type: string
 *                         description: State of the property
 *                         example: Lagos
 *                       numberOfRooms:
 *                         type: string
 *                         description: Number of rooms in the property
 *                         example: 4
 *                       amenities:
 *                         type: array
 *                         description: List of amenities in the property
 *                         items:
 *                           type: string
 *                           example: "24 Hours light"
 *                       description:
 *                         type: string
 *                         description: Description of the property
 *                         example: a conducive house for a small family
 *                       media:
 *                         type: array
 *                         description: List of media files associated with the property
 *                         items:
 *                           type: string
 *                           example: "start"
 *                       status:
 *                         type: string
 *                         description: Property status (e.g., OPEN)
 *                         example: OPEN
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of property creation
 *                         example: 2023-10-09T14:44:28.429Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of property update
 *                         example: 2023-10-09T14:59:17.460Z
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of property deletion (null if not deleted)
 *                         example: null
 *                       user:
 *                         type: object
 *                         description: User information
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: User's unique identifier
 *                             example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                           email:
 *                             type: string
 *                             description: User's email address
 *                             example: helewud@gmail.com
 *                           username:
 *                             type: string
 *                             description: User's username
 *                             example: johndoe
 *                           role:
 *                             type: string
 *                             description: User's role (e.g., LANDLORD)
 *                             example: LANDLORD
 *       '401':
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
 * /api/properties/user/{userId}:
 *   get:
 *     summary: Fetch Properties by User Id
 *     tags: [Properties]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: user's unique identifier
 *         required: true
 *         type: string
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
 *                   example: Properties fetched successfully.
 *                 data:
 *                   type: array
 *                   description: List of properties associated with the user
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Property's unique identifier
 *                         example: 1feca729-57e1-4910-a3b6-9cf677c45789
 *                       userId:
 *                         type: string
 *                         description: User's unique identifier who added the property
 *                         example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                       price:
 *                         type: number
 *                         description: Price of the property
 *                         example: 50000
 *                       address:
 *                         type: string
 *                         description: Address of the property
 *                         example: 24, nice street, oluwole
 *                       city:
 *                         type: string
 *                         description: City of the property
 *                         example: 50000
 *                       state:
 *                         type: string
 *                         description: State of the property
 *                         example: Lagos
 *                       numberOfRooms:
 *                         type: string
 *                         description: Number of rooms in the property
 *                         example: 4
 *                       amenities:
 *                         type: array
 *                         description: List of amenities in the property
 *                         items:
 *                           type: string
 *                           example: "24 Hours light"
 *                       description:
 *                         type: string
 *                         description: Description of the property
 *                         example: a conducive house for a small family
 *                       media:
 *                         type: array
 *                         description: List of media files associated with the property
 *                         items:
 *                           type: string
 *                           example: "start"
 *                       status:
 *                         type: string
 *                         description: Property status (e.g., OPEN)
 *                         example: OPEN
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of property creation
 *                         example: 2023-10-09T14:44:28.429Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of property update
 *                         example: 2023-10-09T14:59:17.460Z
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of property deletion (null if not deleted)
 *                         example: null
 *                       user:
 *                         type: object
 *                         description: User information
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: User's unique identifier
 *                             example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                           email:
 *                             type: string
 *                             description: User's email address
 *                             example: helewud@gmail.com
 *                           username:
 *                             type: string
 *                             description: User's username
 *                             example: johndoe
 *                           role:
 *                             type: string
 *                             description: User's role (e.g., LANDLORD)
 *                             example: LANDLORD
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
 * /api/properties/upload:
 *   post:
 *     summary: Upload Media for Property
 *     tags: [Properties]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Media file to upload
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
 *                   example: Media uploaded successfully!
 *                 data:
 *                   type: object
 *                   description: Uploaded media data
 *                   properties:
 *                     mediaIdentifier:
 *                       type: string
 *                       description: Identifier for the uploaded media
 *                       example: 1138ac12b7ee41b784738ecc74e1d10c7x68nm53RDU1Wf5UXzqjRYKYNXizz028.png
 *                     publicUrl:
 *                       type: string
 *                       description: Public URL of the uploaded media
 *                       example: https://bridge-09128734.s3.eu-west-2.amazonaws.com/1138ac12b7ee41b784738ecc74e1d10c7x68nm53RDU1Wf5UXzqjRYKYNXizz028.png
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 *     securitySchemes:
 *       BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */
