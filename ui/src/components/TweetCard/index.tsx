type PropType = {
  index: number,
  key: string,
  tweet: {
    tweetId: string,
    author: string,
    body: string,
  }
}

export const TweetCard = (props: PropType) => {
  const { tweet, key, index } = props;
  const className = index % 2 === 0 ? 'bg-blue-100 p-3 mt-1' : 'bg-blue-200 p-3 mt-1';
  return (<div key={key} className={className}>
    <p><span className="italic">{tweet.author}</span> wrote:</p>
    <p>&emsp;{tweet.body}</p>
  </div>);
};
