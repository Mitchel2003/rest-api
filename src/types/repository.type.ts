export type Query = Record<string, unknown>

export interface Repository<T> {
  create(data: T): Promise<T>
  find(query?: Query): Promise<T[]>
  findOne(query: Query): Promise<T | null>
  findById(id: string): Promise<T | null>
  update(id: string, data: Partial<T>): Promise<T | null>
  delete(id: string): Promise<boolean>
}