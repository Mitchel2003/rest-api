import { Document, Types, PopulateOptions } from "mongoose";

export type Query = Record<string, unknown>
export type Doc<T> = T & Document<Types.ObjectId>
export type Populate = string | PopulateOptions | (string | PopulateOptions)[]

export interface PaginatedResult<T> {
  totalCount: number
  pageCount: number
  data: Doc<T>[]
}

export interface PaginationOptions {
  sort?: Record<string, 1 | -1>
  perPage?: number
  page?: number
}

export interface Repository<T> {
  create(data: T): Promise<Doc<T>>
  find(query?: Query, populate?: Populate): Promise<Doc<T>[]>
  findById(id: string, populate?: Populate): Promise<Doc<T> | null>
  findByPaginate(query: Query, options: PaginationOptions, populate?: Populate): Promise<PaginatedResult<T>>
  update(id: string, data: Partial<Doc<T>>, populate?: Populate): Promise<Doc<T> | null>
  delete(id: string): Promise<boolean>
}