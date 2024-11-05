import { Query } from "@/types/repository.type"
import { Document } from "mongoose"

export interface Calibration extends Document {
  name: string;
  typeMeasurement: string;
  createdAt?: Date,
  updatedAt?: Date
}

export interface CalibrationService {
  createCalibration(calibration: Calibration): Promise<Calibration>
  findCalibrations(query?: Query): Promise<Calibration[]>
  findOneCalibration(query: Query): Promise<Calibration | null>
  findCalibrationById(id: string): Promise<Calibration | null>
  updateCalibration(id: string, calibration: Partial<Calibration>): Promise<Calibration | null>
  deleteCalibration(id: string): Promise<boolean>
}