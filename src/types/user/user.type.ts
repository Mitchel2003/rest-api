import { Document } from "mongoose";

export interface Permissions {
  overwrite: { read: boolean; create: boolean; update: boolean; delete: boolean };
  headquarters: string[];
}

export interface User extends Document {
  uid: string; //uid de firebase
  email: string;
  username: string;
  permissions?: Permissions;
  role: 'engineer' | 'admin' | 'medical';

  createdAt?: Date;
  updatedAt?: Date;
}

export const Overwrite = {
  read: { type: Boolean, default: false },
  create: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false }
}
export const DefaultOverwrite = {
  read: true,
  create: false,
  update: false,
  delete: false
}