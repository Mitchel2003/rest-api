import { Document } from 'mongoose';

export interface User extends Document {
  uid: string; //uid de firebase
  email: string;
  phone: string;
  company: string;
  username: string;
  inactive: boolean;
  role: 'engineer' | 'admin';

  createdAt?: Date;
  updatedAt?: Date;
}