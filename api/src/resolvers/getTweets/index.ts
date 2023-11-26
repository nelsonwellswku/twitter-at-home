import { Tweet } from '@src/generated/graphql.js';
import { ApolloContext } from '@src/apolloContext.js';

export const getTweetsResolver = async (
  _: unknown,
  __: unknown,
  context: ApolloContext,
): Promise<Tweet[]> => {
  const tweetDocuments =
    await context.dataSources.tweetDataSource.searchTweets();

  return tweetDocuments.map((tweetDocument) => ({
    tweetId: tweetDocument.tweetId,
    body: tweetDocument.body,
    createTime: tweetDocument.createTime,
  }));
};
