import { Tweet } from "@src/generated/graphql.js";
import { appRedisClient } from "@src/database/appRedisClient.js";
import { indexNames } from "@src/database/indexNames.js";
import { TweetDocument } from "@src/database/documentTypes.js";

export const getTweets = async (): Promise<Tweet[]> => {
  const searchResults = await appRedisClient.ft.search(indexNames.TWEET_INDEX, '*', {
    SORTBY: {
      BY: 'createTime',
      DIRECTION: 'DESC'
    }
  });

  const tweets: Tweet[] = searchResults.documents.map(({ value }) => {
    const tweetDocument = value as TweetDocument;
    return {
      tweetId: tweetDocument.tweetId,
      body: tweetDocument.body,
      createTime: tweetDocument.createTime,
    }
  });

  return tweets;
}
