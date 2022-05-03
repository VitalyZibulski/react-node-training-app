import expressAsyncHandler from "express-async-handler";
import Exercise from "../../models/exerciseModel.js";

// @desc    Add new exercise
// @route   POST /api/exercises
// @access  Private
export const addNewExercise = expressAsyncHandler(async(req, res) => {
  const {name, times, imageId} = req.body();

  const exercise = await Exercise.create({
    name,
    times,
    imageId
  });

  res.json(exercise);
})