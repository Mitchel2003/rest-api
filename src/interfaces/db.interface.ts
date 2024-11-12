import { UserCredential, User } from "firebase/auth";
import { Result } from "@/interfaces/api.interface";

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface UserCredentialsDB {
  email: string;
  username: string;
  role: string;
}

export interface AuthService {
  getUser(): User | null
  applyReload(): Promise<Result<void>>

  //registration
  registerAccount(username: string, email: string, password: string): Promise<Result<UserCredential>>;
  //verification
  verifyCredentials(email: string, password: string): Promise<Result<UserCredential>>
  //authentication
  sendEmailVerification(user: UserCredentialsDB): Promise<Result<void>>
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
/*---------------------------------------------------------------------------------------------------------*/