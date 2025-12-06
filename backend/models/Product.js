import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  keyFeaturesFile: { type: String }, // GridFS file ID
  integration: { type: [String], default: [] },
  priceModel: { type: String },
  documentationUrl: { type: String },
  releaseNotesFile: { type: String }, // GridFS file ID
  displayIcon: { type: String }, // GridFS file ID
  screenshots: { type: String }, // GridFS file ID
  userId: { type: String }, // Optional: for filtering by user
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", ProductSchema);
