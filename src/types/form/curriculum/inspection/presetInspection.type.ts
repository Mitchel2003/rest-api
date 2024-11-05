import { Query } from "@/types/repository.type"
import { Document } from "mongoose"

export interface PresetInspection extends Document {
  namePreset: string,
  inactive: Boolean,
  createdAt?: Date,
  updatedAt?: Date
}

export interface PresetInspectionService {
  createPresetInspection(presetInspection: PresetInspection): Promise<PresetInspection>
  findPresetInspections(query?: Query): Promise<PresetInspection[]>
  findOnePresetInspection(query: Query): Promise<PresetInspection | null>
  findPresetInspectionById(id: string): Promise<PresetInspection | null>
  updatePresetInspection(id: string, presetInspection: Partial<PresetInspection>): Promise<PresetInspection | null>
  deletePresetInspection(id: string): Promise<boolean>
}