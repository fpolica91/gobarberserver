import { Request, Response, NextFunction } from 'express'
import redis from 'redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'



const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: undefined
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimiter',
  points: 5,
  duration: 1
})


export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(request.ip)
    return next()
  } catch (error) {
    throw new Error('too many requests')
  }
}
