import { Document } from "mongoose"

export interface Check extends Document {
  name: string;
  inactive: boolean;
  createdAt?: Date,
  updatedAt?: Date
}