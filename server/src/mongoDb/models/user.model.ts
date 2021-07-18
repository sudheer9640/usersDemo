import {model, Schema} from 'mongoose';
import * as bcrypt from 'bcryptjs';

const userSchema = new Schema({
  userName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {type: String},
}, {timestamps: true});

export const generateHash = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

export const validPassword = (password: string, encpassword: string): boolean => {
  return bcrypt.compareSync(password, encpassword);
};

export const User = model('User', userSchema);
