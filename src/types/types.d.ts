import 'cookie-parser';
import 'express';
import 'cors';

declare module 'jsonwebtoken';
declare module 'bcryptjs';

// Extendemos la interfaz Request de Express para incluir las propiedades personalizadas
declare namespace Express {
  export interface ExtendsRequest {
    user?: { id: string };
    userReferences?: import('../interfaces/props.interface').UserReferencesProps;
    token?: any;
  }
}