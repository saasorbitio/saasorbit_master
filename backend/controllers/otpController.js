import jwt from "jsonwebtoken";
import Otp from "../models/Otp.js";
import Vendor from "../models/Vendor.js";
import transporter, { mailFrom } from "../config/email.js";
import { generateOtp, isCompanyEmail } from "../utils/otp.js";

export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required." });
    if (!isCompanyEmail(email))
      return res.status(400).json({
        message: "Only company domain emails are allowed.",
      });

    // Check if email already exists in Vendor collection
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({
        message: "Email already registered. Please login instead.",
      });
    }

    // Throttle resend: 60 seconds
    const existing = await Otp.findOne({ email });
    if (existing && Date.now() - existing.lastSent.getTime() < 60000) {
      return res.status(429).json({
        message: "Please wait 1 minute before requesting OTP again.",
      });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt, attempts: 0, lastSent: new Date() },
      { upsert: true, new: true }
    );

    // SEND EMAIL
    await transporter.sendMail({
      from: mailFrom,
      to: email,
      subject: "Your OTP Code – SaaSOrbit",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color:#222;">Your OTP Code</h2>
          <div style="padding:20px;background:#f3f3f3;border-radius:8px;text-align:center;">
            <h1 style="font-size:42px;color:#4CAF50;">${otp}</h1>
          </div>
          <p>This OTP expires in <strong>5 minutes</strong>.</p>
          <p style="font-size:12px;color:#666;">If you did not request this, ignore it.</p>
        </div>
      `,
    });

    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Email send error:", error.message);
    return res.status(500).json({
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email });
    if (!record)
      return res.status(400).json({
        message: "No OTP found. Request a new one.",
      });

    // Expired?
    if (Date.now() > record.expiresAt.getTime())
      return res.status(400).json({ message: "OTP expired." });

    // Too many attempts?
    if (record.attempts >= 5)
      return res.status(429).json({
        message: "Too many attempts. Request a new OTP.",
      });

    // Incorrect?
    if (record.otp !== otp) {
      record.attempts++;
      await record.save();
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // Correct OTP → delete and issue JWT
    await Otp.deleteOne({ email });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      message: "OTP verified successfully",
      token,
    });
  } catch (error) {
    console.error("❌ OTP Verify Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
