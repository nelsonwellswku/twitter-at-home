import { randomUUID } from 'crypto';
import { Tweet } from '@src/generated/graphql.js'
import { appRedisClient } from '@src/database/appRedisClient.js'
import { currentEpochMs } from '@src/datetime/index.js';
import { makeTweetKey } from '@src/database/keys.js';
import { ApolloContext } from '@src/apolloContext.js';

import { MutationCreateTweetArgs as CreateTweetArgs } from '@src/generated/graphql.js'

export const createTweetResolver = async (_, { body }: CreateTweetArgs, context: ApolloContext): Promise<Tweet> => {
  const tweetId = randomUUID();
  const tweetKey = makeTweetKey(tweetId);
  const epoch = currentEpochMs();
  const tweet = {
    tweetId,
    author: context.user.id,
    body,
    createTime: epoch,
  };
  await appRedisClient.json.set(tweetKey, '$', tweet);

  return {
    tweetId,
    body,
    createTime: epoch
  }
};
