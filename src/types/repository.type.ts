import { Document, Types, PopulateOptions } from "mongoose";

export type Query = Record<string, unknown>
export type Doc<T> = T & Document<Types.ObjectId>
export type Populate = string | PopulateOptions | (string | PopulateOptions)[]

export interface Repository<T> {
  create(data: T): Promise<Doc<T>>
  find(query?: Query, populate?: Populate): Promise<Doc<T>[]>
  findOne(query: Query, populate?: Populate): Promise<Doc<T> | null>
  findById(id: string, populate?: Populate): Promise<Doc<T> | null>
  update(id: string, data: Partial<Doc<T>>, populate?: Populate): Promise<Doc<T> | null>
  delete(id: string): Promise<boolean>
}