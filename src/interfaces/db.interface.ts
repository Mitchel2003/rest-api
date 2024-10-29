import { IdTokenResult, User as UserFirebase } from "firebase/auth";
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
export interface StorageMetadata {
  contentType: string;
  customMetadata?: Record<string, string>;
}
export interface StorageService {
  uploadFile(path: string, file: File): Promise<Result<string>>;
  getFile(path: string): Promise<Result<string>>;
  getFiles(path: string): Promise<Result<string[]>>;
  updateFile(path: string, file: File): Promise<Result<string>>;
  deleteFile(path: string): Promise<Result<void>>;
}

export interface EmailService {
  sendEmailVerification(user: User, url: string): Promise<Result<void>>;
}

export const getUserDefaultFB = (user: User): UserFirebase => {
  return {
    //various
    uid: '',
    tenantId: '',
    photoURL: '',
    providerId: '',
    phoneNumber: '',
    refreshToken: '',
    providerData: [],

    //auth
    isAnonymous: false,
    emailVerified: false,
    displayName: user.username,
    email: user.email,

    //default
    metadata: {
      lastSignInTime: new Date().toISOString(),
      creationTime: new Date().toISOString()
    },
    toJSON: () => ({}),
    reload: () => Promise.resolve(),
    delete: () => Promise.resolve(),
    getIdToken: () => Promise.resolve(''),
    getIdTokenResult: () => Promise.resolve({} as IdTokenResult),
  }
}
/*---------------------------------------------------------------------------------------------------------*/