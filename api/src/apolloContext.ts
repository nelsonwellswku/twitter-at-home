import { TweetDataSource } from "./database/TweetDataSource.js"
import { UserDataSource } from "./database/UserDataSource.js"

export type ApolloContext = {
  user?: {
    id: string,
  },
  dataSources: {
    tweetDataSource: TweetDataSource,
    userDataSource: UserDataSource
  }
}
