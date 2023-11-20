import { appRedisClient } from "./appRedisClient.js";
import { TweetDocument } from "./documentTypes.js";
import { indexNames } from "./indexNames.js";

type SearchOptions = {
  sort: {
    by: string,
    direction: string,
  },
  limit: {
    from: number,
    size: number,
  }
}

const defaultOptions: SearchOptions = {
  sort: {
    by: 'createTime',
    direction: 'DESC',
  },
  limit: {
    from: 0,
    size: 10,
  }
}

export class TweetDataSource {
  constructor(private redisClient: typeof appRedisClient) { }

  async searchTweets(searchText: string = "*", options: SearchOptions = defaultOptions): Promise<TweetDocument[]> {

    const searchResults = await this.redisClient.ft.search(indexNames.TWEET_INDEX, searchText, {
      SORTBY: {
        BY: options.sort.by,
        DIRECTION: options.sort.direction === "DESC" ? "DESC" : "ASC",
      },
      LIMIT: {
        from: options.limit.from,
        size: options.limit.size,
      }
    });

    const tweets: TweetDocument[] = searchResults.documents.map(({ value }) => {
      return value as TweetDocument;
    });

    return tweets;
  }
}
