import { SendResponse, SendError } from "mailtrap";
import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";

/*--------------- Interface to use in jwt.handle.ts ---------------*/
export interface CredentialsJWT extends JwtPayload { id?: Schema.Types.ObjectId, error?: string }

/*--------------- Interface to use in mailtrap.service.ts ---------------*/
type Email = { email: string }
export type MailtrapResult = SendResponse | SendError
export interface EmailProps {
  to: Email[]
  html: string
  subject: string
  category: string
}
