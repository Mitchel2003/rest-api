import { Metadata, RegisterAccountProps } from "@/interfaces/props.interface";
import { Result } from "@/interfaces/api.interface";
import { User, UserInfo } from "firebase/auth";

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface AuthService {
  /*-----------------> authentication <-----------------*/
  observeAuth(callback: (user: User | null) => void): void
  login(email: string, password: string): Promise<Result<User>>
  logout(): Promise<Result<void>>
  /*-----------------> create and update <-----------------*/
  registerAccount(credentials: RegisterAccountProps): Promise<Result<User>>
  updateProfile(user: User, profile: Partial<UserInfo>): Promise<Result<void>>
  /*-----------------> verification <-----------------*/
  sendEmailVerification(): Promise<Result<void>>
  sendEmailResetPassword(email: string): Promise<Result<void>>
  verifyToken(token: string): Promise<Result<any>>
}

export interface StorageService {
  /*-----------------> get <-----------------*/
  getFile(path: string): Promise<Result<string>>
  getFiles(path: string): Promise<Result<string[]>>
  getFilesWithMetadata(path: string): Promise<Result<Metadata[]>>
  /*-----------------> upload <-----------------*/
  uploadFile(path: string, file: File): Promise<Result<string>>
  uploadFiles(path: string, files: File[]): Promise<Result<string[]>>
  /*-----------------> update <-----------------*/
  updateFile(path: string, file: File): Promise<Result<string>>
  deleteFile(path: string): Promise<Result<void>>
}
/*---------------------------------------------------------------------------------------------------------*/