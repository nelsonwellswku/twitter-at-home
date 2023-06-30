import { appRedisClient } from "@src/database/appRedisClient.js";
import { UserDocument } from "@src/database/documentTypes.js";
import { makeTweetKey, makeUserKey } from "@src/database/keys.js";
import { User } from "@src/generated/graphql.js"

export const getUser = async (parent): Promise<User> => {
  const tweetId = parent?.tweetId;
  const authorIdFromComment = parent?.author?.userId;

  const authorId = authorIdFromComment ?? await appRedisClient.json.get(makeTweetKey(tweetId), { path: '$.author' }) as string;
  const { userId, firstName, lastName } = await appRedisClient.json.get(makeUserKey(authorId)) as UserDocument

  return {
    userId,
    firstName,
    lastName
  };
}
