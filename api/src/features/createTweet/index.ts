import { randomUUID } from 'crypto';
import { Tweet } from '@src/generated/graphql.js'
import { AppRedisClient } from '@src/database/AppRedisClient.js'

const createKey = (tweetId: string): string => `tweet:${tweetId}`;

export const createTweetResolver = (_, { body }: { body: string }): Tweet => {
  const tweetId = randomUUID();
  const tweet = {
    tweetId,
    author: 'hard_coded_user@example.com',
    body,
  };
  AppRedisClient().jsonSet(createKey(tweetId), '$', JSON.stringify(tweet));
  return {
    tweetId,
    author: tweet.author,
    body,
  }
};
