import RedisModule, { Redis as RedisType, RedisOptions, ChainableCommander } from "ioredis"
const Redis = RedisModule.default;

type ExtendedAppRedisClient = {
  jsonSet: (...args: string[]) => Promise<unknown>,
  jsonGet: <T>(...args: string[]) => Promise<T>
}
type ExtendedRedisType = RedisType & ExtendedAppRedisClient

let RedisClient;
export const InitializeAppRedisClient = (options?: RedisOptions): void => {
  console.log('Initializing client');
  RedisClient = new Redis(options);

  (RedisClient as ExtendedRedisType).jsonSet = function (...args: string[]): Promise<unknown> {
    return Promise.resolve((RedisClient as ChainableCommander).call('json.set', ...args));
  };

  (RedisClient as ExtendedRedisType).jsonGet = async function <T>(...args: string[]): Promise<T> {
    const json = await RedisClient.call('json.get', ...args) as unknown as string;
    return JSON.parse(json) as T;
  }
}

export const AppRedisClient: () => ExtendedRedisType = () => RedisClient;
