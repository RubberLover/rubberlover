import mongoose from 'mongoose';

enum ValidWeightUnits {
  g = 'g',
  oz = 'oz',
}

export function validateWeightUnits(unit: string) : boolean {
  return unit in ValidWeightUnits;
}

enum ValidWidthUnits {
  mm = 'mm',
  inch = 'inch',
}

export function validateWidthUnits(unit: string) : boolean {
  return unit in ValidWidthUnits;
}

enum ValidWheelSizes {
  size650b = '650b/27.5"',
  size700c = '700c/29"',
  size650c = '650c',
  size26 = '26',
}

function validateWheelSize(size: string) : boolean {
  return Object.values(ValidWheelSizes).includes(size as unknown as ValidWheelSizes);
}

enum ValidTireType {
  tube = 'tube',
  tubular = 'tubular',
  tubelessHooked = 'tubelessHooked',
  tubelessHooless = 'tubelessHookless',
}

function validateTireType(type: string) : boolean {
  return Object.values(ValidTireType).includes(type as unknown as ValidTireType);
}

function validateUrl(possibleUrl: string) : boolean {
  if (possibleUrl === '') return true;
  try {
    return Boolean(new URL(possibleUrl));
  } catch (_) {
    return false;
  }
}

const TireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  brand: {
    type: String,
    required: true,
    minLength: 3,
  },
  weight: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  weightUnits: {
    type: String,
    required: true,
    validate: [validateWeightUnits],
  },
  widthUnits: {
    type: String,
    required: true,
    validate: [validateWidthUnits],
  },
  wheelSize: {
    type: String,
    required: true,
    validate: [validateWheelSize],
  },
  tireType: {
    type: String,
    required: true,
    validate: [validateTireType],
  },
  sources: [{
    type: String,
    validate: [validateUrl],
  }],
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  approvedBy: {
    type: String,
    required: false,
  },
  retired: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dateApproved: {
    type: Date,
    required: false,
  },
  dateRetired: {
    type: Date,
    required: false,
  },
  bicycleRollingResistanceArticle: {
    type: String,
    validate: [validateUrl],
    required: false,
  },
  tpi: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  casingType: {
    type: String,
    required: false,
  },
  countryManufactured: {
    type: String,
    required: false,
  },
  treadPattern: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: false,
  },
  icon: {
    type: String,
    validate: [validateUrl],
    required: false,
  },
});

TireSchema.index({ name: 1, brand: 1, width: 1, wheelSize: 1 }, { unique: true }); //set that a tire must be unique with name, brand, width, and wheel size 
const TireModel = mongoose.model('Tire', TireSchema);

export default TireModel;