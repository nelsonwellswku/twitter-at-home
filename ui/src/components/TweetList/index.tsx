import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request'

interface Tweet {
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
        request('http://localhost:4000/graphql', getTweetsQuery).then(data => setTweets(data.Tweets));
    }, []);

    return (<>
        <h1>Recent Tweets</h1>
        {tweets.map((tweet: Tweet) => <div>
            <h3>{tweet.author}</h3>
            <p>{tweet.body}</p>
        </div>)}
    </>);
};