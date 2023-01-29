import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'user',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 900,
  },
});
const PasswordResetTokenModel =  mongoose.model('Token', tokenSchema);
export default PasswordResetTokenModel;