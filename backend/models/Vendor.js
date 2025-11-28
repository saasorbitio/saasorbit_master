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
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
