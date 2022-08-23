import mongoose from 'mongoose';

const TireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    default: 0,
  },
});

const TireModel = mongoose.model('Tire', TireSchema);

export default TireModel;