const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["User", "Vendor", "Media"],
      default: "Vendor",
    },
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
