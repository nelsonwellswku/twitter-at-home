import { Tweet } from "@src/generated/graphql.js";
import { AppRedisClient } from "@src/database/AppRedisClient.js";
import { allTweetsByEpochIndexKey } from "@src/database/keys.js";

export const getTweets = async (): Promise<Tweet[]> => {
  const tweetKeys = await AppRedisClient().zrevrange(allTweetsByEpochIndexKey, 0, 10);
  const promises = tweetKeys.map(async tweetKey => {
    const json = await AppRedisClient().jsonGet<Tweet>(tweetKey);
    return json;
  });
  const tweets = await Promise.all(promises);
  return tweets;
}
