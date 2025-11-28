# API Request/Response Examples

Complete examples of actual API requests and responses for the login system.

---

## 1. Register New User

### Request

```http
POST /api/auth/register HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "mypassword123"
}
```

### Response - Success (201 Created)

```json
{
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzdoOGk5ajBrMSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM4MzYwMDAwLCJleHAiOjE2Mzg5NjQ4MDB9.xyz123abc456def789"
}
```

### Response - Error: User Already Exists (400 Bad Request)

```json
{
  "message": "User already exists"
}
```

### Response - Error: Missing Fields (400 Bad Request)

```json
{
  "message": "Email and password required"
}
```

### What Happens in Backend:

```javascript
1. Receive request with email and password
2. Check if email already exists in database
   - If yes → return error "User already exists"
3. Generate salt: "$2a$10$abcdefgh..."
4. Hash password: "mypassword123" → "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
5. Create user document in MongoDB:
   {
     name: "John Doe",
     email: "john@example.com",
     password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
     createdAt: 2024-01-15T10:30:00.000Z
   }
6. Generate JWT token with payload: { id, email, role }
7. Return user data and token
```

---

## 2. Login - Correct Password

### Request

```http
POST /api/auth/login HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "mypassword123"
}
```

### Response - Success (200 OK)

```json
{
  "success": true,
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzdoOGk5ajBrMSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM4MzYwMDAwLCJleHAiOjE2Mzg5NjQ4MDB9.xyz123abc456def789"
}
```

### What Happens in Backend:

```javascript
1. Receive request with email: "john@example.com" and password: "mypassword123"
2. Find user in User collection by email
3. User found with:
   - email: "john@example.com"
   - password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
4. Compare passwords:
   bcrypt.compare("mypassword123", "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy")
   → Returns: true ✅
5. Generate JWT token
6. Return success response with user data and token
```

---

## 3. Login - Wrong Password

### Request

```http
POST /api/auth/login HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "wrongpassword"
}
```

### Response - Error (400 Bad Request)

```json
{
  "message": "Invalid credentials"
}
```

### What Happens in Backend:

```javascript
1. Receive request with email: "john@example.com" and password: "wrongpassword"
2. Find user in User collection by email
3. User found with:
   - email: "john@example.com"
   - password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
4. Compare passwords:
   bcrypt.compare("wrongpassword", "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy")
   → Returns: false ❌
5. Return error: "Invalid credentials"
```

---

## 4. Login - Non-existent Email

### Request

```http
POST /api/auth/login HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "email": "notexist@example.com",
  "password": "somepassword"
}
```

### Response - Error (400 Bad Request)

```json
{
  "message": "Invalid credentials"
}
```

### What Happens in Backend:

```javascript
1. Receive request with email: "notexist@example.com"
2. Try to find user in User collection
   → Not found
3. Try to find in Vendor collection
   → Not found
4. Return error: "Invalid credentials"
```

**Note**: Same error message as wrong password to prevent email enumeration!

---

## 5. Get Current User (Protected Route)

### Request

```http
GET /api/auth/me HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFiMmMzZDRlNWY2ZzdoOGk5ajBrMSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM4MzYwMDAwLCJleHAiOjE2Mzg5NjQ4MDB9.xyz123abc456def789
```

### Response - Success (200 OK)

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

### What Happens in Backend:

```javascript
1. Extract token from Authorization header
2. Verify token signature and expiration
3. Decode token to get user ID
4. Find user in database by ID
5. Return user data (without password!)
```

### Response - Error: No Token (401 Unauthorized)

```json
{
  "message": "Authorization token missing"
}
```

### Response - Error: Invalid Token (401 Unauthorized)

```json
{
  "message": "Invalid or expired token"
}
```

---

## 6. Vendor Login (Same Endpoint)

### Request

```http
POST /api/auth/login HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "email": "vendor@company.com",
  "password": "vendorpass123"
}
```

### Response - Success (200 OK)

```json
{
  "success": true,
  "user": {
    "id": "75b2c3d4e5f6g7h8i9j0k1l2",
    "name": "ABC Corporation",
    "email": "vendor@company.com",
    "role": "Vendor"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1YjJjM2Q0ZTVmNmc3aDhpOWowazFsMiIsImVtYWlsIjoidmVuZG9yQGNvbXBhbnkuY29tIiwicm9sZSI6IlZlbmRvciIsImlhdCI6MTYzODM2MDAwMCwiZXhwIjoxNjM4OTY0ODAwfQ.abc123xyz456"
}
```

### What Happens in Backend:

```javascript
1. Receive request with vendor email and password
2. Try to find in User collection
   → Not found
3. Try to find in Vendor collection
   → Found!
4. Compare password with stored hash
   → Match! ✅
5. Generate JWT token
6. Return vendor data as "user" (with role: "Vendor")
```

---

## Complete Flow Example: From Registration to Login

### Step 1: Register

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith",
    "email": "alice@example.com",
    "password": "alice2024"
  }'
```

**Response:**

```json
{
  "user": {
    "id": "85c3d4e5f6g7h8i9j0k1l2m3",
    "name": "Alice Smith",
    "email": "alice@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Database After Registration:**

```javascript
// users collection
{
  _id: ObjectId("85c3d4e5f6g7h8i9j0k1l2m3"),
  name: "Alice Smith",
  email: "alice@example.com",
  password: "$2a$10$abcdef...",  // ← "alice2024" hashed
  createdAt: ISODate("2024-01-15T10:30:00.000Z"),
  updatedAt: ISODate("2024-01-15T10:30:00.000Z")
}
```

### Step 2: Login (Same Password)

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "alice2024"
  }'
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "85c3d4e5f6g7h8i9j0k1l2m3",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Backend Processing:**

```
1. Find user: alice@example.com
2. Get hash: "$2a$10$abcdef..."
3. Compare: bcrypt.compare("alice2024", "$2a$10$abcdef...")
4. Result: TRUE ✅
5. Generate token
6. Return success
```

### Step 3: Login (Wrong Password)

**Request:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "wrongpass"
  }'
```

**Response:**

```json
{
  "message": "Invalid credentials"
}
```

**Backend Processing:**

```
1. Find user: alice@example.com
2. Get hash: "$2a$10$abcdef..."
3. Compare: bcrypt.compare("wrongpass", "$2a$10$abcdef...")
4. Result: FALSE ❌
5. Return error
```

---

## Frontend Integration Examples

### Using Axios in React

```javascript
// Registration
const register = async (name, email, password) => {
  try {
    const response = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });

    // Response contains: { user, token }
    const { token, user } = response.data;

    // Save token
    localStorage.setItem("token", token);

    // Save user data
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, user, token };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
};

// Login
const login = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    // Response contains: { success, user, token }
    const { token, user } = response.data;

    // Save token
    localStorage.setItem("token", token);

    // Save user data
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, user, token };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, user: response.data.user };
  } catch (error) {
    return {
      success: false,
      message: "Not authenticated",
    };
  }
};
```

---

## Common Error Responses

### 400 - Bad Request

```json
{
  "message": "Email and password required"
}
```

```json
{
  "message": "Email and password are required"
}
```

```json
{
  "message": "User already exists"
}
```

```json
{
  "message": "Invalid credentials"
}
```

### 401 - Unauthorized

```json
{
  "message": "Authorization token missing"
}
```

```json
{
  "message": "Invalid or expired token"
}
```

### 404 - Not Found

```json
{
  "message": "User not found"
}
```

### 500 - Server Error

```json
{
  "message": "Server error"
}
```

---

## Testing with Different Tools

### cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get user (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Postman

1. **Register**

   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "Test User",
       "email": "test@test.com",
       "password": "test123"
     }
     ```

2. **Login**

   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "email": "test@test.com",
       "password": "test123"
     }
     ```

3. **Get User**
   - Method: GET
   - URL: `http://localhost:5000/api/auth/me`
   - Headers: `Authorization: Bearer <paste-token-here>`

---

## Key Takeaways

1. **Password Matching**: The password in login request MUST be identical to the password used during registration.

2. **Response Format**: All responses follow consistent format with clear error messages.

3. **Token Usage**: Token must be included in Authorization header for protected routes.

4. **Error Handling**: Same error message for wrong password and non-existent user (security best practice).

5. **Dual Support**: Same endpoints work for both Users and Vendors seamlessly.

---

**Remember**: The password entered during login must EXACTLY match the password entered during registration! 🔑
