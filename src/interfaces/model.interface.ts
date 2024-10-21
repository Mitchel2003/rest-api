import { Document, Schema } from "mongoose";

{/* -------------------- User -------------------- */ }
export interface User extends Document {
  //standard data
  username: string;
  email: string;
  password: string;

  //credentials to access
  role: string;
  access: boolean;

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
//country
export interface Country extends Document {
  name: string,
  createdAt?: Date,
  updatedAt?: Date
}
//state
export interface State extends Document {
  name: string,
  country: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}
//city
export interface City extends Document {
  name: string,
  state: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}