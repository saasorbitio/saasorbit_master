# SaaSOrbit - Socio-SaaS Network

A complete SaaS platform with user authentication, vendor management, and AI integration.

## 🚀 Features

- ✅ User Registration & Login
- ✅ Password Authentication (bcrypt hashed)
- ✅ JWT Token-based Sessions
- ✅ Vendor Management
- ✅ Protected Routes
- ✅ Social Login Integration (Google, Outlook, LinkedIn)
- ✅ AI Chat Integration
- ✅ Modern React UI with Tailwind CSS

## 📚 Documentation

- **[Complete Login Flow Documentation](./LOGIN_FLOW_DOCUMENTATION.md)** - Detailed guide on authentication system
- **[Quick Reference Guide](./QUICK_REFERENCE.md)** - Quick API reference and common tasks
- **[Architecture Diagram](./ARCHITECTURE_DIAGRAM.md)** - Visual system architecture and flow diagrams

## 🛠️ Tech Stack

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- AI Integration (Anthropic Claude or OpenAI selectable via env)

### Frontend

- React + Vite
- Tailwind CSS
- Formik + Yup (forms & validation)
- React Router
- Axios
- React Toastify

## ⚡ Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd saasorbit_master
```

2. **Setup Backend**

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URI and JWT secret
```

3. **Setup Frontend**

```bash
cd ../frontend
npm install
```

4. **Start MongoDB**

```bash
mongod
```

5. **Run Backend**

```bash
cd backend
npm run dev
```

6. **Run Frontend**

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5001 (configurable via `PORT`)

## 🔐 Authentication

### Login API Flow

The login system validates user credentials against registered accounts:

1. **Registration**: User creates account with email and password

   - Password is hashed using bcrypt (10 salt rounds)
   - Stored securely in MongoDB

2. **Login**: User enters email and password

   - Backend finds user by email
   - Compares entered password with stored hash using bcrypt
   - If match: generates JWT token and returns user data
   - If no match: returns "Invalid credentials" error

3. **Protected Routes**: JWT token validates access
   - Token expires after 7 days
   - Must re-login after expiration

### API Endpoints

- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate and get token
- `GET /api/auth/me` - Get current user (requires token)
- `POST /api/auth/google` - Google OAuth login

See [LOGIN_FLOW_DOCUMENTATION.md](./LOGIN_FLOW_DOCUMENTATION.md) for complete details.

## 🧪 Testing

Run the login flow test:

```bash
cd backend
node test-login-flow.js
```

This will:

- Register a new test user
- Login with the credentials
- Access protected route
- Test error scenarios

## 📁 Project Structure

```
saasorbit_master/
├── backend/
│   ├── server.js              # Express server
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Vendor.js          # Vendor schema
│   │   └── ChatHistory.js     # Chat history schema
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   └── vendorController.js
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── vendorRoutes.js
│   │   └── ai.js              # AI chat endpoints
│   └── test-login-flow.js     # Test script
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── LoginCard.jsx   # Login form
    │   │   ├── Header.jsx
    │   │   └── ...
    │   ├── context/
    │   │   └── AuthContext.jsx # Auth state
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── vendor/
    │   └── main.jsx
    └── ...
```

## 🔑 Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5001
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/saasorbit
JWT_SECRET=your-super-secret-jwt-key

# AI provider: 'anthropic' (default) or 'openai'
AI_PROVIDER=anthropic

# Anthropic (Claude) API key
ANTHROPIC_API_KEY=your-anthropic-api-key
# Optional override model
ANTHROPIC_MODEL=claude-3.5-haiku-latest

# OpenAI (optional; used if AI_PROVIDER=openai)
OPENAI_API_KEY=your-openai-api-key
# Optional override model
OPENAI_MODEL=gpt-4.1-mini
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT

## 🆘 Support

For detailed authentication documentation, see:

- [LOGIN_FLOW_DOCUMENTATION.md](./LOGIN_FLOW_DOCUMENTATION.md)
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)

# deployment steup for code

## 1. /Users/rajeshwari/Documents/saasorbit_master/frontend && npm run build

## 2. /Users/rajeshwari/Documents/saasorbit_master/admin && npm run build

## 3. /Users/rajeshwari/Documents/saasorbit_master && firebase deploy
