import express from "express";
import { requestOtp, verifyOtp } from "../controllers/otpController.js";

const router = express.Router();

/**
 * @swagger
 * /api/request-otp:
 *   post:
 *     summary: Request OTP for email verification
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP sent successfully to user@example.com
 *       400:
 *         description: Bad request - Email is required
 *       500:
 *         description: Server error
 */
router.post("/request-otp", requestOtp);

/**
 * @swagger
 * /api/verify-otp:
 *   post:
 *     summary: Verify OTP code
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid or expired OTP
 *       500:
 *         description: Server error
 */
router.post("/verify-otp", verifyOtp);

export default router;
