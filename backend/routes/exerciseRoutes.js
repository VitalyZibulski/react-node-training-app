import express from 'express';
import {protect} from "../middleware/authMiddleware.js";
import {addNewExercise} from "../controllers/exercise/exerciseController.js";

const router = express.Router();

router.route('/').post(protect, addNewExercise);

export default router;