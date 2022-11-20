import { useEffect, useState } from "react";

interface Tweet {
    author: string,
    body: string,
}

const getTweetsQuery = `
query tweetQuery {
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
        fetch('http://localhost:4000/graphql', { method: 'POST', body: JSON.stringify({ query: getTweetsQuery }), headers: { 'content-type': 'application/json' } })
            .then(res => res.json())
            .then(result => setTweets(result.data.Tweets));
    }, []);

    return (<>
        <h1>Recent Tweets</h1>
        {tweets.map((tweet: Tweet) => <div>
            <h3>{tweet.author}</h3>
            <p>{tweet.body}</p>
        </div>)}
    </>);
};