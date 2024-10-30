/**
 * Define el tiempo de expiración para validar un solicitud de verificación.
 * @returns {Date} - Fecha de expiración = 24 horas.
 */
export const generateVerificationExpiresAt = (): Date => new Date(Date.now() + 24 * 60 * 60 * 1000)