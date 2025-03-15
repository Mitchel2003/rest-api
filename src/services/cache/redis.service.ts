// import { handlerService as handler } from "@/errors/handler"
// import { createClient, RedisClientType } from 'redis';
// import config from '@/utils/config';
// import { Result } from "@/interfaces/api.interface";

// class RedisService {
//   private client: RedisClientType;
//   private static instance: RedisService;
//   private readonly defaultTTL = 300; // 5 minutes

//   private constructor() {
//     this.client = createClient({ password: config.redis.password, url: config.redis.url });
//     this.client.on('error', (err) => console.error('Redis Client Error:', err));
//     this.client.on('connect', () => console.log('Redis Client Connected'));
//     this.client.connect();
//   }

//   public static getInstance(): RedisService {
//     if (!RedisService.instance) RedisService.instance = new RedisService()
//     return RedisService.instance
//   }
//   /*---------------------------------------------------------------------------------------------------------*/

//   /*--------------------------------------------------user methods--------------------------------------------------*/
//   async getUserData(uid: string) {
//     const key = `gs:user:${uid}`;
//     return this.get(key);
//   }
//   async setUserData(uid: string, data: any, ttl = this.defaultTTL) {
//     const key = `gs:user:${uid}`;
//     return this.set(key, data, ttl);
//   }
//   /*---------------------------------------------------------------------------------------------------------*/

//   /*--------------------------------------------------provider methods--------------------------------------------------*/
//   async getProviderIPS(providerId: string) {
//     const key = `gs:provider:${providerId}:ips`;
//     return this.get(key);
//   }
//   async setProviderIPS(providerId: string, data: any, ttl = this.defaultTTL) {
//     const key = `gs:provider:${providerId}:ips`;
//     return this.set(key, data, ttl);
//   }
//   /*---------------------------------------------------------------------------------------------------------*/

//   /*--------------------------------------------------ips methods--------------------------------------------------*/
//   async getIPSEquipment(ipsId: string) {
//     const key = `gs:ips:${ipsId}:equipment`;
//     return this.get(key);
//   }
//   async setIPSEquipment(ipsId: string, data: any, ttl = this.defaultTTL) {
//     const key = `gs:ips:${ipsId}:equipment`;
//     return this.set(key, data, ttl);
//   }
//   /*---------------------------------------------------------------------------------------------------------*/

//   /*--------------------------------------------------curriculum methods--------------------------------------------------*/
//   async getCurriculum(id: string) {
//     const key = `gs:curriculum:${id}`;
//     return this.get(key);
//   }
//   async setCurriculum(id: string, data: any, ttl = this.defaultTTL) {
//     const key = `gs:curriculum:${id}`;
//     return this.set(key, data, ttl);
//   }
//   /*---------------------------------------------------------------------------------------------------------*/

//   /*--------------------------------------------------base methods--------------------------------------------------*/
//   /**
//    * Retrieves a value from the cache by key.
//    * @param {string} key - The key to retrieve the value from.
//    * @returns {Promise<Result<any>>} - Returns the value associated with the key, or null if not found.
//    */
//   public async get(key: string): Promise<Result<any>> {
//     return handler(async () => {
//       const data = await this.client.get(key);
//       return data ? JSON.parse(data) : null;
//     }, 'obtener valor de cache')
//   }

//   /**
//    * Stores a value in the cache with an optional time-to-live (TTL).
//    * @param {string} key - The key to store the value under.
//    * @param {any} value - The value to store in the cache.
//    * @param {number} [ttl=this.defaultTTL] - The time-to-live in seconds.
//    * @returns {Promise<Result<boolean>>} - Returns true if the value was successfully stored, false otherwise.
//    */
//   public async set(key: string, value: any, ttl: number = this.defaultTTL): Promise<Result<boolean>> {
//     return handler(async () => {
//       const stringValue = JSON.stringify(value);
//       await this.client.setEx(key, ttl, stringValue);
//       return true;
//     }, 'establecer valor en cache')
//   }

//   /**
//    * Invalidates a specific key from the cache.
//    * @param {string} key - The key to invalidate.
//    * @returns {Promise<Result<boolean>>} - Returns true if the key was successfully invalidated, false otherwise.
//    */
//   async invalidateKey(key: string): Promise<Result<boolean>> {
//     return handler(async () => {
//       await this.client.del(key);
//       return true;
//     }, 'invalidar key')
//   }

//   /**
//    * Invalidates all keys matching a specific pattern from the cache.
//    * @param {string} pattern - The pattern to match for keys to invalidate.
//    * @returns {Promise<Result<boolean>>} - Returns true if the keys were successfully invalidated, false otherwise.
//    */
//   async invalidatePattern(pattern: string): Promise<Result<boolean>> {
//     return handler(async () => {
//       const keys = await this.client.keys(pattern);
//       if (keys.length > 0) await this.client.del(keys);
//       return true;
//     }, 'invalidar pattern')
//   }
// }

// export const redisService = RedisService.getInstance()