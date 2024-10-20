import { SendResponse, SendError } from "mailtrap";
import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";
export type SchemaID = Schema.Types.ObjectId;
export interface UserReferencesProps {
    city?: SchemaID;
    state?: SchemaID;
    country?: SchemaID;
}
export type MailtrapResult = (SendResponse & {
    success: true;
}) | (SendError & {
    success: false;
});
type Email = {
    email: string;
};
export interface EmailProps {
    to: Email[];
    html: string;
    subject: string;
    category: string;
}
export interface CredentialsJWT extends JwtPayload {
    id?: SchemaID;
    error?: string;
}
export {};
