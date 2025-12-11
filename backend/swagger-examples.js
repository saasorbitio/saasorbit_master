// Example: How to add Swagger documentation to your routes

/**
 * Basic GET endpoint
 *
 * @swagger
 * /api/example/items:
 *   get:
 *     summary: Get all items
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: List of items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get("/items", getItems);

/**
 * POST endpoint with request body
 *
 * @swagger
 * /api/example/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Example]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Item
 *               description:
 *                 type: string
 *                 example: This is a sample item
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid request data
 */
router.post("/items", createItem);

/**
 * GET endpoint with path parameter
 *
 * @swagger
 * /api/example/items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Example]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item found
 *       404:
 *         description: Item not found
 */
router.get("/items/:id", getItemById);

/**
 * PUT endpoint with path parameter and body
 *
 * @swagger
 * /api/example/items/{id}:
 *   put:
 *     summary: Update an item
 *     tags: [Example]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 */
router.put("/items/:id", updateItem);

/**
 * DELETE endpoint
 *
 * @swagger
 * /api/example/items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Example]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */
router.delete("/items/:id", deleteItem);

/**
 * Protected endpoint requiring authentication
 *
 * @swagger
 * /api/example/protected:
 *   get:
 *     summary: Access protected resource
 *     tags: [Example]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Protected data retrieved
 *       401:
 *         description: Unauthorized - Authentication required
 */
router.get("/protected", authMiddleware, getProtectedData);

/**
 * File upload endpoint
 *
 * @swagger
 * /api/example/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Example]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *               name:
 *                 type: string
 *                 description: File name
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid file
 */
router.post("/upload", upload.single("file"), uploadFile);

/**
 * Query parameters example
 *
 * @swagger
 * /api/example/search:
 *   get:
 *     summary: Search items with filters
 *     tags: [Example]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/search", searchItems);

/**
 * Using schema references
 *
 * @swagger
 * /api/example/with-schema:
 *   post:
 *     summary: Create using schema reference
 *     tags: [Example]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/with-schema", createWithSchema);

// To add a new schema to swagger.js config:
/*
In backend/config/swagger.js, add to components.schemas:

ExampleItem: {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
  },
},
*/
