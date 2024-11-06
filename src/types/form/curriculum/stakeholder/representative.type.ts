import { Document } from "mongoose";

export interface Representative extends Document {
  name: string;
  city: string;
  phone: string;

  createdAt?: Date;
  updatedAt?: Date;
}