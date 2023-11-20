import { ApolloContext } from "@src/apolloContext.js";
import { appRedisClient } from "@src/database/appRedisClient.js";
import { makeTweetKey } from "@src/database/keys.js";
import { User } from "@src/generated/graphql.js"

export const getUser = async (parent, _, context: ApolloContext): Promise<User> => {
  const tweetId = parent?.tweetId;
  const authorIdFromComment = parent?.author?.userId;

  let authorDoc: null | string;
  if (!authorIdFromComment) {
    [authorDoc] = await appRedisClient.json.get(makeTweetKey(tweetId), { path: '$.author' }) as string[];
  }

  const authorId: string = authorIdFromComment ?? authorDoc as string;
  const { userId, firstName, lastName } = await context.dataSources.userDataSource.getUser(authorId);

  return {
    userId,
    firstName,
    lastName
  };
}
