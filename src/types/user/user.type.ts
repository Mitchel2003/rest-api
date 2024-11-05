import { Result } from "@/interfaces/api.interface";
import { Query } from "@/types/repository.type"
import { Document } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  permissions: Permissions;
  role: 'engineer' | 'admin';

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Permissions {
  overwrite: { read: boolean; create: boolean; update: boolean; delete: boolean };
  headquarters: string[];
}
export const Overwrite = {
  read: { type: Boolean, default: false },
  create: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false }
}

export interface UserService {
  createUser(user: User): Promise<Result<User>>
  findUsers(query?: Query): Promise<Result<User[]>>
  findOneUser(query: Query): Promise<Result<User | null>>
  findUserById(id: string): Promise<Result<User | null>>
  updateUser(id: string, user: Partial<User>): Promise<Result<User | null>>
  deleteUser(id: string): Promise<Result<boolean>>
}