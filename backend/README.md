# SaaSOrbit Backend

Backend API for SaaSOrbit platform with comprehensive Swagger UI documentation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Or run in development mode with auto-reload
npm run dev
```

## 📚 API Documentation

### Access Swagger UI

Once the server is running, access the interactive API documentation at:

**http://localhost:5001/api-docs**

### Features

- 🔍 Interactive API explorer
- 🧪 Test endpoints directly from browser
- 📋 Complete request/response examples
- 🔐 Authentication support
- 📤 File upload testing

## 🔗 Endpoints

### Root Endpoint

- **GET /** - API information and documentation links

### Swagger

- **GET /api-docs** - Interactive Swagger UI
- **GET /api-docs.json** - Swagger specification (JSON)

### Authentication

- **POST /api/auth/register** - Register new user
- **POST /api/auth/login** - Login with email/password
- **POST /api/auth/google** - Google OAuth login
- **POST /api/auth/logout** - Logout user
- **GET /api/auth/me** - Get current user information

### Vendor Management

- **POST /api/vendor/register** - Register new vendor (with logo upload)
- **GET /api/vendor/all** - Get all vendors
- **GET /api/vendor/:id** - Get vendor by ID
- **PUT /api/vendor/:id/profile** - Update vendor profile

### OTP Verification

- **POST /api/request-otp** - Request OTP for email verification
- **POST /api/verify-otp** - Verify OTP code

### AI Features

- **POST /api/ai/chat** - Send message to AI chatbot

### Product Listing

- **GET /api/ProductListing** - Get all products
- **POST /api/ProductListing** - Create new product (with file uploads)

## 🛠️ Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=5001

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# Email (SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# OpenAI (optional)
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

## 📦 Dependencies

### Core

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Authentication

- **jsonwebtoken** - JWT tokens
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie parsing

### File Upload

- **multer** - Multipart/form-data handling
- **GridFS** - MongoDB file storage

### Email

- **nodemailer** - Email sending

### AI

- **openai** - OpenAI API integration

### Documentation

- **swagger-ui-express** - Swagger UI interface
- **swagger-jsdoc** - Swagger specification generation

## 📖 Documentation Files

- **SWAGGER_QUICKSTART.md** - Quick start guide for Swagger UI
- **SWAGGER_DOCUMENTATION.md** - Comprehensive Swagger documentation
- **SWAGGER_INTEGRATION_SUMMARY.md** - Integration summary and overview
- **swagger-examples.js** - Example JSDoc comments for new endpoints

## 🧪 Testing APIs

### Using Swagger UI (Recommended)

1. Start the backend: `npm start`
2. Open http://localhost:5001/api-docs
3. Click on any endpoint
4. Click "Try it out"
5. Fill in parameters
6. Click "Execute"

### Using curl

```bash
# Example: Get all vendors
curl http://localhost:5001/api/vendor/all

# Example: Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Using Postman

Import the Swagger spec:

- Import from: http://localhost:5001/api-docs.json

## 🔐 Authentication

The API supports two authentication methods:

### 1. JWT Bearer Token

```
Authorization: Bearer <token>
```

### 2. Cookie-based

The API sets an HTTP-only cookie named `token` on login.

### How to Authenticate in Swagger UI

1. Login via `/api/auth/login` endpoint
2. Copy the token from the response
3. Click "Authorize" button at the top
4. Enter: `Bearer <your-token>`
5. Click "Authorize"
6. Now all protected endpoints will use this token

## 📁 Project Structure

```
backend/
├── config/
│   ├── db.js              # Database connection
│   ├── email.js           # Email configuration
│   ├── loadEnv.js         # Environment loader
│   └── swagger.js         # Swagger configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── otpController.js   # OTP verification
│   └── vendorController.js # Vendor management
├── middleware/
│   └── upload.js          # File upload middleware
├── models/
│   ├── ChatHistory.js     # AI chat history
│   ├── Otp.js            # OTP records
│   ├── Product.js        # Product listings
│   ├── User.js           # User model
│   └── Vendor.js         # Vendor model
├── routes/
│   ├── ai.js             # AI chat routes
│   ├── authRoutes.js     # Authentication routes
│   ├── otpRoutes.js      # OTP routes
│   ├── productListing.js # Product routes
│   └── vendorRoutes.js   # Vendor routes
├── utils/
│   ├── gridfs.js         # GridFS file storage
│   └── otp.js            # OTP utilities
├── .env                  # Environment variables
├── server.js             # Main application file
└── package.json          # Dependencies
```

## 🔧 Adding New Endpoints

When adding new routes, include Swagger documentation:

```javascript
/**
 * @swagger
 * /api/your-endpoint:
 *   post:
 *     summary: Description of endpoint
 *     tags: [YourTag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/your-endpoint", yourController);
```

See `swagger-examples.js` for more examples.

## 🐛 Troubleshooting

### Swagger UI not loading

- Ensure the server is running
- Check the port number (default: 5001)
- Verify swagger packages are installed: `npm install`

### Database connection error

- Check MongoDB is running
- Verify MONGODB_URI in .env
- Check network connectivity

### Authentication issues

- Ensure JWT_SECRET is set in .env
- Check token format: `Bearer <token>`
- Verify token hasn't expired

## 📞 Support

For issues or questions:

1. Check the Swagger documentation at /api-docs
2. Review the documentation files in this directory
3. Check server logs for errors

## 🎉 Features

✅ RESTful API design
✅ MongoDB database with Mongoose
✅ JWT authentication
✅ File upload support
✅ Email verification with OTP
✅ AI chatbot integration
✅ Interactive Swagger documentation
✅ CORS enabled
✅ Error handling
✅ GridFS for file storage

---

**Server:** http://localhost:5001
**Documentation:** http://localhost:5001/api-docs
**Swagger Spec:** http://localhost:5001/api-docs.json
