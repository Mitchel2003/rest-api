import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface City extends Document {
  name: string,
  state: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface CityService {
  createCity(city: City): Promise<City>
  findCitys(query?: Query): Promise<City[]>
  findOneCity(query: Query): Promise<City | null>
  findCityById(id: string): Promise<City | null>
  updateCity(id: string, cv: Partial<City>): Promise<City | null>
  deleteCity(id: string): Promise<boolean>
}