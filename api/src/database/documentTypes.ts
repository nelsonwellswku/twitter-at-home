export type TweetDocument = {
  tweetId: string,
  authorId: string,
  body: string,
  createTime: number,
}

export type UserDocument = {
  userId: string,
  firstName: string,
  lastName: string,
}
