import { Query } from "@/types/repository.type"
import { Document } from "mongoose";

export interface User extends Document {
  //standard
  email: string,
  username: string,
  access: boolean,
  role: 'engineer' | 'admin',

  //defautls mongoDB
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserService {
  createUser(user: User): Promise<User>
  findUsers(query?: Query): Promise<User[]>
  findOneUser(query: Query): Promise<User | null>
  findUserById(id: string): Promise<User | null>
  updateUser(id: string, user: Partial<User>): Promise<User | null>
  deleteUser(id: string): Promise<boolean>
}