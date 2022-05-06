import express from 'express';
import {protect} from "../middleware/authMiddleware.js";
import {createNewExerciseLog} from "../controllers/exercise/exerciseLogController.js";
import {createNewExercise} from "../controllers/exercise/exerciseController.js";
import {getExerciseLog} from "../controllers/exercise/exerciseLogController.js";
import {updateExerciseLog} from "../controllers/exercise/exerciseLogController.js";
import {updateCompleteExerciseLog} from "../controllers/exercise/exerciseLogController.js";
import {updateExercise} from "../controllers/exercise/exerciseController.js";

const router = express.Router();

router.route('/').post(protect, createNewExercise)
                 .put(protect, updateExercise);
router.route('/log')
  .post(protect, createNewExerciseLog)
  .put(protect, updateExerciseLog);

router.route('/log/completed')
  .put(protect, updateCompleteExerciseLog);

router.route('/log/:id').get(protect, getExerciseLog);

export default router;