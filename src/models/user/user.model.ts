import { User, Permissions, Overwrite } from "@/types/user/user.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

//structuring permissions
const permissionsSchema: Schema<Permissions> = new Schema({
  overwrite: {
    type: Overwrite,
    default: { read: true, create: false, update: false, delete: false }
  },
  headquarters: { type: [String], default: [] }
}, { _id: false });

//Schema user
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
  permissions: {
    required: true,
    type: permissionsSchema,
    default: () => ({
      overwrite: { read: true, create: false, update: false, delete: false },
      headquarters: []
    })
  },
  role: {
    type: String,
    required: true,
    default: 'engineer',
    enum: ['engineer', 'admin']
  }
}, configSchema);

export default mongoose.model('user', userSchema);