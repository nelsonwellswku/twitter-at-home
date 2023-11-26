import { appRedisClient } from '@src/database/appRedisClient.js';
import { CommentDocument } from '@src/database/documentTypes.js';
import { makeTweetKey } from '@src/database/keys.js';
import { Comment } from '@src/generated/graphql.js';

export const getComments = async (parent): Promise<Comment[]> => {
  const { tweetId } = parent;
  const [comments] = (await appRedisClient.json.get(makeTweetKey(tweetId), {
    path: '$.comments',
  })) as CommentDocument[][];

  const c: Comment[] = comments.map((com) => ({
    body: com.body,
    commentId: com.commentId,
    author: {
      userId: com.authorId,
    },
  }));

  return c;
};
