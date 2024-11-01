import ErrorAPI, { Conflict, Validation, Unauthorized, NotFound, defaultRecord, ErrorRecord } from '@/errors'
import { FirebaseError } from 'firebase/app';

class HandlerErrors {
  /**
   * Crea un error personalizado basado en el código y mensaje de Firebase
   * @param {FirebaseError} e: error de tipo FirebaseError
   * @returns {ErrorAPI} retorna un error de tipo ErrorAPI
   */
  public static get(e: FirebaseError): ErrorAPI {
    const message = 'Error interno del servidor (firebase)'
    const record = this.errorRecords[e.code] || defaultRecord(message, e.code)
    return new record.errorType(record.exception);
  }

  /** Mapeo de errores de Firebase a errores personalizados */
  private static readonly errorRecords: Record<string, ErrorRecord> = {
    'auth/email-already-in-use': {
      exception: { message: 'El correo electrónico ya está en uso' },
      errorType: Conflict
    },
    'auth/invalid-email': {
      exception: { message: 'El correo electrónico no es válido' },
      errorType: Validation
    },
    'auth/operation-not-allowed': {
      exception: { message: 'Operación no permitida' },
      errorType: Unauthorized
    },
    'auth/weak-password': {
      exception: { message: 'La contraseña es demasiado débil' },
      errorType: Validation
    },
    'auth/user-disabled': {
      exception: { message: 'La cuenta de usuario ha sido deshabilitada' },
      errorType: Unauthorized
    },
    'auth/user-not-found': {
      exception: { message: 'Usuario no encontrado' },
      errorType: NotFound
    },
    'auth/wrong-password': {
      exception: { message: 'Contraseña incorrecta' },
      errorType: Validation
    },
    'auth/invalid-credential': {
      exception: { message: 'Credenciales inválidas' },
      errorType: Validation
    },
    'auth/invalid-verification-code': {
      exception: { message: 'Código de verificación inválido' },
      errorType: Validation
    },
    'auth/invalid-verification-id': {
      exception: { message: 'ID de verificación inválido' },
      errorType: Validation
    },
    'auth/missing-verification-code': {
      exception: { message: 'Falta el código de verificación' },
      errorType: Validation
    },
    'auth/missing-verification-id': {
      exception: { message: 'Falta el ID de verificación' },
      errorType: Validation
    },
    'auth/phone-number-already-exists': {
      exception: { message: 'El número de teléfono ya existe' },
      errorType: Conflict
    },
    'auth/invalid-phone-number': {
      exception: { message: 'Número de teléfono inválido' },
      errorType: Validation
    },
    'auth/missing-phone-number': {
      exception: { message: 'Falta el número de teléfono' },
      errorType: Validation
    }
  }
}

//Uso de bind() es para mantener el contexto de la clase
export default HandlerErrors.get.bind(HandlerErrors)