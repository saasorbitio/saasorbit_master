// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "7d" }
  );
};

// GET /api/auth/me
export const me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Try finding user in User, then Vendor
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
};
// POST /api/auth/register
export const register = async (req, res) => {
  try {
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
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check in User model first
    let user = await User.findOne({ email });
    let isVendor = false;

    // If not found in User, check in Vendor model
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
};

// POST /api/auth/google
// ⚠️ This is a SIMPLE MOCK Google login endpoint.
// It expects a "googleEmail" from frontend and either finds or creates a user.
// Later you can replace with real Google OAuth (id_token verification).
export const googleLogin = async (req, res) => {
  try {
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
};

// POST /api/auth/logout
export const logout = async (req, res) => {
  try {
    // Since we're using JWT tokens (stateless), logout is handled on the client side
    // by removing the token from storage. This endpoint is optional but useful for:
    // 1. Logging the logout event
    // 2. Potentially blacklisting tokens (if you implement that)
    // 3. Clearing any server-side sessions if you add them later

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout error", err);
    res.status(500).json({ message: "Server error" });
  }
};
