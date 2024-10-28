import { User } from "@/types/user/user.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const userSchema: Schema<User> = new Schema({
  //standard
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['engineer', 'admin'] },
  access: { type: Boolean, default: false },

  //email verification
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, required: false },
  verificationExpiresAt: { type: Date, required: false },

  //restore data user "password"
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpiresAt: { type: Date, required: false }

}, configSchema)

export default mongoose.model('user', userSchema)