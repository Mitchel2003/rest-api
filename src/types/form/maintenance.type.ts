import { Document, Schema } from "mongoose"

export interface Maintenance extends Document {
  dateNextMaintenance: string,
  dateMaintenance: string,

  typeMaintenance: string,
  observations: string,
  statusEquipment: string,
  metadata?: Record<string, any>,
  createdBy: Schema.Types.ObjectId,
  curriculum: Schema.Types.ObjectId,
  signature?: Schema.Types.ObjectId,
  signedAt?: Date,
  createdAt?: Date,
  updatedAt?: Date
}

/**
 * Metadata (�):
 * 
 * Contains references to files (images); this is them arquitecture:
 * { files: string[] => images urls }
 * 
 * createdBy (�):
 * 
 * createdBy can be user role "company" or "collaborator"
 * 
 * Reference to the user who created the maintenance;
 * Its especialy useful to know references like logo, signature, or license
 * that corresponds to the user associated to the creation of the maintenance,
 * this way we can autocomplete the form with the information required
 */