import { Document, Schema } from "mongoose";

{/* -------------------- User -------------------- */ }
export interface User extends Document {
  //standard data
  username: string;
  email: string;
  password: string;

  //email verification and restore credentials
  verificationToken: string;
  verificationExpiresAt: Date;
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
{/* -------------------- Equipment -------------------- */ }
export interface Equipment extends Document {
  title: string,
  description: string,
  date: Date,
  user: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}
