import { Document, Schema } from "mongoose"

export interface Maintenance extends Document {
  dateNextMaintenance: string,
  dateMaintenance: string,

  typeMaintenance: string,
  observations: string,
  statusEquipment: string,
  metadata?: Record<string, any>,
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

/**
 * Metadata (�):
 * 
 * Contains references to files (images); this is them arquitecture:
 * { files: string[] => images urls }
 */