import { Document } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  permissions: Permissions;
  role: 'engineer' | 'admin';

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Permissions {
  overwrite: { read: boolean; create: boolean; update: boolean; delete: boolean };
  headquarters: string[];
}
export const Overwrite = {
  read: { type: Boolean, default: false },
  create: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false }
}