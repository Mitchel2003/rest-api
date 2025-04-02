import { Result } from "@/interfaces/api.interface";
import { Auth, User } from "firebase/auth";
import { RoleProps } from "user/user.type";
import admin from "firebase-admin";

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Props--------------------------------------------------*/
export interface AccountProps {
  password: string;
  email: string;
  phone: string;
  username: string;
  nit?: string; //to client and company
  invima?: string; //to company
  profesionalLicense?: string; //to company

  role: RoleProps;
  permissions?: string[];//to engineer and admin
  //if engineer, permissions are limited to their own clients (clientIds)
  //if admin, permissions are limited to their own companies (companyIds)
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface AdminService {
  getAuth(): admin.auth.Auth
  sendNotification(userId: string, title: string, body: string): Promise<Result<void>>
}

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
/*---------------------------------------------------------------------------------------------------------*/