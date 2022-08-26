import mongoose from 'mongoose';

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
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  weightUnits: {
    type: String,
    required: true,
    validate: [validateWeightUnits]
  },
  widthUnits: {
    type: String,
    required: true,
    validate: [validateWidthUnits]
  },
  wheelSize: {
    type: String,
    required: true,
    validate: [validateWheelSize]
  },
  tireType: {
    type: String,
    required: true,
    validate: [validateTireType]
  },
  sources: [{
    type: String,
    validate: [validateUrl]
  }],
  approved: {
    type: Boolean,
    required: true,
    default: false
  },
  approvedBy: {
    type: String,
    required: false
  },
  retired: {
    type: Boolean,
    required: true,
    default: false
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  dateApproved: {
    type: Date,
    required: false
  },
  dateRetired: {
    type: Date,
    required: false
  },
  bicycleRollingResistanceArticle: {
    type: String,
    validate: [validateUrl],
    required: false
  },
  tpi: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  casingType: {
    type: String,
    required: false
  },
  countryManufactured: {
    type: String,
    required: false
  },
  treadPattern: {
    type: String,
    required: false
  },
  year: {
    type: Number,
    required: false
  },
  icon: {
    type: String,
    validate: [validateUrl],
    required: false
  }
});

enum validWeightUnits {
  g = 'g',
  oz = 'oz'
}

function validateWeightUnits(unit: string) : boolean {
  return unit in validWeightUnits;
}

enum validWidthUnits {
  mm = 'mm',
  inch = 'inch'
}

function validateWidthUnits(unit: string) : boolean {
  return unit in validWidthUnits;
}

enum validWheelSizes {
  size650b = '650b/27.5"',
  size700c = '700c/29"',
  size650c = '650c',
  size26 = '26'
}

function validateWheelSize(size: string) : boolean {
  return Object.values(validWheelSizes).includes(size as unknown as validWheelSizes);
}

enum validTireType {
  tube = 'tube',
  tubular = 'tubular',
  tubelessHooked = 'tubelessHooked',
  tubelessHooless = 'tubelessHookless'
}

function validateTireType(type: string) : boolean {
  return Object.values(validTireType).includes(type as unknown as validTireType);
}

function validateUrl(possibleUrl: string) : boolean {
  if (possibleUrl === "") return true;
  try {
    return Boolean(new URL(possibleUrl));
  } catch (_) {
    return false;
  }
}

TireSchema.index({name: 1, brand: 1, width: 1, wheelSize: 1}, {unique: true}); //set that a tire must be unique with name, brand, width, and wheel size 
const TireModel = mongoose.model('Tire', TireSchema);

export default TireModel;