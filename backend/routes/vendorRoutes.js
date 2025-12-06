import express from "express";

import {
  registerVendor,
  getAllVendors,
  getVendorById,
  updateVendorProfile,
} from "../controllers/vendorController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", upload.single("companyLogo"), registerVendor);
router.get("/all", getAllVendors);
router.get("/:id", getVendorById);
router.put("/:id/profile", updateVendorProfile);

export default router;
