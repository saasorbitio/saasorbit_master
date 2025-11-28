# Login API Setup & Verification Checklist

Use this checklist to verify your login API is set up correctly and working.

## ✅ Pre-Requirements Checklist

- [ ] Node.js installed (v16 or higher)
- [ ] MongoDB installed
- [ ] Git installed (if cloning from repository)
- [ ] Terminal/Command line access

## 📦 Installation Checklist

### Backend Setup

- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Set `MONGO_URI` in `.env`
- [ ] Set `JWT_SECRET` in `.env`
- [ ] Set `PORT` in `.env` (default: 5000)

### Frontend Setup

- [ ] Navigate to `frontend` folder
- [ ] Run `npm install`
- [ ] Verify Vite config points to correct backend URL

## 🗄️ Database Checklist

- [ ] MongoDB is installed
- [ ] MongoDB service is running (`mongod` command or service)
- [ ] Can connect to MongoDB (check connection in terminal)
- [ ] Database `saasorbit` will be created automatically on first use

## 🚀 Running the Application Checklist

### Start Backend

- [ ] Open terminal in `backend` folder
- [ ] Run `npm run dev`
- [ ] See message: "Server running on port 5000"
- [ ] See message: "MongoDB Connected..."
- [ ] No errors in console

### Start Frontend

- [ ] Open new terminal in `frontend` folder
- [ ] Run `npm run dev`
- [ ] See message with local URL (typically `http://localhost:5173`)
- [ ] No errors in console

### Access Application

- [ ] Open browser
- [ ] Navigate to `http://localhost:5173`
- [ ] See login page load without errors
- [ ] No console errors in browser DevTools

## 🧪 Testing Checklist

### Manual Testing - Registration

- [ ] Go to registration page
- [ ] Fill in form:
  - Name: "Test User"
  - Email: "test@example.com"
  - Password: "test123456"
- [ ] Click Register button
- [ ] See success message
- [ ] Redirected to home page or dashboard
- [ ] Token saved (check DevTools > Application > Local Storage)

### Manual Testing - Login (Correct Password)

- [ ] Go to login page (logout first if needed)
- [ ] Enter email: "test@example.com"
- [ ] Enter password: "test123456" (SAME as registration)
- [ ] Click Login button
- [ ] See success toast message
- [ ] Redirected to home page
- [ ] User data displayed correctly

### Manual Testing - Login (Wrong Password)

- [ ] Go to login page
- [ ] Enter email: "test@example.com"
- [ ] Enter password: "wrongpassword" (DIFFERENT from registration)
- [ ] Click Login button
- [ ] See error message: "Invalid credentials"
- [ ] Stay on login page
- [ ] No redirect

### Automated Testing

- [ ] Navigate to `backend` folder
- [ ] Run: `node test-login-flow.js`
- [ ] All tests pass with ✅ checkmarks
- [ ] See "Complete flow test finished successfully!"

### Password Demo

- [ ] Navigate to `backend` folder
- [ ] Run: `node password-verification-example.js`
- [ ] See detailed password hashing demonstration
- [ ] Understand how bcrypt works

## 🔐 Security Verification Checklist

### Password Storage

- [ ] Open MongoDB Compass or use mongo shell
- [ ] Find a user document
- [ ] Verify `password` field contains hash (starts with `$2a$` or `$2b$`)
- [ ] Verify plain text password is NOT visible

### JWT Token

- [ ] Login successfully
- [ ] Copy token from browser DevTools (Local Storage or Console)
- [ ] Paste token in JWT.io
- [ ] Verify payload contains: id, email, role
- [ ] Verify expiration is set (7 days from issue)

### API Security

- [ ] Try accessing `/api/auth/me` without token → Should return 401 error
- [ ] Try accessing `/api/auth/me` with invalid token → Should return 401 error
- [ ] Try accessing `/api/auth/me` with valid token → Should return user data

## 📡 API Endpoints Testing

### Test with cURL or Postman

#### Register Endpoint

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test","email":"apitest@test.com","password":"test123"}'
```

- [ ] Returns 201 status code
- [ ] Returns user object and token
- [ ] User created in database

#### Login Endpoint

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"apitest@test.com","password":"test123"}'
```

- [ ] Returns 200 status code
- [ ] Returns user object and token
- [ ] Token is valid JWT

#### Me Endpoint

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

- [ ] Returns 200 status code
- [ ] Returns current user data
- [ ] No password in response

## 🐛 Troubleshooting Checklist

### If Backend Won't Start

- [ ] Check if MongoDB is running
- [ ] Check `.env` file exists and has correct values
- [ ] Check if port 5000 is already in use
- [ ] Check `npm install` completed without errors
- [ ] Check Node.js version is 16+

### If Frontend Won't Start

- [ ] Check if port 5173 is already in use
- [ ] Check `npm install` completed without errors
- [ ] Check Vite config is correct
- [ ] Clear browser cache

### If Login Fails

- [ ] Verify email and password are correct
- [ ] Check password is case-sensitive
- [ ] Verify user exists in database
- [ ] Check backend console for errors
- [ ] Check browser console for errors
- [ ] Verify CORS is configured correctly

### If "Invalid Credentials" Error

- [ ] Password doesn't match registration password
- [ ] Email doesn't exist in database
- [ ] Check for typos in email or password
- [ ] Verify case of password (case-sensitive)

### If MongoDB Connection Fails

- [ ] Check MongoDB is installed
- [ ] Check MongoDB is running (`mongod`)
- [ ] Check `MONGO_URI` in `.env` is correct
- [ ] Try connecting with MongoDB Compass
- [ ] Check MongoDB port (default: 27017)

## 📊 Verification Scripts

Run these commands to verify everything:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB is running
mongo --version
# or
mongosh --version

# Test backend is running
curl http://localhost:5000

# Test login endpoint exists
curl http://localhost:5000/api/auth/login

# Run automated test
cd backend && node test-login-flow.js

# Run password demo
cd backend && node password-verification-example.js
```

## ✅ Success Criteria

Your login API is fully functional if:

1. ✅ Backend starts without errors
2. ✅ Frontend starts without errors
3. ✅ MongoDB connection successful
4. ✅ Can register new user
5. ✅ Can login with correct password
6. ✅ Login fails with wrong password
7. ✅ JWT token is generated and valid
8. ✅ Protected routes work with token
9. ✅ Password stored as hash in database
10. ✅ All test scripts pass

## 📚 Documentation Review

- [ ] Read [LOGIN_FLOW_DOCUMENTATION.md](./LOGIN_FLOW_DOCUMENTATION.md)
- [ ] Read [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- [ ] Review [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)
- [ ] Review [SUMMARY.md](./SUMMARY.md)
- [ ] Understand password matching mechanism

## 🎉 Final Verification

If you can check all these boxes, your login API is complete and working:

- [ ] ✅ User can register
- [ ] ✅ User can login with correct credentials
- [ ] ✅ Login fails with wrong credentials
- [ ] ✅ Password stored securely (hashed)
- [ ] ✅ JWT tokens working
- [ ] ✅ Protected routes secured
- [ ] ✅ Frontend and backend integrated
- [ ] ✅ No security vulnerabilities
- [ ] ✅ Error handling works
- [ ] ✅ All tests pass

**🎊 Congratulations! Your login API is fully functional and secure! 🎊**

---

## 📝 Notes

- Remember: Password entered during login MUST match password from registration
- Passwords are case-sensitive
- Tokens expire after 7 days
- Always use HTTPS in production
- Keep JWT_SECRET secure and never commit to Git

## 🆘 Need Help?

If something isn't working:

1. Check the troubleshooting section above
2. Review the error messages carefully
3. Check the documentation files
4. Verify all environment variables are set
5. Make sure MongoDB is running
6. Check console logs in both backend and browser

---

**Last Updated**: November 2025
**Status**: Complete and Functional ✅
