import { CollectionReference } from "firebase/firestore";
import { User as UserMongo } from "@/types/user/user.type";
import { User as UserFirebase } from "firebase/auth";

import { Result } from "@/interfaces/api.interface";
import { Schema } from "mongoose";

/*--------------------------------------------------MongoDB--------------------------------------------------*/
export type SchemaID = Schema.Types.ObjectId;

export interface IDatabase {
  createUser(user: UserCredentialsFB): Promise<Result<UserMongo>>;
  isUserFound(email: string): Promise<Result<boolean>>;
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface AuthService {
  //registration
  registerAccount(username: string, email: string, password: string): Promise<Result<UserFirebase>>;

  //verification
  verifyCredentials(email: string, password: string): Promise<Result<UserFirebase>>

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
  registerUserCredentials(user: UserFirebase, credentials: UserCredentialsFB): Promise<Result<void>>;
  getCollection(name: string): CollectionReference;
}
export interface UserCredentialsFB {
  email?: string;
  username?: string;
  access?: boolean;
  role?: 'engineer' | 'admin';
}
/*---------------------------------------------------------------------------------------------------------*/