import { User as UserFirebase } from "firebase/auth";
import { Result } from "@/interfaces/api.interface";
import { User } from "@/types/user/user.type";
import { Schema } from "mongoose";

/*--------------------------------------------------MongoDB--------------------------------------------------*/
export type SchemaID = Schema.Types.ObjectId;
export type LocationProps = {
  city?: SchemaID;
  state?: SchemaID;
  country?: SchemaID;
} | {}

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface AuthService {
  //authentication
  register(email: string, password: string): Promise<Result<UserFirebase>>;
  setProfile(username: string): Promise<Result<void>>;

  //verification
  verifyCredentials(email: string, password: string): Promise<Result<UserFirebase>>
  sendEmailVerification(user: User, url: string): Promise<Result<void>>
}

export interface StorageMetadata { contentType: string; customMetadata?: Record<string, string> }
export interface StorageService {
  uploadFile(path: string, file: File): Promise<Result<string>>;
  getFile(path: string): Promise<Result<string>>;
  getFiles(path: string): Promise<Result<string[]>>;
  updateFile(path: string, file: File): Promise<Result<string>>;
  deleteFile(path: string): Promise<Result<void>>;
}
/*---------------------------------------------------------------------------------------------------------*/