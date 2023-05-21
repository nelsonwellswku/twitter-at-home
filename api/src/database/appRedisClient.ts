import { createClient, RedisClientOptions } from 'redis';

let appRedisClient: ReturnType<typeof createClient>;
const initializeAppRedisClient = async (options?: RedisClientOptions): Promise<void> => {
  appRedisClient = createClient(options);
  await appRedisClient.connect();
}

export {
  initializeAppRedisClient,
  appRedisClient
}
