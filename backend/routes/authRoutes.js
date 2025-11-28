// backend/routes/authRoutes.js
import express from "express";
import {
  register,
  login,
  googleLogin,
  me,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/logout", logout);
router.get("/me", me);

export default router;
