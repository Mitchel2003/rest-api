import { Types } from 'mongoose';
import debug from 'debug';

// Configurar el namespace para el logging
const log = debug('app:mongodb');

/**
 * Parsea un query o populate que puede venir como string
 * @param value - El valor a parsear
 * @returns El valor parseado
 */
export const parseQuery = (value: any): any => {
  try {
    // Si es string, intentamos parsearlo como JSON
    if (typeof value === 'string') {
      const parsed = JSON.parse(value);
      log('Parsed string value:', { original: value, parsed });
      return parsed;
    }
    
    // Si es un objeto, verificamos si tiene ObjectId
    if (value && typeof value === 'object') {
      // Si tiene curriculum como string, lo convertimos a ObjectId
      if (value.curriculum && typeof value.curriculum === 'string') {
        value.curriculum = new Types.ObjectId(value.curriculum);
        log('Converted curriculum to ObjectId:', value.curriculum);
      }
    }
    
    return value;
  } catch (error) {
    log('Error parsing value:', error);
    return value;
  }
};