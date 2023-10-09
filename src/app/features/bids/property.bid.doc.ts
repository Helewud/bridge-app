/**
 * @swagger
 * tags:
 *   - name: Bids
 *     description: Property Bids Api Collection
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
 * /api/bids/landlord:
 *   post:
 *     summary: Perform Bid Action as a Landlord
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bidId:
 *                 type: string
 *                 description: ID of the bid you want to perform an action on
 *                 example: 70987a3d-3e66-4412-80fc-91831dd5eff8
 *               bidAction:
 *                 type: string
 *                 description: Type of bid action (e.g., COUNTER_BID)
 *                 example: COUNTER_BID
 *               price:
 *                 type: number
 *                 description: The bid price (if applicable)
 *                 example: 10000
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
 *                   example: Bid action submitted successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID of the submitted bid action
 *                       example: ec5a53fd-ffa5-49a0-ace2-e1dfa32c03f9
 *                     propertyId:
 *                       type: string
 *                       description: ID of the property related to the bid action
 *                       example: 1745621c-ba47-44c4-892b-c127cf5b3c59
 *                     propertyOwnerId:
 *                       type: string
 *                       description: ID of the property owner
 *                       example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                     bidOwnerId:
 *                       type: string
 *                       description: ID of the bid owner (landlord)
 *                       example: c49d5c9e-09db-4863-9ca1-04b031c6952c
 *                     price:
 *                       type: number
 *                       description: The bid price (if applicable)
 *                       example: 10000
 *                     index:
 *                       type: integer
 *                       description: The bid action index
 *                       example: 4
 *                     status:
 *                       type: string
 *                       description: The bid action status
 *                       example: COUNTER_BID
 *                     rootBid:
 *                       type: string
 *                       description: ID of the root bid (if applicable)
 *                       example: bad39f91-a257-4b29-9d5c-cccec15b0f88
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */

/**
 * @swagger
 *
 * /api/bids/tenant:
 *   post:
 *     summary: Submit a Bid as a Tenant
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *                 description: ID of the property you want to bid on
 *                 example: 1feca729-57e1-4910-a3b6-9cf677c45789
 *               price:
 *                 type: number
 *                 description: The bid price
 *                 example: 100000
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
 *                   example: Bid submitted successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID of the submitted bid
 *                       example: f263c9f8-eacf-400a-8c8e-a884bc4e7ace
 *                     propertyId:
 *                       type: string
 *                       description: ID of the property that was bid on
 *                       example: 1feca729-57e1-4910-a3b6-9cf677c45789
 *                     propertyOwnerId:
 *                       type: string
 *                       description: ID of the property owner
 *                       example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                     bidOwnerId:
 *                       type: string
 *                       description: ID of the bid owner (tenant)
 *                       example: c49d5c9e-09db-4863-9ca1-04b031c6952c
 *                     price:
 *                       type: number
 *                       description: The bid price
 *                       example: 100000
 *                     index:
 *                       type: integer
 *                       description: The bid index
 *                       example: 0
 *                     status:
 *                       type: string
 *                       description: The bid status
 *                       example: BID
 *                     rootBid:
 *                       type: string
 *                       description: ID of the root bid (if applicable)
 *                       example: null
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 */

/**
 * @swagger
 *
 * /api/bids/history:
 *   get:
 *     summary: Fetch Bid History for Multiple Properties
 *     tags: [Bids]
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
 *                   example: Bids history fetched successfully.
 *                 data:
 *                   type: array
 *                   description: List of bid history items for multiple properties
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Bid's unique identifier
 *                         example: f7c9e9d5-344d-439b-bd82-07d8d4b1f48e
 *                       propertyId:
 *                         type: string
 *                         description: Property's unique identifier
 *                         example: 1745621c-ba47-44c4-892b-c127cf5b3c59
 *                       propertyOwnerId:
 *                         type: string
 *                         description: Property owner's unique identifier
 *                         example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                       bidOwnerId:
 *                         type: string
 *                         description: Bid owner's unique identifier
 *                         example: c49d5c9e-09db-4863-9ca1-04b031c6952c
 *                       price:
 *                         type: number
 *                         description: Bid price
 *                         example: 100000
 *                       index:
 *                         type: integer
 *                         description: Index of the bid (e.g., order of bidding)
 *                         example: 3
 *                       status:
 *                         type: string
 *                         description: Bid status (e.g., BID, REBID, COUNTER_BID)
 *                         example: REBID
 *                       rootBid:
 *                         type: string
 *                         description: Identifier of the root bid (null for original bids)
 *                         example: bad39f91-a257-4b29-9d5c-cccec15b0f88
 *                       property:
 *                         type: object
 *                         description: Information about the property associated with the bid
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: Property's unique identifier
 *                             example: 1745621c-ba47-44c4-892b-c127cf5b3c59
 *                           userId:
 *                             type: string
 *                             description: User's unique identifier (property owner)
 *                             example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                           price:
 *                             type: number
 *                             description: Property price
 *                             example: 18000
 *                           address:
 *                             type: string
 *                             description: Property address
 *                             example: "45A, Green Avenue, Allen"
 *                           city:
 *                             type: string
 *                             description: City where the property is located
 *                             example: Ikeja
 *                           state:
 *                             type: string
 *                             description: State where the property is located
 *                             example: Lagos
 *                           numberOfRooms:
 *                             type: string
 *                             description: Number of rooms in the property
 *                             example: "3"
 *                           amenities:
 *                             type: array
 *                             description: List of property amenities
 *                             items:
 *                               type: string
 *                             example: ["Swimming Pool", "Gated Community"]
 *                           description:
 *                             type: string
 *                             description: Property description
 *                             example: "Beautiful house with a pool view"
 *                           media:
 *                             type: array
 *                             description: List of property media
 *                             items:
 *                               type: string
 *                             example: ["front", "back", "pool"]
 *                           status:
 *                             type: string
 *                             description: Property status (e.g., OPEN, SOLD)
 *                             example: OPEN
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: Timestamp when the property was created
 *                             example: "2023-10-09T16:01:19.346Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             description: Timestamp when the property was last updated
 *                             example: "2023-10-09T16:01:19.346Z"
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
 * /api/bids/info/{bidId}:
 *   get:
 *     summary: Fetch Bid Info
 *     tags: [Bids]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: bidId
 *         in: path
 *         description: bid's unique identifier
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
 *                   example: Bids history fetched successfully.
 *                 data:
 *                   type: array
 *                   description: List of bid history items for the property
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Bid's unique identifier
 *                         example: f7c9e9d5-344d-439b-bd82-07d8d4b1f48e
 *                       propertyId:
 *                         type: string
 *                         description: Property's unique identifier
 *                         example: 1745621c-ba47-44c4-892b-c127cf5b3c59
 *                       propertyOwnerId:
 *                         type: string
 *                         description: Property owner's unique identifier
 *                         example: 1138ac12-b7ee-41b7-8473-8ecc74e1d10c
 *                       bidOwnerId:
 *                         type: string
 *                         description: Bid owner's unique identifier
 *                         example: c49d5c9e-09db-4863-9ca1-04b031c6952c
 *                       price:
 *                         type: number
 *                         description: Bid price
 *                         example: 100000
 *                       index:
 *                         type: integer
 *                         description: Index of the bid (e.g., order of bidding)
 *                         example: 3
 *                       status:
 *                         type: string
 *                         description: Bid status (e.g., BID, REBID, COUNTER_BID)
 *                         example: REBID
 *                       rootBid:
 *                         type: string
 *                         description: Identifier of the root bid (null for original bids)
 *                         example: bad39f91-a257-4b29-9d5c-cccec15b0f88
 *       '400':
 *         $ref: '#/components/responses/ErrorResponse'
 *     securitySchemes:
 *       BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */
