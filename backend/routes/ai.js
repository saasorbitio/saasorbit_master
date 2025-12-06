import express from "express";
import OpenAI from "openai";
import Chat from "../models/ChatHistory.js";

const router = express.Router();

// Lazy-init OpenAI client only when needed
let openaiClient = null;
function getOpenAIClient() {
  if (!openaiClient && process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

router.post("/chat", async (req, res) => {
  const { message, userId } = req.body;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  // Validate OpenAI configuration
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error:
        "AI service not configured. Please set OPENAI_API_KEY in environment variables.",
    });
  }

  let chat = await Chat.findOne({ userId });
  if (!chat) chat = await Chat.create({ userId, messages: [] });

  const messages = [
    { role: "system", content: "You are a SaaS advisor bot." },
    ...chat.messages.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  try {
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages,
    });

    const reply = response.choices[0].message.content;

    chat.messages.push({ role: "user", content: message });
    chat.messages.push({ role: "assistant", content: reply });
    await chat.save();

    return res.json({ success: true, reply });
  } catch (err) {
    console.error("AI chat error:", err);

    // Handle quota exceeded error
    if (err.status === 429 || err.message?.includes("quota")) {
      return res.status(429).json({
        error: "AI service quota exceeded",
        message:
          "The AI service has reached its usage limit. Please contact support or try again later.",
        userMessage:
          "Sorry, our AI service is temporarily unavailable due to usage limits. Please try again later or contact support.",
      });
    }

    // Handle other OpenAI errors
    if (err.status) {
      return res.status(err.status).json({
        error: "AI service error",
        message: err.message,
        userMessage:
          "Unable to process your request at this time. Please try again.",
      });
    }

    // Generic error
    res.status(500).json({
      error: "AI request failed",
      message: err.message,
      userMessage: "Something went wrong. Please try again.",
    });
  }
});

export default router;
