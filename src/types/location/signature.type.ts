import { Document, Schema } from "mongoose"

export interface Signature extends Document {
  url: string;
  active: boolean;
  headquarter: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}