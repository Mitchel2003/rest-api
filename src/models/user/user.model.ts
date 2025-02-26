import { User, Permissions, Overwrite } from "@/types/user/user.type";
import mongoose, { Schema } from "mongoose";
import configSchema from "@/utils/schema";

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
  uid: {
    trim: true,
    type: String,
    required: true,
  },
  username: {
    trim: true,
    type: String,
    required: true,
  },
  email: {
    trim: true,
    unique: true,
    type: String,
    required: true,
  },
  phone: {
    trim: true,
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'engineer',
    enum: ['admin', 'engineer']
  },
  permissions: {
    required: false,
    type: permissionsSchema,
    default: () => ({
      overwrite: { read: true, create: false, update: false, delete: false },
      headquarters: []
    })
  }
}, configSchema);

export default mongoose.model('user', userSchema);