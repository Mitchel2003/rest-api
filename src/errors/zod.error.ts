import { Validation } from "@/errors";
import { ZodError } from "zod";

/**
 * Maneja errores de Zod en un formato más amigable y estructurado.
 * @param e - Error de validación de Zod
 * @returns Objeto con los errores formateados
 */
export const HandlerErrors = (e: ZodError) => {
  const message = Array.from(e.errors.map(err => err.message)).join('. ');
  const details = e.errors.reduce((acc, curr) => {
    const path = curr.path.join('.');
    if (!acc[path]) { acc[path] = [] }
    acc[path].push(curr.message);
    return acc;
  }, {} as Record<string, string[]>);

  return new Validation({ message, details });
}

export default HandlerErrors