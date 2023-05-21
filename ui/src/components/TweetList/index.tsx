import { TweetCard } from '../TweetCard';
import { gql, useQuery } from '@apollo/client';

interface Tweet {
  tweetId: string,
  author: {
    firstName: string,
    lastName: string,
  },
  body: string,
  createTime: number
}

const getTweetsQuery = gql`
    query GetTweets {
      Tweets {
        tweetId
        author {
          userId
          firstName
          lastName
        }
        body
        createTime
      }
    }
`;

export const TweetList = () => {
  const { loading, error, data } = useQuery<{ 'Tweets': Tweet[] }>(getTweetsQuery);

  return (<>
    <h1 className='text-xl mt-3 mb-1'>Recent Tweets</h1>
    {data && data.Tweets && data.Tweets.map((tweet: Tweet, index: number) => <TweetCard tweet={tweet} index={index} key={tweet.tweetId} />)}
  </>);
};
