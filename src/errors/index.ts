/** Error base personalizado para la aplicación */
export default class ErrorAPI extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    //Esto empieza a cobrar sentido cuando revisamos el extends Error
    //super() llama al constructor de Error, estableciendo el mensaje base
    //this.name asigna el nombre de la clase actual al interface Error
    //Captura el stack trace, excluyendo el constructor
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/** Error específico para operaciones no autorizadas */
export class Unauthorized extends ErrorAPI {
  constructor(message: string) { super(message, 401, 'UNAUTHORIZED') }
}

/** Error específico para recursos no encontrados */
export class NotFound extends ErrorAPI {
  constructor(resource: string) { super(`${resource} no encontrado`, 404, 'NOT_FOUND') }
}

/** Error específico para validación de datos */
export class Validation extends ErrorAPI {
  constructor(message: string, details?: unknown) { super(message, 400, 'VALIDATION_ERROR', details) }
}

/** Error específico para conflictos en operaciones */
export class Conflict extends ErrorAPI {
  constructor(message: string) { super(message, 409, 'CONFLICT') }
}

export interface ErrorRecord {
  errorType:
  | typeof Unauthorized
  | typeof Validation
  | typeof Conflict
  | typeof NotFound
  | typeof ErrorAPI;
  details?: unknown;
  message: string;
}

export function defaultRecord(message: string, code: string): ErrorRecord {
  return { message, details: { code }, errorType: ErrorAPI }
}