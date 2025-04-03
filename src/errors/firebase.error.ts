import ErrorAPI, { Unauthorized, Forbidden, NotFound, defaultRecord, ErrorRecord } from '@/errors'
import { FirebaseError } from 'firebase-admin';

class HandlerErrors {
  /**
   * Crea un error personalizado basado en el código y mensaje de Firebase
   * @param {FirebaseError} e: error de tipo FirebaseError
   * @returns {ErrorAPI} retorna un error de tipo ErrorAPI
   */
  public static get(e: FirebaseError): ErrorAPI {
    const message = 'Error interno del servidor (firebase/admin)'
    const record = this.errorRecords[e.code] || defaultRecord(message, e.message)
    return new record.errorType({ message: record.message, details: { message: e.message, code: e.code } })
  }

  /** Mapeo de errores de Firebase a errores personalizados */
  private static readonly errorRecords: Record<string, ErrorRecord> = {
    // Errores de autenticación
    'auth/id-token-expired': {
      message: 'Token expirado. Por favor, inicie sesión nuevamente.',
      errorType: Unauthorized
    },
    'auth/id-token-revoked': {
      message: 'La sesión ha sido revocada. Por favor, inicie sesión nuevamente.',
      errorType: Unauthorized
    },
    'auth/invalid-id-token': {
      message: 'Token inválido o no autorizado.',
      errorType: Forbidden
    },
    'auth/user-disabled': {
      message: 'La cuenta de usuario ha sido deshabilitada.',
      errorType: Forbidden
    },
    'auth/user-not-found': {
      message: 'Usuario no encontrado en la base de datos.',
      errorType: NotFound
    },
    'auth/missing-token': {
      message: 'Acceso denegado. Se requiere autenticación.',
      errorType: Unauthorized
    }
  }
}

//Uso de bind() es para mantener el contexto de la clase
export default HandlerErrors.get.bind(HandlerErrors)