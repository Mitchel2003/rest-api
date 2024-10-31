/** Error base personalizado para la aplicación */
export default class ErrorAPI extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message); //super() llama al constructor de Error, estableciendo el mensaje base
    this.name = this.constructor.name; //Asigna el nombre de la clase actual al error para mejor identificación
    Error.captureStackTrace(this, this.constructor); //Captura el stack trace, excluyendo el constructor
  }
}

/** Error específico para operaciones no autorizadas */
export class Unauthorized extends ErrorAPI {
  constructor(message: string = 'No autorizado') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

/** Error específico para recursos no encontrados */
export class NotFound extends ErrorAPI {
  constructor(resource: string) {
    super(`${resource} no encontrado`, 404, 'NOT_FOUND');
  }
}

/** Error específico para validación de datos */
export class Validation extends ErrorAPI {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

/** Error específico para conflictos en operaciones */
export class Conflict extends ErrorAPI {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}