import { randomUUID } from 'crypto';
import { Tweet } from '@src/generated/graphql.js'
import AppRedisClient from '@src/database/AppRedisClient.js'
import { currentEpochMs } from '@src/datetime/index.js';
import { makeTweetKey, allTweetsByEpochIndexKey } from '@src/database/keys.js';
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
  await AppRedisClient.jsonSet(tweetKey, '$', JSON.stringify(tweet));
  await AppRedisClient.zadd(allTweetsByEpochIndexKey, epoch, tweetKey);

  return {
    tweetId,
    author: tweet.author,
    body,
  }
};
