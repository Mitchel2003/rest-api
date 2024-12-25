import { JwtPayload } from "jsonwebtoken";

/*--------------------------------------------------Dependencies--------------------------------------------------*/
export interface CredentialsJWT extends JwtPayload { id?: string, error?: string }
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface RegisterAccountProps {
  role: string;
  email: string;
  password: string;
  username: string;
  headquarters: string[];
}
/*---------------------------------------------------------------------------------------------------------*/