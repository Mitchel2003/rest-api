import { Document } from "mongoose";

export interface Manufacturer extends Document {
  name: string;
  city: string;
  phone: string;

  createdAt?: Date;
  updatedAt?: Date;
}