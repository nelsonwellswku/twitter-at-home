export type TweetDocument = {
  tweetId: string,
  authorId: string,
  body: string,
  createTime: number,
}

export type CommentDocument = {
  commentId: string,
  body: string,
  authorId: string,
  createTime: number,
}

export type UserDocument = {
  userId: string,
  firstName: string,
  lastName: string,
}
