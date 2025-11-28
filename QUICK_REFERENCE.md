# Login API - Quick Reference Guide

## 🎯 Quick Start

### Prerequisites

- MongoDB running
- Node.js installed
- Backend dependencies installed

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 📡 API Endpoints Quick Reference

### 1. Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response:** 201 + user object + token

---

### 2. Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response:** 200 + user object + token

---

### 3. Get Current User

```
GET /api/auth/me
Authorization: Bearer <token>
```

**Success Response:** 200 + user object

---

## 🔑 How Password Matching Works

### Registration Process:

```
User enters password: "mypassword123"
          ↓
Backend receives: "mypassword123"
          ↓
bcrypt.hash() with 10 salt rounds
          ↓
Hashed password: "$2a$10$abcd...xyz"
          ↓
Stored in database
```

### Login Process:

```
User enters password: "mypassword123"
          ↓
Backend receives: "mypassword123"
          ↓
Find user by email in database
          ↓
Get stored hashed password: "$2a$10$abcd...xyz"
          ↓
bcrypt.compare("mypassword123", "$2a$10$abcd...xyz")
          ↓
Returns true if match, false if not
          ↓
If true: Generate JWT token & login success
If false: Return "Invalid credentials" error
```

---

## 🔐 Security Features

✅ **Password Hashing**

- Algorithm: bcryptjs
- Salt Rounds: 10
- Cannot be reversed

✅ **JWT Tokens**

- Signed with secret key
- Expires in 7 days
- Contains user id, email, role

✅ **Secure Storage**

- Passwords never stored in plain text
- Passwords never returned in API response

✅ **Validation**

- Email format validation
- Password minimum length: 6 characters
- Required field checks

---

## 🎨 Frontend Flow

### LoginCard Component Flow:

```
1. User enters email & password
2. Formik validates inputs
3. On submit → POST /api/auth/login
4. Success:
   - Save token via AuthContext
   - Save user data
   - Show success toast
   - Navigate to /home
5. Error:
   - Show error toast
   - Keep user on login page
```

### AuthContext Usage:

```javascript
const { login } = useAuth();

login(token, userData);
// Stores token and user data
// Can be accessed throughout the app
```

---

## 🧪 Testing

### Manual Testing:

1. **Register a user:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

2. **Login with same credentials:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

3. **Use the test script:**

```bash
cd backend
node test-login-flow.js
```

---

## ⚠️ Common Errors

### "Invalid credentials"

**Causes:**

- Wrong password entered
- User doesn't exist
- Email typo

**Solution:** Verify email and password are correct

---

### "Email and password are required"

**Cause:** Missing email or password in request

**Solution:** Ensure both fields are provided

---

### "User already exists"

**Cause:** Email already registered

**Solution:** Use different email or login instead

---

### MongoDB connection error

**Cause:** MongoDB not running

**Solution:** Start MongoDB:

```bash
mongod
```

---

## 📊 Password Verification Example

### Example 1: Correct Password ✅

```
Registration:
- Input: "password123"
- Hashed: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"

Login:
- Input: "password123"
- Compare: bcrypt.compare("password123", hash)
- Result: TRUE → Login Success
```

### Example 2: Wrong Password ❌

```
Registration:
- Input: "password123"
- Hashed: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"

Login:
- Input: "password456"
- Compare: bcrypt.compare("password456", hash)
- Result: FALSE → Login Failed
```

---

## 🎯 Password Best Practices

1. ✅ Password must be minimum 6 characters
2. ✅ Case-sensitive (ABC ≠ abc)
3. ✅ Special characters allowed
4. ✅ Numbers allowed
5. ⚠️ Don't share passwords
6. ⚠️ Use strong passwords in production

---

## 💡 Tips

- **Remember your password**: Passwords are hashed and cannot be retrieved
- **Case matters**: "Password" ≠ "password"
- **Same credentials**: Must use exact same email and password used during registration
- **Token expiry**: Tokens last 7 days, then need to login again
- **Dual support**: Same endpoint works for both Users and Vendors

---

## 🔄 Complete Flow Diagram

```
REGISTRATION:
User → Frontend Form → Validation → POST /api/auth/register
  ↓
Backend → Check if email exists
  ↓
Hash password with bcrypt
  ↓
Save to database
  ↓
Generate JWT token
  ↓
Return token + user data → Frontend → Store token → Redirect


LOGIN:
User → Frontend Form → Validation → POST /api/auth/login
  ↓
Backend → Find user by email (User or Vendor)
  ↓
Compare entered password with stored hash
  ↓
If match → Generate JWT token
  ↓
Return token + user data → Frontend → Store token → Redirect
  ↓
If no match → Return error → Frontend → Show error toast
```

---

## 📞 Need Help?

1. Check if MongoDB is running
2. Check if backend is running on port 5000
3. Check if frontend is running on port 5173
4. Verify .env file exists and has correct values
5. Check console logs for detailed errors
6. Run the test script: `node backend/test-login-flow.js`

---

## 📝 Environment Setup Checklist

- [ ] MongoDB installed and running
- [ ] Backend .env file created
- [ ] MONGO_URI configured
- [ ] JWT_SECRET set
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 5173)

---

## 🚀 Ready to Test!

Now you have a complete login system that:

- ✅ Registers users with hashed passwords
- ✅ Authenticates users with email/password
- ✅ Validates passwords securely with bcrypt
- ✅ Generates JWT tokens for sessions
- ✅ Works for both Users and Vendors
- ✅ Has proper error handling
- ✅ Frontend integration complete

**The password entered during login MUST match the password entered during registration!**
