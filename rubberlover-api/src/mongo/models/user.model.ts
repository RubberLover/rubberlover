import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  role: { 
    type: String,
    required: true,
    default: 'user',
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;