import { Document, Schema } from "mongoose";

{/* -------------------- Users -------------------- */ }
export interface User extends Document {
  //standard
  username: string,
  email: string,
  password: string,
  role: 'engineer' | 'admin',
  access: boolean, //corresponds to boolean to allow access to the system

  //email verification and restore credentials
  isVerified: boolean;
  verificationToken?: string;
  verificationExpiresAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;

  //defautls mongoDB
  createdAt?: Date;
  updatedAt?: Date;
}
{/* -------------------- Task -------------------- */ }
export interface Task extends Document {
  title: string,
  description: string,
  date: Date,
  user: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}
{/* -------------------- Curriculum -------------------- */ }
export interface Curriculum extends Document {
  title: string,
  description: string,
  date: Date,
  user: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}
{/* -------------------- Location -------------------- */ }
export interface Country extends Document {
  name: string,
  createdAt?: Date,
  updatedAt?: Date
}
export interface State extends Document {
  name: string,
  country: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}
export interface City extends Document {
  name: string,
  state: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}
export interface Headquarter extends Document {
  name: string,
  address: string,
  city: Schema.Types.ObjectId,
  client: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}
export interface UserHeadquarter extends Document {//relationship between user and headquarter
  user: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}
{/* -------------------- Client -------------------- */ }
export interface Client extends Document {
  name: string,
  email: string,
  phone: number,
  nit: string,
  createdAt?: Date,
  updatedAt?: Date
}