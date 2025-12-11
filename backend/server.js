import "./config/loadEnv.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { initGridFS } from "./utils/gridfs.js";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import aiRoutes from "./routes/ai.js";
import authRoutes from "./routes/authRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import productListingRoutes from "./routes/productListing.js";
import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();

const app = express();
connectDB().then(() => {
  initGridFS(mongoose.connection);
});

// CORS Configuration - Must be FIRST before any other middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Serve uploads folder as static files
// Serve files from GridFS by file ID
import { getGridFSBucket } from "./utils/gridfs.js";
app.get("/file/:id", async (req, res) => {
  try {
    const bucket = getGridFSBucket();
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).send("File not found");
    }
    res.set("Content-Type", files[0].contentType || "application/octet-stream");
    bucket.openDownloadStream(fileId).pipe(res);
  } catch (err) {
    res.status(500).send("Error retrieving file");
  }
});

app.use(express.json());
app.use(cookieParser());

// Add logging middleware for debugging
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  next();
});

// Routes

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "SaaSOrbit API Documentation",
  })
);

// Swagger JSON endpoint
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ProductListing", productListingRoutes);
app.use("/api", otpRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🚀 SaaSOrbit API is running",
    documentation: `http://localhost:${process.env.PORT || 5001}/api-docs`,
    endpoints: {
      swagger: "/api-docs",
      swaggerJson: "/api-docs.json",
      auth: "/api/auth",
      vendor: "/api/vendor",
      ai: "/api/ai",
      products: "/api/ProductListing",
      otp: "/api",
    },
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working",
    routes: ["request-otp", "verify-otp"],
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
