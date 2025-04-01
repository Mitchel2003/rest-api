import { Document } from 'mongoose';

export type RoleProps = 'client' | 'company' | 'engineer' | 'admin'
export interface User extends Document {
  //to auth-firebase (password is handled by firebase)
  _id: string
  uid: string
  email: string
  fcmToken?: string
  //to user
  phone: string
  username: string
  //dependent role
  nit?: string
  invima?: string
  profesionalLicense?: string
  //access (role)
  role: RoleProps
  inactive: boolean
  permissions?: string[] //to engineer and admin
  //if engineer, permissions are limited to their own clients (clientIds)
  //if admin, permissions are limited to their own companies (companyIds)
  createdAt?: Date
  updatedAt?: Date
}