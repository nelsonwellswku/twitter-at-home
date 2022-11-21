import RedisModule, { Redis as RedisType, RedisOptions, ChainableCommander } from "ioredis"
const Redis = RedisModule.default;

type ExtendedAppRedisClient = {
  jsonSet: (...args: string[]) => Promise<unknown>,
}
type ExtendedRedisType = RedisType & ExtendedAppRedisClient

let RedisClient;
export const InitializeAppRedisClient = (options?: RedisOptions): void => {
  RedisClient = new Redis(options);
  (RedisClient as ExtendedRedisType).jsonSet = function (...args: string[]): Promise<unknown> {
    return Promise.resolve((RedisClient as ChainableCommander).call('json.set', ...args));
  }
}

export const AppRedisClient: ExtendedRedisType = RedisClient;
