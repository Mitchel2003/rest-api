import { Document, Schema } from "mongoose"

export interface Activity extends Document {
  timeHours: { start: string, end: string },
  dateAssignment: Date,
  description: string,
  status: string,

  //state active
  isActive: boolean,
  timeSpent?: number
  lastResumedAt?: Date,

  //references
  collaborator: Schema.Types.ObjectId,
  solicit: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date,
}