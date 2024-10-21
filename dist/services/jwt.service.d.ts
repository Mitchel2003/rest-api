import { CredentialsJWT } from "../interfaces/props.interface";
/**
 * Esto crea un token de acceso para servicios de autenticación y rutas protegidas
 * @param token - es el dato del parámetro para encriptar en el token, puede ser usado en otro momento para autenticación
 * @returns {string} obtenemos una cadena que corresponde al token hash
 */
export declare function generateAccessToken(payload: object): Promise<string>;
/**
 * Esto verifica las credenciales del usuario { id: Schema.Types.ObjectId } en un token específico
 * @param token - es el token a verificar
 * @returns {CredentialsJWT} obtenemos un objeto con propiedades como "id" o "exp" que corresponden al token del usuario conectado
 */
export declare function verifyAccessToken(token: string): Promise<CredentialsJWT>;
