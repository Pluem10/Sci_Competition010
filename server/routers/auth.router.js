import express from "express";
import authControllers from "../controllers/auth.controllers.js";

const router = express.Router();

// POST http://localhost:5000/api/v1/auth/signin
router.post("/signup", authControllers.signUp);

// GET http://localhost:5000/api/v1/auth/signin
router.get("/verify/:token", authControllers.verifyEmail);

export default router;
