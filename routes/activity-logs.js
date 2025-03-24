// Intialize Express
import express from "express";

// Call the router
const router = express.Router();

// Import Controllers
import {
  getActivities,
  getActivityById,
  createActivity,
} from "../controllers/activitiescontroller.js";


// Get Routes
router.get('/', getActivities);
router.get('/:id', getActivityById);

// Post Routes
router.post('/', createActivity);

export default router;