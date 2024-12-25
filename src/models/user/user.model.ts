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
    required: false,
    type: permissionsSchema,
    default: () => ({
      overwrite: { read: true, create: false, update: false, delete: false },
      headquarters: []
    })
  },
  role: {
    type: String,
    required: true,
    default: 'medical',
    enum: ['admin', 'engineer', 'medical']
  }
}, configSchema);

export default mongoose.model('user', userSchema);