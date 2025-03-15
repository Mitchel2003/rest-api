import config from '@/utils/config';
export const redisConfig = {
  password: config.redis.password,
  url: config.redis.url,
  ttl: {
    ips: 600, // 10 minutes
    user: 300, // 5 minutes
    provider: 600, // 10 minutes
    curriculum: 1800, // 30 minutes
  },
  keyPatterns: {
    ips: 'gs:ips:*',
    user: 'gs:user:*',
    provider: 'gs:provider:*',
    curriculum: 'gs:curriculum:*',
  }
} as const