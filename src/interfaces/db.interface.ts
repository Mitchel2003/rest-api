import { CollectionReference } from "firebase/firestore";
import { User as UserMongo } from "@/types/user/user.type";
import { UserCredential } from "firebase/auth";

import { Result } from "@/interfaces/api.interface";
import { Schema } from "mongoose";

/*--------------------------------------------------MongoDB--------------------------------------------------*/
export type SchemaID = Schema.Types.ObjectId;

export interface IDatabase {
  createUser(user: UserMongo): Promise<Result<UserMongo>>;
  isUserFound(email: string): Promise<Result<boolean>>;
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface UserDatabaseFB {
  access?: boolean;
  email?: string;
  username?: string;
  role?: 'engineer' | 'admin';
}

export interface AuthService {
  //registration
  registerAccount(username: string, email: string, password: string): Promise<Result<UserCredential>>;
  //verification
  verifyCredentials(email: string, password: string): Promise<Result<UserCredential>>
  //authentication
  sendEmailVerification(): Promise<Result<void>>
  sendEmailResetPassword(email: string): Promise<Result<void>>
  validateResetPassword(oobCode: string, newPassword: string): Promise<Result<void>>
}

export interface StorageService {
  uploadFile(path: string, file: File): Promise<Result<string>>;
  getFile(path: string): Promise<Result<string>>;
  getFiles(path: string): Promise<Result<string[]>>;
  updateFile(path: string, file: File): Promise<Result<string>>;
  deleteFile(path: string): Promise<Result<void>>;
}

export interface DatabaseService {
  registerUserCredentials(auth: UserCredential, credentials: UserDatabaseFB): Promise<Result<void>>;
  getCollection(name: string): CollectionReference;
}
/*---------------------------------------------------------------------------------------------------------*/