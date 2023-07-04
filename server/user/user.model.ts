import mongoose from 'mongoose';
import { User } from './user.schema';

const userSchema = new mongoose.Schema<User>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
