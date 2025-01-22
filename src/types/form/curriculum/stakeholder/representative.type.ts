import { Document } from "mongoose";

export interface Representative extends Document {
  name: string;
  phone: string;
  city: string;

  createdAt?: Date;
  updatedAt?: Date;
}