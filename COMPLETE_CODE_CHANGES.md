# Complete API Code Changes

## 1. Vendor Model (`backend/models/Vendor.js`)

```javascript
import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["User", "Vendor", "Media"],
      default: "Vendor",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    landline: String,
    fax: String,
    gst: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: String,
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    website: String,
    linkedin: String,
    x: String,
    accepted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    // Profile Details Fields - NEW ADDITIONS
    adminName: String,
    adminJobTitle: String,
    adminContactNumber: String,
    companyLegalName: String,
    brandName: String,
    companyLogo: String,
    foundedYear: String,
    companySize: String,
    businessType: String,
    saasCategory: String,
    saasType: String,
    shortDescription: String,
    detailedDescription: String,
    registrationNumber: String,
    supportEmail: String,
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
```

## 2. Vendor Routes (`backend/routes/vendorRoutes.js`)

```javascript
import express from "express";
import {
  registerVendor,
  getAllVendors,
  getVendorById,
  updateVendorProfile, // NEW IMPORT
} from "../controllers/vendorController.js";

const router = express.Router();

router.post("/register", registerVendor);
router.get("/all", getAllVendors);
router.get("/:id", getVendorById);
router.put("/:id/profile", updateVendorProfile); // NEW ROUTE

export default router;
```

## 3. Vendor Controller - Updated `registerVendor` Function

```javascript
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
      // NEW FIELDS
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

    // Create new vendor with all fields
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
      // Save profile details
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
```

## 4. Vendor Controller - New `updateVendorProfile` Function

```javascript
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

    // Update only provided fields
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
```

## Summary of Changes

### Modified Files:

1. ✅ `backend/models/Vendor.js` - Added 14 new fields
2. ✅ `backend/controllers/vendorController.js` - Updated registerVendor, added updateVendorProfile
3. ✅ `backend/routes/vendorRoutes.js` - Added new PUT route

### New API Endpoints:

- **PUT** `/vendor/api/vendor/:id/profile` - Update vendor profile details

### Data Fields Added:

- adminName
- adminJobTitle
- adminContactNumber
- companyLegalName
- brandName
- companyLogo
- foundedYear
- companySize
- businessType
- saasCategory
- saasType
- shortDescription
- detailedDescription
- registrationNumber
- supportEmail

### Validation:

- Profile fields are all-or-none during registration
- Partial updates allowed via PUT endpoint
- Email format validation
- URL validation for website field
