import { Document, Types } from "mongoose";

export type Query = Record<string, unknown>
export type Doc<T> = T & Document<Types.ObjectId>;

export interface Repository<T> {
  create(data: T): Promise<Doc<T>>
  find(query?: Query, populate?: string): Promise<Doc<T>[]>
  findById(id: string): Promise<Doc<T> | null>
  update(id: string, data: Partial<Doc<T>>): Promise<Doc<T> | null>
  delete(id: string): Promise<boolean>
}