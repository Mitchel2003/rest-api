import { User, UserCredential, UserProfile } from "firebase/auth";
import { Result } from "@/interfaces/api.interface";

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface UserCredentialsDB {
  email: string;
  username: string;
  role: string;
}

export interface AuthService {
  //authentication
  login(email: string, password: string): Promise<Result<UserCredential>>
  logout(): Promise<Result<void>>
  //create and update
  registerAccount(username: string, email: string, password: string): Promise<Result<UserCredential>>
  updateProfile(user: User, profile: Partial<UserProfile>): Promise<Result<void>>
  //verification
  sendEmailVerification(user: UserCredentialsDB): Promise<Result<void>>
  sendEmailResetPassword(email: string): Promise<Result<void>>
  validateResetPassword(oobCode: string, newPassword: string): Promise<Result<void>>
  validateEmailVerification(): Promise<void>
}

export interface StorageService {
  uploadFile(path: string, file: File): Promise<Result<string>>;
  getFile(path: string): Promise<Result<string>>;
  getFiles(path: string): Promise<Result<string[]>>;
  updateFile(path: string, file: File): Promise<Result<string>>;
  deleteFile(path: string): Promise<Result<void>>;
}
/*---------------------------------------------------------------------------------------------------------*/