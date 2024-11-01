import ErrorAPI, { Conflict, Validation, NotFound, defaultRecord, ErrorRecord } from '@/errors'
import { MongooseError } from 'mongoose';

class HandlerErrors {
  /**
   * Crea un error personalizado basado en el código y mensaje de MongoDB
   * @param {MongooseError} e: error de tipo MongooseError
   * @returns {ErrorAPI} retorna un error de tipo ErrorAPI
   */
  public static get(e: MongooseError): ErrorAPI {
    const message = 'Error interno del servidor (mongoDB)'
    const record = this.errorRecords[e.name] || defaultRecord(message, e.name)
    return new record.errorType({ message: record.message })
  }

  /** Mapeo de errores de MongoDB a errores personalizados */
  private static readonly errorRecords: Record<string, ErrorRecord> = {
    'CastError': {
      message: 'Error de conversión de tipo de datos',
      errorType: Validation
    },
    'ValidationError': {
      message: 'Error de validación de datos',
      errorType: Validation
    },
    'DocumentNotFoundError': {
      message: 'Documento no encontrado',
      errorType: NotFound
    },
    'MongoServerError': {
      message: 'Error del servidor de MongoDB',
      errorType: ErrorAPI
    },
    'DuplicateKeyError': {
      message: 'Clave duplicada, el recurso ya existe',
      errorType: Conflict
    },
    'StrictModeError': {
      message: 'Error de modo estricto',
      errorType: Validation
    }
    // Puedes seguir añadiendo más errores específicos de MongoDB aquí
  }
}
// Uso de bind() es para mantener el contexto de la clase
export default HandlerErrors.get.bind(HandlerErrors)