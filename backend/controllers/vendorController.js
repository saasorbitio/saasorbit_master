// backend/controllers/vendorController.js
const Vendor = require("../models/Vendor");

// POST /api/vendor/register
exports.registerVendor = async (req, res) => {
  try {
    const {
      role,
      companyName,
      email,
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
    if (
      !companyName ||
      !email ||
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

    // Create new vendor
    const vendor = await Vendor.create({
      role: role || "Vendor",
      companyName,
      email,
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

    res.status(201).json({
      success: true,
      message: "Vendor registered successfully",
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
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, vendors });
  } catch (err) {
    console.error("Get vendors error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/vendor/:id
exports.getVendorById = async (req, res) => {
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
