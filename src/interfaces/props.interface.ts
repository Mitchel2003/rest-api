import { RoleProps } from "user/user.type";
/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface Metadata {
  name: string
  url: string
}
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