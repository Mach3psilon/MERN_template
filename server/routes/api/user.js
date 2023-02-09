import express from "express";
import { getUser, getUserById, getUsers } from "../../controllers/user.js";
import {
  isUser,
  isUserOrAdmin,
  isUserorAdminOrSuperUser,
} from "../../middleware/auth.js";

const router = express.Router();

router.get("/", getUsers);

export default router;
