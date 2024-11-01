import { Result } from "@/interfaces/api.interface";
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
  createUser(user: User): Promise<Result<User>>
  findUsers(query?: Query): Promise<Result<User[]>>
  findOneUser(query: Query): Promise<Result<User | null>>
  findUserById(id: string): Promise<Result<User | null>>
  updateUser(id: string, user: Partial<User>): Promise<Result<User | null>>
  deleteUser(id: string): Promise<Result<boolean>>
}