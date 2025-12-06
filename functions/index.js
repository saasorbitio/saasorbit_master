require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai").default;

// Initialize Express App
const app = express();

// CORS Configuration
app.use(
  cors({
    origin: true, // Firebase Functions requires this for flexible origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    // Try to get from Secret Manager first, then fallback to config or env
    const MONGO_URI =
      process.env.MONGO_URI ||
      (functions.config().mongo && functions.config().mongo.uri);

    if (!MONGO_URI) {
      console.error("MONGO_URI not configured");
      return;
    }

    console.log("Attempting MongoDB connection...");
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

// Models
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

const vendorSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["User", "Vendor", "Media"],
      default: "Vendor",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    landline: String,
    fax: String,
    gst: { type: String, required: true },
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    website: String,
    linkedin: String,
    x: String,
    accepted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

const MessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const ChatSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    messages: [MessageSchema],
  },
  { timestamps: true }
);
const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

// JWT Helper
const generateToken = (user) => {
  const JWT_SECRET =
    process.env.JWT_SECRET ||
    functions.config().jwt?.secret ||
    "your-secret-key";
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// OpenAI Client
let openaiClient = null;
function getOpenAIClient() {
  if (!openaiClient) {
    const OPENAI_API_KEY =
      process.env.OPENAI_API_KEY || functions.config().openai?.api_key;
    if (OPENAI_API_KEY) {
      openaiClient = new OpenAI({ apiKey: OPENAI_API_KEY });
    }
  }
  return openaiClient;
}

// Connect to DB on cold start
connectDB();

// ============ AUTH ROUTES ============

// POST /vendor/api/auth/register
app.post("/vendor/api/auth/register", async (req, res) => {
  try {
    await connectDB();
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });

    const token = generateToken(user);
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Register error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /vendor/api/auth/login
app.post("/vendor/api/auth/login", async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email });
    let isVendor = false;

    if (!user) {
      user = await Vendor.findOne({ email });
      isVendor = true;
    }

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: isVendor ? user.companyName : user.name,
        email: user.email,
        role: user.role || "user",
      },
      token,
    });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /vendor/api/auth/google
app.post("/vendor/api/auth/google", async (req, res) => {
  try {
    await connectDB();
    const { googleEmail, googleName } = req.body;

    if (!googleEmail) {
      return res.status(400).json({ message: "googleEmail is required" });
    }

    let user = await User.findOne({ email: googleEmail });

    if (!user) {
      user = await User.create({
        email: googleEmail,
        name: googleName || "Google User",
        googleId: `mock-${googleEmail}`,
      });
    }

    const token = generateToken(user);
    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Google login error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /vendor/api/auth/logout
app.post("/vendor/api/auth/logout", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /vendor/api/auth/me
app.get("/vendor/api/auth/me", async (req, res) => {
  try {
    await connectDB();
    const JWT_SECRET =
      process.env.JWT_SECRET ||
      functions.config().jwt?.secret ||
      "your-secret-key";
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    let user = await User.findById(payload.id);
    let isVendor = false;
    if (!user) {
      user = await Vendor.findById(payload.id);
      isVendor = !!user;
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role || "user",
        name: isVendor ? user.companyName : user.name,
        companyName: isVendor ? user.companyName : undefined,
        ...(isVendor
          ? {
              landline: user.landline,
              fax: user.fax,
              gst: user.gst,
              address1: user.address1,
              address2: user.address2,
              city: user.city,
              state: user.state,
              zip: user.zip,
              country: user.country,
              website: user.website,
              linkedin: user.linkedin,
              x: user.x,
              status: user.status,
            }
          : {}),
      },
    });
  } catch (err) {
    console.error("Auth me error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============ VENDOR ROUTES ============

// POST /vendor/api/vendor/register
app.post("/vendor/api/vendor/register", async (req, res) => {
  try {
    await connectDB();
    const {
      role,
      email,
      password,
      companyName,
      landline,
      fax,
      gst,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      website,
      linkedin,
      x,
      accepted,
    } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (
      !companyName ||
      !gst ||
      !address1 ||
      !city ||
      !state ||
      !zip ||
      !country
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    if (!accepted) {
      return res
        .status(400)
        .json({ message: "You must accept terms and conditions" });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res
        .status(400)
        .json({ message: "Vendor with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const vendor = await Vendor.create({
      role: role || "Vendor",
      email,
      password: hashedPassword,
      companyName,
      landline,
      fax,
      gst,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      website,
      linkedin,
      x,
      accepted,
      status: "pending",
    });

    const token = generateToken(vendor);

    res.status(201).json({
      success: true,
      message: "Vendor registered successfully",
      token,
      user: {
        id: vendor._id,
        email: vendor.email,
        name: vendor.companyName,
        role: vendor.role,
      },
      vendor: {
        id: vendor._id,
        companyName: vendor.companyName,
        email: vendor.email,
        status: vendor.status,
      },
    });
  } catch (err) {
    console.error("Vendor registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// GET /vendor/api/vendor/all
app.get("/vendor/api/vendor/all", async (req, res) => {
  try {
    await connectDB();
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, vendors });
  } catch (err) {
    console.error("Get vendors error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /vendor/api/vendor/:id
app.get("/vendor/api/vendor/:id", async (req, res) => {
  try {
    await connectDB();
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ success: true, vendor });
  } catch (err) {
    console.error("Get vendor error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============ AI ROUTES ============

// POST /vendor/api/ai/chat
app.post("/vendor/api/ai/chat", async (req, res) => {
  try {
    await connectDB();
    const { message, userId } = req.body;

    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const OPENAI_API_KEY =
      process.env.OPENAI_API_KEY || functions.config().openai?.api_key;
    if (!OPENAI_API_KEY) {
      return res.status(503).json({
        error:
          "AI service not configured. Please set OPENAI_API_KEY in environment variables.",
      });
    }

    let chat = await Chat.findOne({ userId });
    if (!chat) chat = await Chat.create({ userId, messages: [] });

    const messages = [
      { role: "system", content: "You are a SaaS advisor bot." },
      ...chat.messages.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const client = getOpenAIClient();
    const OPENAI_MODEL =
      process.env.OPENAI_MODEL ||
      functions.config().openai?.model ||
      "gpt-4o-mini";
    const response = await client.chat.completions.create({
      model: OPENAI_MODEL,
      messages,
    });

    const reply = response.choices[0].message.content;

    chat.messages.push({ role: "user", content: message });
    chat.messages.push({ role: "assistant", content: reply });
    await chat.save();

    return res.json({ success: true, reply });
  } catch (err) {
    console.error("AI chat error:", err);

    if (err.status === 429 || err.message?.includes("quota")) {
      return res.status(429).json({
        error: "AI service quota exceeded",
        message:
          "The AI service has reached its usage limit. Please contact support or try again later.",
        userMessage:
          "Sorry, our AI service is temporarily unavailable due to usage limits. Please try again later or contact support.",
      });
    }

    if (err.status) {
      return res.status(err.status).json({
        error: "AI service error",
        message: err.message,
        userMessage:
          "Unable to process your request at this time. Please try again.",
      });
    }

    res.status(500).json({
      error: "AI request failed",
      message: err.message,
      userMessage: "Something went wrong. Please try again.",
    });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Debug route to see what path Firebase is sending
app.use((req, res, next) => {
  console.log("Received request:", req.method, req.path, req.url);
  next();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    url: req.url,
    method: req.method,
  });
});

// Export Firebase Function
exports.vendorBackend = functions.https.onRequest(app);
