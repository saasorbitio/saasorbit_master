import express from "express";

import {
  registerVendor,
  getAllVendors,
  getVendorById,
  updateVendorProfile,
  deleteVendorByEmail,
} from "../controllers/vendorController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/**
 * @swagger
 * /api/vendor/register:
 *   post:
 *     summary: Register a new vendor
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - email
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: Acme Corporation
 *               email:
 *                 type: string
 *                 format: email
 *                 example: vendor@acme.com
 *               companyLogo:
 *                 type: string
 *                 format: binary
 *                 description: Company logo image file
 *               description:
 *                 type: string
 *                 example: Leading provider of innovative solutions
 *               website:
 *                 type: string
 *                 format: uri
 *                 example: https://acme.com
 *     responses:
 *       201:
 *         description: Vendor successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       400:
 *         description: Bad request - Vendor already exists or invalid data
 *       500:
 *         description: Server error
 */
router.post("/register", upload.single("companyLogo"), registerVendor);

/**
 * @swagger
 * /api/vendor/all:
 *   get:
 *     summary: Get all vendors
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: List of all vendors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vendor'
 *       500:
 *         description: Server error
 */
router.get("/all", getAllVendors);

/**
 * @swagger
 * /api/vendor/{id}:
 *   get:
 *     summary: Get vendor by ID
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Vendor details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getVendorById);

/**
 * @swagger
 * /api/vendor/{id}/profile:
 *   put:
 *     summary: Update vendor profile
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               description:
 *                 type: string
 *               website:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Vendor profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
router.put("/:id/profile", updateVendorProfile);

/**
 * @swagger
 * /api/vendor/delete-by-email:
 *   delete:
 *     summary: Delete vendor by email address
 *     description: Deletes all vendor details based on the provided email address. This will permanently remove the vendor from the database, including their company logo from GridFS storage.
 *     tags: [Vendor]
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
 *                 description: Email address of the vendor to delete
 *                 example: vendor@acme.com
 *     responses:
 *       200:
 *         description: Vendor successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Vendor with email vendor@acme.com has been successfully deleted
 *                 deletedVendor:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: vendor@acme.com
 *                     companyName:
 *                       type: string
 *                       example: Acme Corporation
 *                     _id:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439011
 *       400:
 *         description: Bad request - Email is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email is required
 *       404:
 *         description: Vendor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No vendor found with email vendor@acme.com
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error while deleting vendor
 *                 error:
 *                   type: string
 */
router.delete("/delete-by-email", deleteVendorByEmail);

export default router;
