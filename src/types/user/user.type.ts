import { Query } from "@/types/repository.type"
import { Document } from "mongoose";

export interface User extends Document {
  //standard
  username: string,
  email: string,
  password: string,
  role: 'engineer' | 'admin',
  access: boolean, //corresponds to boolean to allow access to the system

  //email verification and restore credentials
  isVerified: boolean;
  verificationToken?: string;
  verificationExpiresAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;

  //defautls mongoDB
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserService {
  createUser(user: User): Promise<User>
  findUsers(query?: Query): Promise<User[]>
  findOneUser(query: Query): Promise<User>
  findUserById(id: string): Promise<User | null>
  updateUser(id: string, user: Partial<User>): Promise<User | null>
  deleteUser(id: string): Promise<boolean>
}