import { Document, Schema } from "mongoose"
import { Query } from "repository.type"

export interface City extends Document {
  name: string,
  state: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface CityService {
  createCity(city: City): Promise<City>
  findCitys(query?: Query): Promise<City[]>
  findOneCity(query: Query): Promise<City>
  findCityById(id: string): Promise<City | null>
  updateCity(id: string, cv: Partial<City>): Promise<City | null>
  DeleteCity(id: string): Promise<boolean>
}