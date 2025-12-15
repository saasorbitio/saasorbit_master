# Swagger API Documentation

## Overview

Swagger UI has been integrated into the SaaSOrbit backend to provide interactive API documentation. This allows you to explore, test, and understand all available API endpoints.

## Accessing Swagger UI

Once the backend server is running, you can access the Swagger UI at:

```
http://localhost:5001/api-docs
```

Or if you're using port 5000:

```
http://localhost:5000/api-docs
```

## Features

- 📚 **Interactive Documentation**: View all API endpoints with detailed descriptions
- 🧪 **Test Endpoints**: Try out API calls directly from the browser
- 📋 **Request/Response Examples**: See sample payloads and responses
- 🔐 **Authentication**: Test protected endpoints with authentication
- 📊 **Schema Definitions**: View data models and structures

## Available API Categories

### 1. Authentication (`/api/auth`)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user information

### 2. Vendor (`/api/vendor`)

- `POST /api/vendor/register` - Register a new vendor
- `GET /api/vendor/all` - Get all vendors
- `GET /api/vendor/:id` - Get vendor by ID
- `PUT /api/vendor/:id/profile` - Update vendor profile

### 3. OTP (`/api`)

- `POST /api/request-otp` - Request OTP for email verification
- `POST /api/verify-otp` - Verify OTP code

### 4. AI (`/api/ai`)

- `POST /api/ai/chat` - Send message to AI chatbot

### 5. Products (`/api/ProductListing`)

- `GET /api/ProductListing` - Get all products
- `POST /api/ProductListing` - Create a new product listing

## Using Swagger UI

### Testing Endpoints

1. Navigate to `http://localhost:5001/api-docs`
2. Click on any endpoint to expand it
3. Click the "Try it out" button
4. Fill in the required parameters
5. Click "Execute" to send the request
6. View the response below

### Authentication

For protected endpoints that require authentication:

1. First, login using `/api/auth/login` endpoint
2. Copy the token from the response
3. Click the "Authorize" button at the top of the page
4. Enter the token in the format: `Bearer <your-token>`
5. Click "Authorize"
6. Now you can test protected endpoints

### Testing File Uploads

For endpoints that accept file uploads (e.g., vendor registration, product listing):

1. Click on the endpoint
2. Click "Try it out"
3. Fill in the required text fields
4. Click "Choose File" for file upload fields
5. Select your file
6. Click "Execute"

## Swagger JSON

You can also access the raw Swagger specification in JSON format at:

```
http://localhost:5001/api-docs.json
```

This is useful for:

- Importing into other tools (Postman, Insomnia, etc.)
- Generating client SDKs
- API documentation automation

## Development

### Adding Documentation to New Endpoints

When adding new routes, use JSDoc comments with Swagger annotations:

```javascript
/**
 * @swagger
 * /api/your-endpoint:
 *   post:
 *     summary: Description of your endpoint
 *     tags: [YourTag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success response
 */
router.post("/your-endpoint", yourController);
```

### Updating Swagger Configuration

The Swagger configuration is located at:

```
backend/config/swagger.js
```

You can modify:

- Server URLs
- API information
- Security schemes
- Common schemas
- Tags

## Troubleshooting

### Swagger UI not loading

1. Ensure the backend server is running
2. Check that swagger-ui-express and swagger-jsdoc are installed
3. Verify the port number matches your server configuration

### Endpoints not showing

1. Check that JSDoc comments are properly formatted
2. Ensure route files are included in the `apis` array in `swagger.js`
3. Restart the server after adding new documentation

### Authentication not working

1. Make sure you've obtained a valid token first
2. Use the correct format: `Bearer <token>`
3. Check that the token hasn't expired

## Resources

- [Swagger Documentation](https://swagger.io/docs/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.0)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
