import expressAsyncHandler from "express-async-handler";
import Training from "../../models/trainingModel.js";

// @desc    Add new training
// @route   POST /api/trainings
// @access  Private
export const addNewTraining = expressAsyncHandler(async(req, res) => {
  const {name, exerciseIds} = req.body();

  const exercise = await Training.create({
    name,
    exercises: exerciseIds
  });

  res.json(exercise);
})