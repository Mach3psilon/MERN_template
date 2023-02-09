import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./api/user.js";
const router = express.Router();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

export default router;
