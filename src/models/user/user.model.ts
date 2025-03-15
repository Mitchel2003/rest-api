import mongoose, { Schema } from "mongoose";
import { User } from "@/types/user/user.type";
import configSchema from "@/utils/schema";

const userSchema: Schema<User> = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true // To index by uid
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true // To index by email
  },
  phone: {
    type: String,
    required: true
  },
  inactive: {
    type: Boolean,
    default: false
  },
  username: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true,
    index: true // To index by company
  },
  role: {
    type: String,
    required: true,
    enum: ['engineer', 'admin'],
    index: true // To index by role
  }
}, configSchema)

// Compound indices for common searches
userSchema.index({ company: 1, role: 1 });

export default mongoose.model('user', userSchema);