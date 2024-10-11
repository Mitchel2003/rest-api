import { CredentialsJWT } from "../interfaces/props.interface";
import jwt from "jsonwebtoken";
import "dotenv/config"

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
/**
 * Esto crea un token de acceso para servicios de autenticación y rutas protegidas
 * @param token - es el dato del parámetro para encriptar en el token, puede ser usado en otro momento para autenticación
 * @returns {string} obtenemos una cadena que corresponde al token hash
 */
export async function generateAccessToken(payload: object): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (error, token) => {
      if (error) return reject(error);
      resolve(token as string);
    });
  })
}
/**
 * Esto verifica las credenciales del usuario { id: Schema.Types.ObjectId } en un token específico
 * @param token - es el token a verificar
 * @returns {CredentialsJWT} obtenemos un objeto con propiedades como "id" o "exp" que corresponden al token del usuario conectado
 */
export async function verifyAccessToken(token: string): Promise<CredentialsJWT> {
  if (!token) return { error: 'Token no encontrado, autenticación denegada' };

  try {
    const access = jwt.verify(token, TOKEN_SECRET) as CredentialsJWT;
    if (!access.id) return { error: 'Token inválido' };
    return access
  } catch (e) { return { error: 'Token expirado' } }
}