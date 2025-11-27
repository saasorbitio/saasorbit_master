const express = require("express");
const router = express.Router();
const {
  registerVendor,
  getAllVendors,
  getVendorById,
} = require("../controllers/vendorController");

router.post("/register", registerVendor);
router.get("/all", getAllVendors);
router.get("/:id", getVendorById);

module.exports = router;
