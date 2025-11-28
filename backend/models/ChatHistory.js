import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant", "system"], required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const ChatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [MessageSchema],
}, { timestamps: true });

export default mongoose.model("Chat", ChatSchema);
