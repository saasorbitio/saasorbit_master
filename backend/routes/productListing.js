import express from "express";
import multer from "multer";
import { getGridFSBucket } from "../utils/gridfs.js";
import Product from "../models/Product.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Accept multiple files for different fields
const cpUpload = upload.fields([
  { name: "displayIcon", maxCount: 1 },
  { name: "screenshots", maxCount: 1 },
  { name: "keyFeaturesFile", maxCount: 1 },
  { name: "releaseNotesFile", maxCount: 1 },
]);

/**
 * @swagger
 * /api/ProductListing:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// GET /api/ProductListing
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /api/ProductListing:
 *   post:
 *     summary: Create a new product listing
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - category
 *               - userId
 *             properties:
 *               productName:
 *                 type: string
 *                 example: Project Management Pro
 *               category:
 *                 type: string
 *                 example: Project Management
 *               documentationUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://docs.example.com
 *               priceModel:
 *                 type: string
 *                 example: Subscription
 *               tags:
 *                 type: string
 *                 description: JSON stringified array of tags
 *                 example: '["productivity", "collaboration"]'
 *               integration:
 *                 type: string
 *                 description: JSON stringified array of integrations
 *                 example: '["slack", "jira"]'
 *               userId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               displayIcon:
 *                 type: string
 *                 format: binary
 *                 description: Product display icon
 *               screenshots:
 *                 type: string
 *                 format: binary
 *                 description: Product screenshots
 *               keyFeaturesFile:
 *                 type: string
 *                 format: binary
 *                 description: Key features document
 *               releaseNotesFile:
 *                 type: string
 *                 format: binary
 *                 description: Release notes document
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
// POST /api/ProductListing
router.post("/", cpUpload, async (req, res) => {
  try {
    const {
      productName,
      category,
      documentationUrl,
      priceModel,
      tags,
      integration,
      userId,
    } = req.body;
    const bucket = getGridFSBucket();
    async function uploadToGridFS(file) {
      if (!file) return null;
      const uploadStream = bucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });
      uploadStream.end(file.buffer);
      await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });
      return uploadStream.id.toString();
    }

    const displayIcon = await uploadToGridFS(req.files["displayIcon"]?.[0]);
    const screenshots = await uploadToGridFS(req.files["screenshots"]?.[0]);
    const keyFeaturesFile = await uploadToGridFS(
      req.files["keyFeaturesFile"]?.[0]
    );
    const releaseNotesFile = await uploadToGridFS(
      req.files["releaseNotesFile"]?.[0]
    );

    const product = new Product({
      productName,
      category,
      documentationUrl,
      priceModel,
      tags: tags ? JSON.parse(tags) : [],
      integration: integration ? JSON.parse(integration) : [],
      userId,
      displayIcon,
      screenshots,
      keyFeaturesFile,
      releaseNotesFile,
    });
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
