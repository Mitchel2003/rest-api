import { Response } from "express";

/*--------------------------------------------------Response--------------------------------------------------*/
export type Error = string
export type SendFunction = <T>(
  res: Response,
  status: number,
  data: T
) => void;

export type ApiResponse<T> = T | Error;

export const send: SendFunction = (res, status, data) => {
  const response: ApiResponse<typeof data> = data;
  res.status(status).json(response);
};
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Result tools--------------------------------------------------*/
export type Result<T> = { value: T } | { error: Error } //type Either
/*---------------------------------------------------------------------------------------------------------*/