"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.verifyAccessToken = verifyAccessToken;
const config_1 = __importDefault(require("../utils/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_SECRET = config_1.default.jwtSecret;
/**
 * Esto crea un token de acceso para servicios de autenticación y rutas protegidas
 * @param token - es el dato del parámetro para encriptar en el token, puede ser usado en otro momento para autenticación
 * @returns {string} obtenemos una cadena que corresponde al token hash
 */
async function generateAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (error, token) => {
            if (error)
                return reject(error);
            resolve(token);
        });
    });
}
/**
 * Esto verifica las credenciales del usuario { id: Schema.Types.ObjectId } en un token específico
 * @param token - es el token a verificar
 * @returns {CredentialsJWT} obtenemos un objeto con propiedades como "id" o "exp" que corresponden al token del usuario conectado
 */
async function verifyAccessToken(token) {
    if (!token)
        return { error: 'Token no encontrado, autenticación denegada' };
    try {
        const access = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        if (!access.id)
            return { error: 'Token inválido' };
        return access;
    }
    catch (e) {
        return { error: 'Token expirado' };
    }
}
//# sourceMappingURL=jwt.service.js.map