import { User, roleValues } from "@/types/user/user.type";
import mongoose, { Schema } from "mongoose";
import configSchema from "@/utils/schema";

const userSchema: Schema<User> = new Schema({
  //to auth-firebase (password is handled by firebase)
  fcmToken: { type: String, required: false },
  uid: { index: true, type: String, unique: true, required: true }, // To index by uid
  email: { index: true, type: String, unique: true, required: true }, // To index by email
  //to user credentials (reference)
  phone: { type: String, required: true },
  username: { type: String, required: true },
  //dependent of the role context (client, company)
  nit: { type: String, required: false, trim: true },
  invima: { type: String, required: false, trim: true },
  profesionalLicense: { type: String, required: false, trim: true },
  //access control, with role and permissions, and metadata for files associated
  role: { index: true, type: String, required: true, enum: roleValues },
  permissions: { default: [], type: [String], required: false },
  inactive: { type: Boolean, default: false, required: false },
  metadata: { default: {}, type: Object, required: false },
  position: { type: String, required: true },
  //handle references associated
  classification: { default: [], type: [String], required: false },
  belongsTo: { type: Schema.Types.ObjectId, ref: 'user', required: false, default: null },
  inventory: { type: String, required: false, unique: true, maxlength: 2, sparse: true }
}, configSchema)

export default mongoose.model('user', userSchema);