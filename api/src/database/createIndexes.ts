import { SchemaFieldTypes } from "redis"
import { appRedisClient } from "./appRedisClient.js"
import { indexNames } from "./indexNames.js";

export const dropIndexes = async (): Promise<void> => {
  Object.values(indexNames).map(async (index) => {
    try {
      await appRedisClient.ft.dropIndex(index);
    } catch (e) {
      /* ignore errors
      the index is either dropped because it exists,
      or not dropped because it doesn't
      either way, it's safe to re-create */
    }
  })
}

export const createIndexes = async (): Promise<void> => {
  await appRedisClient.ft.create(indexNames.TWEET_INDEX, {
    '$.createTime': {
      type: SchemaFieldTypes.NUMERIC,
      SORTABLE: 'UNF',
      AS: 'createTime',
    }
  }, {
    ON: 'JSON',
    PREFIX: 'tweet:'
  });
}
