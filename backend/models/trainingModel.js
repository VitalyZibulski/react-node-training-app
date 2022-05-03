import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema;

const trainingSchema = mongoose.Schema({
  name: {type: String, required: true},
  exercises: [
    {
      type: ObjectId,
      ref: 'Exercise',
      required: true,
    }
  ],
  image: {
    type: String,
    required: true,
  }
}, {
  minimize: false,
  timestamps: true
});

const Training = mongoose.model('Training', trainingSchema);

export default Training;