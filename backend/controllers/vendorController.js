// backend/controllers/vendorController.js
import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "7d" }
  );
};

// POST /api/vendor/register
export const registerVendor = async (req, res) => {
  try {
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

    // Validate required fields
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

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res
        .status(400)
        .json({ message: "Vendor with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new vendor
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

    // Generate token
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
};

// GET /api/vendor/all
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, vendors });
  } catch (err) {
    console.error("Get vendors error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/vendor/:id
export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ success: true, vendor });
  } catch (err) {
    console.error("Get vendor error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
