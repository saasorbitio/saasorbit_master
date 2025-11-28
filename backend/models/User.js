// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // hashed
    googleId: { type: String }, // for Google login later
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
