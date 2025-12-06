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

// GET /api/ProductListing
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

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
