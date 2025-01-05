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
    return new record.errorType({ message: record.message, details: { name: e.name, message: e.message } })
  }

  /** Mapeo de errores de MongoDB a errores personalizados */
  private static readonly errorRecords: Record<string, ErrorRecord> = {
    // Errores de transacción
    'TransactionError': {
      message: 'Error en la transacción',
      errorType: ErrorAPI
    },

    // Errores de documentos no encontrados
    'DocumentNotFoundError': {
      message: 'Documento no encontrado',
      errorType: NotFound
    },
    'ObjectParameterError': {
      message: 'Error en los parámetros del objeto',
      errorType: Validation
    },

    // Errores de duplicación y conflictos
    'DuplicateKeyError': {
      message: 'Clave duplicada, el recurso ya existe',
      errorType: Conflict
    },
    'BulkWriteError': {
      message: 'Error en operación de escritura múltiple',
      errorType: ErrorAPI
    },

    // Errores de modo estricto y esquema
    'StrictModeError': {
      message: 'Error de modo estricto',
      errorType: Validation
    },
    'SchemaError': {
      message: 'Error en la definición del esquema',
      errorType: Validation
    },

    // Errores del servidor MongoDB
    'MongoServerError': {
      message: 'Error del servidor de MongoDB',
      errorType: ErrorAPI
    },
    'MongoNetworkError': {
      message: 'Error de conexión con MongoDB',
      errorType: ErrorAPI
    },
    'MongoTimeoutError': {
      message: 'Tiempo de espera agotado en la operación',
      errorType: ErrorAPI
    },

    // Errores de validación y tipos
    'CastError': {
      message: 'Error de conversión de tipo de datos',
      errorType: Validation
    },
    'ValidationError': {
      message: 'Error de validación de datos',
      errorType: Validation
    },
    'ValidatorError': {
      message: 'Error en la validación de un campo específico',
      errorType: Validation
    },

    // Errores de consulta
    'MissingSchemaError': {
      message: 'Esquema no encontrado',
      errorType: NotFound
    },
    'DivergentArrayError': {
      message: 'Error en array divergente',
      errorType: Validation
    },
    'DisconnectedError': {
      message: 'Desconexión de la base de datos',
      errorType: ErrorAPI
    },
    'ParallelSaveError': {
      message: 'Error en guardado paralelo',
      errorType: Conflict
    },
    'OverwriteModelError': {
      message: 'Error al sobrescribir modelo',
      errorType: Conflict
    },
    'MongooseServerSelectionError': {
      message: 'Error al seleccionar servidor MongoDB',
      errorType: ErrorAPI
    },
    'MongoParseError': {
      message: 'Error al analizar la URI de MongoDB',
      errorType: ErrorAPI
    },
    'MongoNotConnectedError': {
      message: 'MongoDB no está conectado',
      errorType: ErrorAPI
    },
    'MongooseError': {
      message: 'Error general de Mongoose',
      errorType: ErrorAPI
    },
    'VersionError': {
      message: 'Error de versión del documento',
      errorType: Conflict
    }
  }
}
// Uso de bind() es para mantener el contexto de la clase
export default HandlerErrors.get.bind(HandlerErrors)