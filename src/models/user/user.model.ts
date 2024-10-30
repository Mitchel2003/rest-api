import { User } from "@/types/user/user.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const userSchema: Schema<User> = new Schema({
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
  role: {
    type: String,
    required: true,
    enum: ['engineer', 'admin']
  },
  access: {
    type: Boolean,
    default: false,
    required: false
  }
}, configSchema)

export default mongoose.model('user', userSchema)