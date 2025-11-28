import express from "express";
import OpenAI from "openai";
import Chat from "../models/ChatHistory.js";

const router = express.Router();

// Initialize OpenAI client only if API key is provided
let client = null;
if (process.env.OPENAI_API_KEY) {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// === Normal Chat Route with Memory + DB Save ===
router.post("/chat", async (req, res) => {
  // Check if OpenAI is configured
  if (!client) {
    return res.status(503).json({
      error:
        "AI service not configured. Please set OPENAI_API_KEY in environment variables.",
    });
  }

  const { message, userId } = req.body;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  // Retrieve chat history
  let chat = await Chat.findOne({ userId });
  if (!chat) chat = await Chat.create({ userId, messages: [] });

  const conversationHistory = chat.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  conversationHistory.push({ role: "user", content: message });

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      memory: true,
      messages: conversationHistory,
    });

    const reply = response.output_text;

    // Save to DB
    chat.messages.push({ role: "user", content: message });
    chat.messages.push({ role: "assistant", content: reply });
    await chat.save();

    return res.json({ success: true, reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

// === Streaming Route ===
router.post("/stream", async (req, res) => {
  // Check if OpenAI is configured
  if (!client) {
    return res.status(503).json({
      error:
        "AI service not configured. Please set OPENAI_API_KEY in environment variables.",
    });
  }

  const { message } = req.body;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });

  const stream = await client.responses.stream({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: message }],
  });

  stream.on("event", (chunk) => {
    res.write(`data: ${chunk.output_text || ""}\n\n`);
  });

  stream.on("end", () => res.end());
});

export default router;
