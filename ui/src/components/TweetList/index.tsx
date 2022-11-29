import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request'
import { TweetCard } from '../TweetCard';
import c from '../../constants';

interface Tweet {
  tweetId: string,
  author: string,
  body: string,
}

const getTweetsQuery = gql`{
    Tweets {
      tweetId
      author
      body
      comments {
        author
        body
      }
    }
  }
`;

export const TweetList = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  useEffect(() => {
    request(c.GRAPHQL_ENDPOINT, getTweetsQuery).then(data => setTweets(data.Tweets));
  }, []);

  return (<>
    <h1 className='text-xl mt-3 mb-1'>Recent Tweets</h1>
    {tweets.map((tweet: Tweet, index: number) => <TweetCard tweet={tweet} index={index} key={tweet.tweetId} />)}
  </>);
};
