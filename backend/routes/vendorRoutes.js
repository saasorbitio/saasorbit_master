import express from "express";
import {
  registerVendor,
  getAllVendors,
  getVendorById,
} from "../controllers/vendorController.js";

const router = express.Router();

router.post("/register", registerVendor);
router.get("/all", getAllVendors);
router.get("/:id", getVendorById);

export default router;
