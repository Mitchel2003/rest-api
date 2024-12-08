import { User as UserCredentials } from "user/user.type";
import { Result } from "@/interfaces/api.interface";
import { User, UserInfo } from "firebase/auth";

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface AuthService {
  /*-----------------> authentication <-----------------*/
  login(email: string, password: string): Promise<Result<User>>
  logout(): Promise<Result<void>>
  /*-----------------> create and update <-----------------*/
  registerAccount(credentials: UserCredentials & { password: string }): Promise<Result<User>>
  updateProfile(user: User, profile: Partial<UserInfo>): Promise<Result<void>>
  /*-----------------> verification <-----------------*/
  sendEmailVerification(): Promise<Result<void>>
  sendEmailResetPassword(email: string): Promise<Result<void>>
}

export interface StorageService {
  uploadFile(path: string, file: File): Promise<Result<string>>;
  getFile(path: string): Promise<Result<string>>;
  getFiles(path: string): Promise<Result<string[]>>;
  updateFile(path: string, file: File): Promise<Result<string>>;
  deleteFile(path: string): Promise<Result<void>>;
}
/*---------------------------------------------------------------------------------------------------------*/