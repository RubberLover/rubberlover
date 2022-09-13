import mongoose from 'mongoose';
import { validateWeightUnits, validateWidthUnits } from './tire.model';

const WAMSchema = new mongoose.Schema({
  tireId: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: false,
  },
  width: {
    type: Number,
    required: false,
  },
  weightUnits: {
    type: String,
    required: false,
    validate: [validateWeightUnits],
  },
  widthUnits: {
    type: String,
    required: false,
    validate: [validateWidthUnits],
  },
  psi: {
    type: Number,
    required: false,
  },
  rimInnerWidthMM: {
    type: Number,
    required: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const WAMModel = mongoose.model('WAM', WAMSchema);

export default WAMModel;