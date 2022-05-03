import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema;

const trainingLogSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  training: {
    type: ObjectId,
    ref: 'Training',
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  minimize: false,
  timestamps: true
});

const TrainingLog = mongoose.model('TrainingLog', trainingLogSchema);

export default TrainingLog;