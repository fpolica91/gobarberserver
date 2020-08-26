import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '@config/cache'
import ICacheProvider from '../models/ICacheProvider';


export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;
  constructor() {
    this.client = new Redis(cacheConfig.config.redis)
  }
  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }
  public async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    // finds all entries with prefix:allids
    const keys = await this.client.keys(`${prefix}:*`)
    const pipeline = this.client.pipeline()
    // delete each entry
    keys.forEach(key => pipeline.del(key))
    // execute all at the same time
    await pipeline.exec()
  }

  public async recover<T>(key: string): Promise<T | any> {
    const data = await this.client.get(key)
    if (!data) {
      return null;
    }
    const parsedDate = JSON.parse(data) as T;

    return parsedDate
  }

}
