import { CredentialsJWT, SchemaID, UserReferencesProps } from "./props.interface";
import { Response } from "express";
import { Request } from "express";
export interface ExtendsRequest extends Request {
    token?: CredentialsJWT;
    user?: {
        id?: SchemaID;
    };
    userReferences?: UserReferencesProps;
}
export type Error = string;
export type ApiResponse<T> = T | Error;
export type ResponseProps = <T>(res: Response, status: number, data: T) => void;
export declare const send: ResponseProps;
export type Result<T> = {
    value: T;
} | {
    error: Error;
};
