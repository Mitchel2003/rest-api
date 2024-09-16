import { Document } from "mongoose";

interface User extends Document {
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

export default User;