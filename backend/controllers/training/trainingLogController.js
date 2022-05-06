import expressAsyncHandler from "express-async-handler";
import TrainingLog from "../../models/trainingLogModel.js";
import Training from "../../models/trainingModel.js";
import ExerciseLog from "../../models/exerciseLogModel.js";

// @desc    Create new training log
// @route   POST /api/trainings/log
// @access  Private
export const createNewTrainingLog = expressAsyncHandler(async(req, res) => {
  const {trainingId} = req.body;
  const user = req.user._id;

  const training = await Training.findById(trainingId).populate('exercises');

  if (training) {
    const trainingLog = await TrainingLog.create({
      user,
      training: trainingId
    });

    const logs = training.exercises.map(exercise => {
      let timesArray = [];

      for (let i = 0; i < exercise.times; i++) {
        timesArray.push({
          weight: 0,
          repeat: 0,
        });
      }

      return {
        user,
        exercise: exercise._id,
        times: timesArray,
        trainingLog: trainingLog._id
      }
    })

    const createExerciseLogs = await ExerciseLog.insertMany(logs);
    const exerciseLogIds = createExerciseLogs.map(log => log._id);
    const foundTrainingLog = await TrainingLog.findById(trainingLog._id);
    foundTrainingLog.exerciseLogs = exerciseLogIds;

    const updatedTrainingLog = await foundTrainingLog.save();
    res.json(updatedTrainingLog);
  } else {
    res.status(404);
    throw new Error('Training does not exist');
  }
});

// @desc    Get training log
// @route   GET /api/trainings/log/:id
// @access  Private
export const getTrainingLog = expressAsyncHandler(async(req, res) => {
  const trainingLog = await TrainingLog.findById(req.params.id)
                                       .populate('training')
                                       .populate({
                                         path: 'exerciseLog',
                                         populate: {
                                           path: 'exercise',
                                         }
                                       })
                                       .lean()

  const minutes = Math.ceil(trainingLog.training.exercises.length * 3.7);
  res.json({...trainingLog, minutes});
});

// @desc    Update training log completed
// @route   PUT /api/trainings/log/completed
// @access  Private
export const updateCompleteTrainingLog = expressAsyncHandler(async(req, res) => {
  const {logId} = req.body;
  const currentLog = await TrainingLog.findById(logId);

  if (currentLog) {
    res.status(404);
    throw new Error('Log does not exist');
  }

  currentLog.complted = true;
  const updatedLog = await  currentLog.save();
  res.json(updatedLog);
});