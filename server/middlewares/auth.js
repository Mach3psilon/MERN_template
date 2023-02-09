import jwt from "jsonwebtoken";

import User from "../../models/User.js";

export async function isUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      message: "Token not provided",
    });
  }

  const auth = jwt.verify(token, process.env.JWT_SECRET);
  if (!auth) {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }

  const user = await User.findOne({ _id: auth.id });
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }

  req.user = user;
  next();
}

export async function isAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      message: "Token not provided",
    });
  }

  const auth = jwt.verify(token, process.env.JWT_SECRET);
  if (!auth) {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }

  const user = await User.findOne({ _id: auth.id });
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }

  if (user.role !== "admin") {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }

  req.user = user;
  next();
}

export async function isSuperAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      message: "Token not provided",
    });
  }

  const auth = jwt.verify(token, process.env.JWT_SECRET);
  if (!auth) {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }

  const user = await User.findOne({ _id: auth.id });
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }

  if (user.role !== "superadmin") {
    return res.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }

  req.user = user;
  next();
}
