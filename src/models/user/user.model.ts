import { User } from "@/types/user/user.type";
import mongoose, { Schema } from "mongoose";
import configSchema from "@/utils/schema";

const userSchema: Schema<User> = new Schema({
  //to auth-firebase (password is handled by firebase)
  fcmToken: { type: String, required: false },
  uid: { index: true, type: String, unique: true, required: true }, // To index by uid
  email: { index: true, type: String, unique: true, required: true }, // To index by email
  //to user credentials
  username: { type: String, required: true },
  phone: { type: String, required: true },
  //dependent role
  nit: { type: String, required: false, trim: true },
  invima: { type: String, required: false, trim: true },
  profesionalLicense: { type: String, required: false, trim: true },
  //access (role)
  role: { index: true, type: String, required: true, enum: ['client', 'company', 'engineer', 'admin'] }, // Index by role
  permissions: { default: [], type: [String], required: false },
  inactive: { type: Boolean, default: false, required: false },
  metadata: { default: {}, type: Object, required: false }
}, configSchema)

export default mongoose.model('user', userSchema);