import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface CalibrationEquipment extends Document {//relationship between calibration and equipment
  date: Date,
  value: string,
  provider: string,
  equipment: Schema.Types.ObjectId,
  calibration: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface CalibrationEquipmentService {
  createCalibrationEquipment(calibrationEquipment: CalibrationEquipment): Promise<CalibrationEquipment>
  findCalibrationEquipments(query?: Query): Promise<CalibrationEquipment[]>
  findOneCalibrationEquipment(query: Query): Promise<CalibrationEquipment | null>
  findCalibrationEquipmentById(id: string): Promise<CalibrationEquipment | null>
  updateCalibrationEquipment(id: string, calibrationEquipment: Partial<CalibrationEquipment>): Promise<CalibrationEquipment | null>
  deleteCalibrationEquipment(id: string): Promise<boolean>
}