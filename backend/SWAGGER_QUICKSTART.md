# Swagger UI Quick Start Guide

## ✅ Swagger UI Successfully Integrated!

Swagger UI has been successfully integrated into your SaaSOrbit backend. Every time you run the backend server, Swagger UI will be available automatically.

## 🚀 Quick Access

### 1. Start Backend Server

```bash
cd backend
npm start
```

or

```bash
cd backend
npm run dev  # For development with auto-reload
```

### 2. Access Swagger UI

Open your browser and navigate to:

```
http://localhost:5001/api-docs
```

### 3. View API Information

Visit the root endpoint:

```
http://localhost:5001/
```

You'll see a JSON response with all available endpoints and a direct link to the Swagger documentation.

## 📚 What's Included

### Documented API Endpoints

✅ **Authentication**

- Register new user
- Login (email/password)
- Google OAuth
- Logout
- Get current user info

✅ **Vendor Management**

- Register vendor
- Get all vendors
- Get vendor by ID
- Update vendor profile

✅ **OTP Verification**

- Request OTP
- Verify OTP

✅ **AI Chat**

- Send messages to AI chatbot

✅ **Product Listing**

- Get all products
- Create new product listing

## 🧪 Testing APIs

### Test a Simple Endpoint

1. Open Swagger UI at `http://localhost:5001/api-docs`
2. Find the `GET /api/vendor/all` endpoint under "Vendor"
3. Click to expand it
4. Click "Try it out"
5. Click "Execute"
6. See the response below!

### Test with Authentication

1. First, register or login:

   - Expand `POST /api/auth/login`
   - Click "Try it out"
   - Enter email and password
   - Click "Execute"
   - Copy the `token` from the response

2. Authorize Swagger:

   - Click the "Authorize" button at the top
   - Enter: `Bearer <your-token>`
   - Click "Authorize"

3. Now test protected endpoints:
   - Try `GET /api/auth/me`
   - It will use your token automatically

### Test File Uploads

For vendor registration or product listing with files:

1. Expand the endpoint
2. Click "Try it out"
3. Fill in text fields
4. Click "Choose File" for file uploads
5. Select your file
6. Click "Execute"

## 📦 Installed Packages

The following packages were added to your backend:

- `swagger-ui-express` - Serves the Swagger UI
- `swagger-jsdoc` - Generates Swagger spec from JSDoc comments

## 📁 Files Modified/Created

### Created:

- `backend/config/swagger.js` - Swagger configuration
- `backend/SWAGGER_DOCUMENTATION.md` - Detailed documentation
- `backend/SWAGGER_QUICKSTART.md` - This file

### Modified:

- `backend/server.js` - Added Swagger UI middleware
- `backend/routes/authRoutes.js` - Added API documentation
- `backend/routes/vendorRoutes.js` - Added API documentation
- `backend/routes/otpRoutes.js` - Added API documentation
- `backend/routes/ai.js` - Added API documentation
- `backend/routes/productListing.js` - Added API documentation
- `backend/package.json` - Added new dependencies

## 🎨 Features

✨ **Interactive Documentation**

- Browse all endpoints with descriptions
- See request/response schemas
- View example payloads

✨ **Live Testing**

- Execute API calls directly from browser
- No need for Postman or curl
- Real-time response viewing

✨ **Authentication Support**

- Test protected endpoints
- JWT token management
- Cookie-based auth support

✨ **File Upload Support**

- Test multipart/form-data endpoints
- Upload files directly through UI

## 🔧 Customization

### Change Swagger UI Theme

Edit `backend/server.js`:

```javascript
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Your Custom Title",
  })
);
```

### Add More Endpoints

Add JSDoc comments to your routes:

```javascript
/**
 * @swagger
 * /api/your-route:
 *   get:
 *     summary: Your endpoint description
 *     tags: [YourTag]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/your-route", yourController);
```

### Modify API Info

Edit `backend/config/swagger.js` to change:

- API title and description
- Server URLs
- Contact information
- Security schemes
- Schemas and models

## 📖 Additional Resources

For detailed documentation, see:

- `backend/SWAGGER_DOCUMENTATION.md` - Complete guide
- [Swagger UI Docs](https://swagger.io/tools/swagger-ui/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.0)

## 🎉 You're All Set!

Swagger UI will now be available every time you start your backend server. Happy API testing! 🚀
