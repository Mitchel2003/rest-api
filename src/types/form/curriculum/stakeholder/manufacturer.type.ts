import { Document } from "mongoose";

export interface Manufacturer extends Document {
  name: string;
  email: string;
  phone: string;

  createdAt?: Date;
  updatedAt?: Date;
}