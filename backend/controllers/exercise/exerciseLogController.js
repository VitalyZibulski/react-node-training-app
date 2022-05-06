import expressAsyncHandler from "express-async-handler";
import Exercise from "../../models/exerciseModel.js";
import ExerciseLog from "../../models/exerciseLogModel.js";
import {reBuildTimes} from "../../helpers/exerciseLog.js";

// @desc    Create new exercise log
// @route   POST /api/exercises/log
// @access  Private
export const createNewExerciseLog = expressAsyncHandler(async(req, res) => {
  const {exerciseId, times} = req.body();

  let timesArray = [];

  for (let i = 0; i < times; i++) {
    timesArray.push({
      weight: 0,
      repeat: 0,
    });
  }

  const exerciseLog = await Exercise.create({
    user: req.user._id,
    exercise: exerciseId,
    times: timesArray,
  });

  res.json(exerciseLog);
});

// @desc    Get exercise log
// @route   GET /api/exercises/log/:id
// @access  Private
export const getExerciseLog = expressAsyncHandler(async(req, res) => {
  const exerciseLog = await ExerciseLog.findById(req.params.id).populate('exercise', 'name imageId').lean();

  if (!exerciseLog) {
    res.status(404);
    throw new Error('Log does not exist');
  }


  const prevExerciseLogs = await ExerciseLog.find({user: req.user._id, exercise: exerciseLog._id}).sort('desc');
  const prevExerciseLog = prevExerciseLogs[0];

  let newTimes = reBuildTimes(exerciseLog);

  if (prevExerciseLog) {
    newTimes = reBuildTimes(exerciseLog, prevExerciseLog);
  }

  res.json({
    ...exerciseLog,
    times: newTimes
  })
});

// @desc    Update exercise log
// @route   PUT /api/exercises/log/:id
// @access  Private
export const updateExerciseLog = expressAsyncHandler(async(req, res) => {
  const {logId, timeIndex, key, value} = req.body;

  let currentLog = await ExerciseLog.findById(logId);

  if (!currentLog) {
    res.status(404);
    throw new Error('Log does not exist');
  }

  let newTimes = currentLog.times;

  if ((!timeIndex || timeIndex !== 0) || !key || (!value && value !== false)) {
    res.status(404);
    throw new Error('All fields are required');
  }

  newTimes[timeIndex][key] = value;

  currentLog.times = newTimes;

  const updatedLog = await currentLog.save()

  res.json(updatedLog);
});

// @desc    Update status of complete exercise log
// @route   PUT /api/exercises/complete
// @access  Private
export const updateCompleteExerciseLog = expressAsyncHandler(async(req, res) => {
  const {logId, completed} = req.body;
  let currentLog = await ExerciseLog.findById(logId)
                                    .populate('exercise', 'training');

  if (!currentLog) {
    res.status(404);
    throw new Error('Log does not exist');
  };

  currentLog.completed = completed;
  const updatedLog = await currentLog.save()

  res.json(updatedLog);
})