import expressAsyncHandler from "express-async-handler";
import Training from "../../models/trainingModel.js";

// @desc    Create new training
// @route   POST /api/trainings
// @access  Private
export const createNewTraining = expressAsyncHandler(async(req, res) => {
  const {name, exerciseIds} = req.body;

  const exercise = await Training.create({
    name,
    exercises: exerciseIds
  });

  res.json(exercise);
})

// @desc    Get training
// @route   GET /api/trainings/:id
// @access  Private
export const getTraining = expressAsyncHandler(async(req, res) => {
  const training = await Training.findById(req.params.id)
                                  .populate('exercises') // show all info object id
                                  .lean();

  const minutes = Math.ceil(training.exercises.length * 3.7);

  res.json({...training, minutes});
})

// @desc    Update training
// @route   PUT /api/trainings
// @access  Private
export const updateTraining = expressAsyncHandler(async(req, res) => {
  const {name, exerciseIds, trainingId} = req.body;
  let currentTraining = await Training.findById(trainingId);

  if (!currentTraining) {
    res.status(404);
    throw new Error('Training does not exist');
  };

  training.name = name;
  training.exercises = exerciseIds;

  const updatedTraining = await currentTraining.save()

  res.json(updatedTraining);
})