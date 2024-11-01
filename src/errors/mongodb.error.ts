import ErrorAPI, { Conflict, Validation, ErrorRecord, defaultRecord } from '@/errors'
import { MongooseError } from 'mongoose';

class HandlerErrors {
  /**
   * Crea un error personalizado basado en el código y mensaje de MongoDB
   * @param {FirebaseError} e: error de tipo MongooseError
   * @returns {ErrorAPI} retorna un error de tipo ErrorAPI
   */
  public static get(e: MongooseError): ErrorAPI {
    const message = 'Error interno del servidor (mongoDB)'
    const record = this.errorRecords[e.name] || defaultRecord(message, e.name)
    return new record.errorType(record.exception)
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
    }
  }
}

//Uso de bind() es para mantener el contexto de la clase; un ejemplo sería:
//cuando se llama a un metodo de una clase, el contexto de la clase se pierde, por eso se usa bind()
export default HandlerErrors.get.bind(HandlerErrors)