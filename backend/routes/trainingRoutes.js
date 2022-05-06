import express from 'express';
import {protect} from "../middleware/authMiddleware.js";
import {getTraining} from "../controllers/training/trainingController.js";
import {createNewTraining} from "../controllers/training/trainingController.js";
import {createNewTrainingLog} from "../controllers/training/trainingLogController.js";
import {updateTraining} from "../controllers/training/trainingController.js";

const router = express.Router();

router.route('/').post(protect, createNewTraining)
                 .put(protect, updateTraining)
router.route('/log').post(protect, createNewTrainingLog);
router.route('/:id').post(protect, getTraining);

export default router;