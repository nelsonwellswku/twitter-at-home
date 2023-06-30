import { ApolloContext } from '@src/apolloContext.js';
import { Comment, MutationCreateCommentArgs as CreateCommentArgs } from '@src/generated/graphql.js';
import { appRedisClient } from '@src/database/appRedisClient.js';
import { makeTweetKey } from '@src/database/keys.js';
import { currentEpochMs } from '@src/datetime/index.js';
import { randomUUID } from 'crypto';

export const createCommentResolver = async (_, { tweetId, body }: CreateCommentArgs, context: ApolloContext): Promise<Comment> => {
  const commentId = randomUUID();
  const tweetKey = makeTweetKey(tweetId);
  const currentTimestamp = currentEpochMs();

  await appRedisClient.json.set(tweetKey, "$.comments", [], { NX: true });

  await appRedisClient.json.arrAppend(tweetKey, "$.comments", {
    commentId,
    body,
    authorId: context.user.id,
    createTime: currentTimestamp,
  });

  return {
    commentId,
    body,
    createTime: currentTimestamp,
  };
};
