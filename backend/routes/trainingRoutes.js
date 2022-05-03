import express from 'express';
import {protect} from "../middleware/authMiddleware.js";
import {addNewTraining} from "../controllers/training/trainingController.js";

const router = express.Router();

router.route('/').post(protect, addNewTraining);

export default router;