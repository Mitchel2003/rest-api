import { Metadata, AccountProps } from "@/interfaces/props.interface";
import { Result } from "@/interfaces/api.interface";
import { Auth, User } from "firebase/auth";

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface AuthService {
  /*-----------------> authentication <-----------------*/
  getAuth(): Auth
  onAuth(): User | null
  login(email: string, password: string): Promise<Result<User>>
  logout(): Promise<Result<void>>
  /*-----------------> create and delete <-----------------*/
  registerAccount(credentials: AccountProps): Promise<Result<User>>
  deleteAccount(uid: string): Promise<Result<void>>
  /*-----------------> actions requests <-----------------*/
  sendEmailVerification(): Promise<Result<void>>
  sendEmailResetPassword(email: string): Promise<Result<void>>
}

export interface StorageService {
  /*-----------------> get <-----------------*/
  getFile(path: string): Promise<Result<string>>
  getFiles(path: string): Promise<Result<string[]>>
  getFilesWithMetadata(path: string): Promise<Result<Metadata[]>>
  /*-----------------> upload <-----------------*/
  uploadFile(file: Express.Multer.File, path: string): Promise<Result<string>>
  uploadFiles(files: Express.Multer.File[], path: string): Promise<Result<string[]>>
  /*-----------------> update <-----------------*/
  updateFile(file: Express.Multer.File, path: string): Promise<Result<string>>
  deleteFile(path: string): Promise<Result<void>>
}
/*---------------------------------------------------------------------------------------------------------*/