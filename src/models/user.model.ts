import { User } from "../interfaces/model.interface";
import mongoose, { Schema } from "mongoose";

const userSchema: Schema<User> = new Schema({
  //user essentials
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },

  //email verification
  verificationToken: {
    type: String,
    required: true
  },
  verificationExpiresAt: {
    type: Date,
    required: true
  },

  //restore data user "password"
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpiresAt: {
    type: Date,
    required: false
  }
}, { timestamps: true, versionKey: false })

export default mongoose.model('user', userSchema);