import { CommentCard } from '../CommentCard';
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
  comments: {
    body: string;
    createTime: number;
    author: {
      firstName: string;
      lastName: string;
    }
  }[]
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
        comments {
          author {
            userId
            firstName
            lastName
          }
          body
          createTime
        }
      }
    }
`;

export const TweetList = () => {
  const { loading, error, data } = useQuery<{ 'Tweets': Tweet[] }>(getTweetsQuery);

  if (!data || !data.Tweets) { return null; }

  return (<>
    <h1 className='text-xl mt-3 mb-1'>Recent Tweets</h1>

    {data.Tweets.map((tweet: Tweet, index: number) => {
      const hasComments = tweet.comments.length > 0;

      return <TweetCard tweet={tweet} index={index} key={tweet.tweetId}>
        {hasComments ? <hr className='my-2 border-black' /> : null}
        {tweet.comments.map(comment => <CommentCard comment={comment} />)}
      </TweetCard>
    })}
  </>);
};
