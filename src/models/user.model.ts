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
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    required: false
  },
  verificationExpiresAt: {
    type: Date,
    required: false
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