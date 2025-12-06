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
    let companyLogo = req.body.companyLogo;
    if (req.file) {
      // Store file in GridFS
      const { getGridFSBucket } = await import("../utils/gridfs.js");
      const bucket = getGridFSBucket();
      const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });
      uploadStream.end(req.file.buffer);
      await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });
      companyLogo = uploadStream.id.toString();
    }
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
      adminName,
      adminJobTitle,
      adminContactNumber,
      companyLegalName,
      brandName,
      foundedYear,
      companySize,
      businessType,
      saasCategory,
      saasType,
      shortDescription,
      detailedDescription,
      registrationNumber,
      supportEmail,
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

    // Validate profile details if provided
    if (
      adminName ||
      adminJobTitle ||
      adminContactNumber ||
      companyLegalName ||
      brandName ||
      foundedYear ||
      companySize ||
      businessType ||
      saasCategory ||
      saasType ||
      shortDescription ||
      detailedDescription ||
      registrationNumber ||
      supportEmail
    ) {
      if (
        !adminName ||
        !adminJobTitle ||
        !adminContactNumber ||
        !companyLegalName ||
        !brandName ||
        !foundedYear ||
        !companySize ||
        !businessType ||
        !saasCategory ||
        !saasType ||
        !shortDescription ||
        !detailedDescription ||
        !registrationNumber ||
        !supportEmail
      ) {
        return res.status(400).json({
          message: "Please fill all profile detail fields or skip this step",
        });
      }
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
      // Profile details
      adminName,
      adminJobTitle,
      adminContactNumber,
      companyLegalName,
      brandName,
      companyLogo, // now stores file path if uploaded
      foundedYear,
      companySize,
      businessType,
      saasCategory,
      saasType,
      shortDescription,
      detailedDescription,
      registrationNumber,
      supportEmail,
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
        companyLogo: vendor.companyLogo,
      },
      vendor: {
        id: vendor._id,
        companyName: vendor.companyName,
        email: vendor.email,
        status: vendor.status,
        companyLogo: vendor.companyLogo,
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

// PUT /api/vendor/:id/profile
export const updateVendorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      adminName,
      adminJobTitle,
      adminContactNumber,
      companyLegalName,
      brandName,
      companyLogo,
      foundedYear,
      companySize,
      businessType,
      saasCategory,
      saasType,
      shortDescription,
      detailedDescription,
      registrationNumber,
      supportEmail,
      website,
      landline,
      fax,
      address1,
      address2,
      city,
      state,
      zip,
      country,
    } = req.body;

    // Find vendor
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Update profile fields
    const updateData = {};

    if (adminName) updateData.adminName = adminName;
    if (adminJobTitle) updateData.adminJobTitle = adminJobTitle;
    if (adminContactNumber) updateData.adminContactNumber = adminContactNumber;
    if (companyLegalName) updateData.companyLegalName = companyLegalName;
    if (brandName) updateData.brandName = brandName;
    if (companyLogo) updateData.companyLogo = companyLogo;
    if (foundedYear) updateData.foundedYear = foundedYear;
    if (companySize) updateData.companySize = companySize;
    if (businessType) updateData.businessType = businessType;
    if (saasCategory) updateData.saasCategory = saasCategory;
    if (saasType) updateData.saasType = saasType;
    if (shortDescription) updateData.shortDescription = shortDescription;
    if (detailedDescription)
      updateData.detailedDescription = detailedDescription;
    if (registrationNumber) updateData.registrationNumber = registrationNumber;
    if (supportEmail) updateData.supportEmail = supportEmail;
    if (website) updateData.website = website;
    if (landline) updateData.landline = landline;
    if (fax) updateData.fax = fax;
    if (address1) updateData.address1 = address1;
    if (address2) updateData.address2 = address2;
    if (city) updateData.city = city;
    if (state) updateData.state = state;
    if (zip) updateData.zip = zip;
    if (country) updateData.country = country;

    // Update vendor
    const updatedVendor = await Vendor.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Vendor profile updated successfully",
      vendor: updatedVendor,
    });
  } catch (err) {
    console.error("Update vendor profile error:", err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};
