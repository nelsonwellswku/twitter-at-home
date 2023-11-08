import { ApolloContext } from '@src/apolloContext.js';
import { appRedisClient } from '@src/database/appRedisClient.js';
import { makeTweetKey } from '@src/database/keys.js';
import { currentEpochMs } from '@src/datetime/index.js';
import { MutationCreateTweetArgs as CreateTweetArgs, Tweet } from '@src/generated/graphql.js';
import { randomUUID } from 'crypto';

export const createTweetResolver = async (_, { body }: CreateTweetArgs, context: ApolloContext): Promise<Tweet> => {
  const tweetId = randomUUID();
  const tweetKey = makeTweetKey(tweetId);
  const epoch = currentEpochMs();
  const tweet = {
    tweetId,
    author: context.user.id,
    body,
    createTime: epoch,
    comments: [],
  };
  await appRedisClient.json.set(tweetKey, '$', tweet);

  return {
    tweetId,
    body,
    createTime: epoch
  }
};
