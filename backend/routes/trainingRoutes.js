import express from 'express';
import {protect} from "../middleware/authMiddleware.js";
import {getTraining} from "../controllers/training/trainingController.js";
import {createNewTraining} from "../controllers/training/trainingController.js";
import {createNewTrainingLog} from "../controllers/training/trainingLogController.js";
import {updateTraining} from "../controllers/training/trainingController.js";
import {deleteTraining, getTrainings} from "../controllers/training/trainingController.js";
import {updateCompleteTrainingLog} from "../controllers/training/trainingLogController.js";
import {getTrainingLog} from "../controllers/training/trainingLogController.js";

const router = express.Router();

router.route('/').get(protect, getTrainings)
                 .post(protect, createNewTraining)
                 .put(protect, updateTraining)
                 .delete(protect, deleteTraining);
router.route('/log').post(protect, createNewTrainingLog);
router.route('/log/completed').put(protect, updateCompleteTrainingLog);
router.route('/:id').post(protect, getTraining);
router.route('/log/:id').put(protect, getTrainingLog);

export default router;