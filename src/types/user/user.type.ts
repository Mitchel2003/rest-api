import { Document } from 'mongoose';

export const classificationValues = ['biomédico', 'red de frio', 'equipo computo'] as const;
export const roleValues = ['admin', 'company', 'collaborator', 'client'] as const;
export type ClassificationProps = typeof classificationValues[number]
export type RoleProps = typeof roleValues[number]
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
  position: string
  inactive: boolean
  belongsTo?: User
  permissions?: string[] //access
  classification?: ClassificationProps[]
  metadata: Record<string, any> //to files
  inventory?: string
  createdAt?: Date
  updatedAt?: Date
}

/**
 * values obligatories
 * _id (🟢)  * username (🟢)  * inactive (🟢)
 * uid (🟢)  * phone (🟢)     * position (🟢)
 * role (🟢)

 * --------------------------------------------------------------------------------------------------------- *
 * client:                                company:                                                  collaborator:
 *  nit (🟢)                        <---   nit (🟢)                                          <---   nit (🔴)
 *  invima (🔴)                     <---   invima (🟢)                                       <---   invima (🔴)
 *  profesionalLicense (🔴)         <---   profesionalLicense (🟢)                           <---   profesionalLicense (🔴)
 *  
 *  belongsTo (🔴)                  <---   belongsTo (�)                                     <---   belongsTo (🟢)
 *  permissions (🔴)                <---   permissions (🟢)                                  <---   permissions (🟢) (select)
 *  classification (🔴)             <---   classification (🟢)                               <---   classification (🟢) (select)
 *  metadata: {logo: string} (🟢)   <---   metadata {logo: string, signature: string} (🟢)   <---   metadata: {logo: string} (🔴)
 * 
 * Admins have all permissions; dont have none (🔴)
 * --------------------------------------------------------------------------------------------------------- *
 * (�) = optional (nullable)
 * (select) = selected value
 * (🔴) = not applied
 * (🟢) = applied
 * 
 * company - belongsTo (�) =>
 * this field is used to assign a subcompany to a company parent
 * if(belongsTo) then company is a subcompany
 * else company is a company parent (main)
 */