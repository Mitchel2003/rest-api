import { Result } from "@/interfaces/api.interface";
import { Schema } from "mongoose";

/*--------------------------------------------------MongoDB--------------------------------------------------*/
export type SchemaID = Schema.Types.ObjectId;
export type LocationProps = {
  city?: SchemaID;
  state?: SchemaID;
  country?: SchemaID;
} | {}

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Firebase--------------------------------------------------*/
export interface StorageMetadata {
  contentType: string;
  customMetadata?: Record<string, string>;
}
export interface StorageService {
  uploadFile(path: string, file: File): Promise<Result<string>>;
  getFile(path: string): Promise<Result<string>>;
  getFiles(path: string): Promise<Result<string[]>>;
  updateFile(path: string, file: File): Promise<Result<string>>;
  deleteFile(path: string): Promise<Result<void>>;
}
/*---------------------------------------------------------------------------------------------------------*/