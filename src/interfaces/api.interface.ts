import { SchemaID, LocationProps } from "@/interfaces/db.interface";
import { CredentialsJWT } from "@/interfaces/props.interface";
import { Request, Response } from "express"

/*--------------- request ---------------*/
export interface ExtendsRequest extends Request {
  //auth
  token?: CredentialsJWT;
  user?: { id?: SchemaID };

  //userReferences
  userReferences?: LocationProps;
}

/*--------------- response ---------------*/
export type Error = string
export type ApiResponse<T> = T | Error
export type SendResponseProps = <T>(
  res: Response,
  status: number,
  data: T
) => void

/*--------------- tools ---------------*/
export const send: SendResponseProps = (res, status, data) => {
  const response: ApiResponse<typeof data> = data;
  res.status(status).json(response);
}

export type Result<T> = { value: T } | { error: Error } //type Either