// Intialize Express
import express from "express";

// Initialize Router
const router = express.Router();

// Import Controller
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/usercontroller.js";

// Get routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// Post routes
router.post("/", createUser);

// Put routes
router.put("/:id", updateUser);

// Delete routes
router.delete("/:id", deleteUser);
export default router;
