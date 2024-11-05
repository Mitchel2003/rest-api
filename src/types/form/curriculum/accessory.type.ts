import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface Accessory extends Document {
  name: string;
  type: string;
  serie: string;
  modelEquip: string;
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface AccessoryService {
  createAccessory(accessory: Accessory): Promise<Accessory>
  findAccessorys(query?: Query): Promise<Accessory[]>
  findOneAccessory(query: Query): Promise<Accessory | null>
  findAccessoryById(id: string): Promise<Accessory | null>
  updateAccessory(id: string, accessory: Partial<Accessory>): Promise<Accessory | null>
  deleteAccessory(id: string): Promise<boolean>
}