// Temporarily disabled Redis cache decorator
/* 
import { redisService as redis } from '@/services/cache/redis.service';

interface CacheOptions { ttl?: number; keyPrefix?: string; keyGenerator?: (...args: any[]) => string }

export function Cached(options: CacheOptions = {}) {
  return (_target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const key = options.keyGenerator
        ? options.keyGenerator(...args)
        : `${options.keyPrefix || ''}:${propertyKey}:${JSON.stringify(args)}`;

      const cachedValue = await redis.get(key);
      if (cachedValue !== null) return cachedValue;

      const result = await originalMethod.apply(this, args);
      await redis.set(key, result, options.ttl || 3600);
      return result;
    };
    return descriptor;
  };
}
*/

// Temporary no-op decorator
export function Cached(_options: any = {}) {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    return descriptor;
  };
}