import { Document, Schema } from "mongoose"

export interface Reminder extends Document {
  date: Date;
  subject: string;
  message: string;
  equipment: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}