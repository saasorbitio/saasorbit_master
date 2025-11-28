# Complete Login API Flow Documentation

## Overview

This document explains the complete authentication flow for the SaaSOrbit application, including user registration and login functionality.

---

## 🏗️ Architecture

### Database Models

1. **User Model** (`backend/models/User.js`)

   - Regular users who register via email/password
   - Fields: name, email, password (hashed), googleId

2. **Vendor Model** (`backend/models/Vendor.js`)
   - Vendors with extended profile information
   - Fields: role, email, password (hashed), companyName, landline, fax, gst, addresses, website, social links, status

### Authentication Flow

The login system supports both **User** and **Vendor** authentication from a single login endpoint.

---

## 📋 API Endpoints

### 1. **Register User** - `POST /api/auth/register`

**Purpose:** Create a new user account with email and password.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword123"
}
```

**Backend Process:**

1. Validates email and password are provided
2. Checks if user already exists with the email
3. Hashes the password using bcryptjs (10 salt rounds)
4. Creates new user in database
5. Generates JWT token with user info
6. Returns user data and token

**Response (201 Created):**

```json
{
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

- `400` - Email/password missing or user already exists
- `500` - Server error

---

### 2. **Login** - `POST /api/auth/login`

**Purpose:** Authenticate user with email and password.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword123"
}
```

**Backend Process:**

1. Validates email and password are provided
2. Searches for user in `User` collection first
3. If not found, searches in `Vendor` collection
4. Validates user exists and has a password field
5. Compares provided password with hashed password using bcrypt
6. If passwords match, generates JWT token
7. Returns user data and token

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

- `400` - Email/password missing OR invalid credentials (user not found or password mismatch)
- `500` - Server error

**Security Features:**

- Password is never returned in response
- Same error message for non-existent user and wrong password (prevents email enumeration)
- Password stored as bcrypt hash (not plain text)

---

### 3. **Get Current User** - `GET /api/auth/me`

**Purpose:** Retrieve currently authenticated user's information.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Backend Process:**

1. Extracts JWT token from Authorization header
2. Verifies and decodes the token
3. Finds user in `User` or `Vendor` collection
4. Returns user profile data

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "john@example.com",
    "role": "user",
    "name": "John Doe"
  }
}
```

**Error Responses:**

- `401` - Token missing or invalid
- `404` - User not found
- `500` - Server error

---

### 4. **Google Login** - `POST /api/auth/google`

**Purpose:** Mock Google OAuth login (simplified version).

**Request Body:**

```json
{
  "googleEmail": "john@gmail.com",
  "googleName": "John Doe"
}
```

**Note:** This is a simplified mock implementation. In production, you should verify Google ID tokens.

---

## 🔐 Security Implementation

### Password Hashing

```javascript
// During registration
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);

// During login
const isMatch = await bcrypt.compare(password, user.password);
```

### JWT Token Generation

```javascript
const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
```

**Token Payload:**

- User ID
- Email
- Role
- Expiration: 7 days

---

## 🎨 Frontend Integration

### Login Form (`frontend/src/components/LoginCard.jsx`)

**Features:**

- Formik for form management
- Yup for validation
- Axios for API calls
- React Toast for notifications
- React Router for navigation

**Form Validation:**

- Email: Must be valid email format
- Password: Minimum 6 characters

**Flow:**

1. User enters email and password
2. Frontend validates input
3. Sends POST request to `/api/auth/login`
4. On success:
   - Saves token via AuthContext
   - Stores user data
   - Shows success toast
   - Navigates to `/home`
5. On error:
   - Shows error toast with message

---

## 🔄 Complete User Journey

### Registration Flow

```
User fills form → Frontend validates → POST /api/auth/register
→ Backend validates → Check existing user → Hash password
→ Create user → Generate token → Return response
→ Frontend saves token → Navigate to home
```

### Login Flow

```
User enters credentials → Frontend validates → POST /api/auth/login
→ Backend validates → Find user (User or Vendor)
→ Compare passwords → Generate token → Return response
→ Frontend saves token & user data → Show success toast
→ Navigate to home page
```

### Protected Route Access

```
User accesses protected page → AuthContext checks token
→ If valid: Allow access
→ If invalid: Redirect to login
```

---

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=mongodb://localhost:27017/saasorbit
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
```

### 2. Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Start MongoDB

```bash
# Make sure MongoDB is running
mongod
```

### 4. Start Backend Server

```bash
cd backend
npm run dev
```

### 5. Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🧪 Testing the API

### Using cURL

**Register:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Get Current User:**

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. **Register**: POST `http://localhost:5000/api/auth/register`

   - Body: raw JSON
   - Add name, email, password

2. **Login**: POST `http://localhost:5000/api/auth/login`

   - Body: raw JSON
   - Add email, password
   - Copy the returned token

3. **Get User**: GET `http://localhost:5000/api/auth/me`
   - Headers: `Authorization: Bearer <your-token>`

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Invalid credentials" on login

**Solution:** Ensure the email and password match what was used during registration. Remember passwords are case-sensitive.

### Issue 2: MongoDB connection error

**Solution:**

- Check if MongoDB is running
- Verify MONGO_URI in .env file
- Ensure MongoDB is accessible

### Issue 3: Token expired

**Solution:** Token expires after 7 days. User needs to login again.

### Issue 4: CORS errors

**Solution:** Backend is configured for `http://localhost:5173`. Update if frontend runs on different port.

---

## 🔒 Security Best Practices

1. ✅ **Password Hashing**: Using bcryptjs with 10 salt rounds
2. ✅ **JWT Tokens**: 7-day expiration
3. ✅ **Secure Comparison**: bcrypt.compare prevents timing attacks
4. ✅ **No Password in Response**: Never return password field
5. ✅ **Environment Variables**: Sensitive data in .env file
6. ⚠️ **HTTPS**: Implement in production
7. ⚠️ **Rate Limiting**: Add to prevent brute force
8. ⚠️ **Refresh Tokens**: Consider implementing for better security

---

## 📊 Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, required),
  password: String (hashed, optional),
  googleId: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Vendor Collection

```javascript
{
  _id: ObjectId,
  role: String (enum: User/Vendor/Media),
  email: String (unique, required),
  password: String (hashed, required),
  companyName: String (required),
  landline: String,
  fax: String,
  gst: String (required),
  address1: String (required),
  address2: String,
  city: String (required),
  state: String (required),
  zip: String (required),
  country: String (required),
  website: String,
  linkedin: String,
  x: String,
  accepted: Boolean (default: false),
  status: String (enum: pending/approved/rejected),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Future Enhancements

1. **Email Verification**: Send verification email on registration
2. **Password Reset**: Forgot password functionality
3. **2FA**: Two-factor authentication
4. **OAuth Integration**: Real Google, LinkedIn OAuth
5. **Rate Limiting**: Prevent brute force attacks
6. **Refresh Tokens**: Implement token refresh mechanism
7. **Session Management**: Track active sessions
8. **Account Lockout**: Lock account after failed attempts
9. **Password Strength Meter**: Frontend validation
10. **Activity Logs**: Track login history

---

## 📝 Notes

- The same login endpoint works for both Users and Vendors
- Passwords must match exactly what was entered during registration
- JWT token is valid for 7 days
- Frontend is configured to work with backend at `http://localhost:5000`
- Frontend runs on `http://localhost:5173` by default (Vite)

---

## 🆘 Support

For issues or questions, please check:

1. MongoDB connection
2. Environment variables are set correctly
3. Both backend and frontend are running
4. CORS configuration matches your frontend URL
5. Password was entered correctly during registration
