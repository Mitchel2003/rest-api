import { Document } from 'mongoose';

export type ClassificationProps = 'biomédico' | 'red de frio' | 'equipo computo'
export type RoleProps = 'admin' | 'company' | 'collaborator' | 'client'
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
  belongsTo?: string
  permissions?: string[] //to access
  type?: 'contractor' | 'independent'
  classification?: ClassificationProps
  metadata: Record<string, any> //to files
  createdAt?: Date
  updatedAt?: Date
}

/**
 * values obligatories
 * _id (🟢)  * username (🟢)  * inactive (🟢)
 * uid (🟢)  * phone (🟢)     * role (🟢)
 * email (🟢)

 * --------------------------------------------------------------------------------------------------------- *
 * client:                                company:                                                  collaborator:                         admin:
 *  nit (🟢)                        <---   nit (🟢)                                          <---   nit (🔴)                       <---   nit (🔴)
 *  invima (🔴)                     <---   invima (🟢)                                       <---   invima (🔴)                    <---   invima (🔴)
 *  profesionalLicense (🔴)         <---   profesionalLicense (🟢)                           <---   profesionalLicense (🔴)        <---   profesionalLicense (🔴)
 *  
 *  type (🔴)                       <---   type (🟢)                                         <---   type (🔴)                      <---   type (🔴)
 *  belongsTo (🔴)                  <---   belongsTo (🔴)                                    <---   belongsTo (🟢)                 <---   belongsTo (🔴)
 *  permissions (🔴)                <---   permissions (🟢)                                  <---   permissions (🟢) (select)      <---   permissions (�)
 *  classification (🔴)             <---   classification (🟢)                               <---   classification (🟢) (select)   <---   classification (🔴)
 *  metadata: {logo: string} (🟢)   <---   metadata {logo: string, signature: string} (🟢)   <---   metadata {logo: string} (🟢)   <---   metadata {logo: string} (🟢)
 * 
 * --------------------------------------------------------------------------------------------------------- *
 * (�) = optional (nullable)
 * (select) = selected value
 * (🔴) = not applied
 * (🟢) = applied
 * 
 * admin => permissions (�)
 * Determine when an admin have permissions
 * if permissions is empty, the admin have all permissions (#)
 * if permissions is not empty, the admin have only the permissions specified
 * 
 * Important remember that when permissions contains permissions [clientIds],
 * indicate that can access to the clients specified, acting as a admin of client (IPS)
 * 
 * ===> this is designed specifically when the client its a IPS <===
 */