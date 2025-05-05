import { User } from "@/types/user/user.type";
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
  role: { index: true, type: String, required: true, enum: ['admin', 'company', 'collaborator', 'client'] },
  permissions: { default: [], type: [String], required: false },
  inactive: { type: Boolean, default: false, required: false },
  metadata: { default: {}, type: Object, required: false },
  //company and collaborator (handle behavior)
  belongsTo: { type: String, required: false },
  type: { type: String, required: false, enum: ['contractor', 'independent'] },
  classification: { type: String, required: false, enum: ['biomédico', 'red de frio', 'equipo computo'] }
}, configSchema)

export default mongoose.model('user', userSchema);