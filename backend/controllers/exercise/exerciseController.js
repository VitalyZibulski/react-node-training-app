import expressAsyncHandler from "express-async-handler";
import Exercise from "../../models/exerciseModel.js";

// @desc    Get exercises
// @route   GET /api/exercises
// @access  Private
export const getExercises = expressAsyncHandler(async(req, res) => {
  const exercises = await Exercise.find({});

  res.json(exercises);
})

// @desc    Create new exercise
// @route   POST /api/exercises
// @access  Private
export const createNewExercise = expressAsyncHandler(async(req, res) => {
  const {name, times, imageIndex} = req.body;

  const exercise = await Exercise.create({
    name,
    times,
    imageIdx: imageIndex
  });

  res.json(exercise);
});

// @desc    Update exercise
// @route   PUT /api/trainings
// @access  Private
export const updateExercise = expressAsyncHandler(async(req, res) => {
  const {name, times, imageIndex, exerciseId} = req.body;
  let exercise = await Exercise.findById(exerciseId);

  if (!exercise) {
    res.status(404);
    throw new Error('Exercise does not exist');
  };

  exercise.name = name;
  exercise.times = times;
  exercise.imageIdx = imageIndex;

  const updatedTraining = await exercise.save()

  res.json(updatedTraining);
})

// @desc    Delete exercise
// @route   DELETE /api/exercises
// @access  Private
export const deleteExercise = expressAsyncHandler(async(req, res) => {
  const {exerciseId} = req.body;
  let exercise = await Exercise.findById(exerciseId);

  if (!exercise) {
    res.status(404);
    throw new Error('Exercise does not exist');
  };

  await exercise.remove();

  res.json({message: 'Exercise was deleted'});
});














// @desc    Get exercise
// @route   Get /api/exercises/:id
// @access  Private
// export const addNewExerciseLog = expressAsyncHandler(async(req, res) => {
//   const {exerciseId, times, imageId} = req.body();
//
//   const exercise = await Exercise.create({
//     name,
//     times,
//     imageId
//   });
//
//   res.json(exercise);
// })