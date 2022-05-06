import expressAsyncHandler from "express-async-handler";
import TrainingLog from "../../models/trainingLogModel.js";

// @desc    Create new training log
// @route   POST /api/trainings/log
// @access  Private
export const createNewTrainingLog = expressAsyncHandler(async(req, res) => {
  const {trainingId} = req.body();

  const trainingLog = await TrainingLog.create({
    user: req.user._id,
    training: trainingId,
  });

  res.json(trainingLog);
});