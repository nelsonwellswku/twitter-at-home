type PropType = {
  index: number,
  tweet: {
    tweetId: string,
    author: string,
    body: string,
  }
}

export const TweetCard = (props: PropType) => {
  const { tweet, index } = props;
  const className = index % 2 === 0 ? 'bg-blue-100 p-3 mt-1 rounded-md' : 'bg-blue-200 p-3 mt-1 rounded-md';
  return (<div className={className}>
    <p><span className="italic">{tweet.author}</span> wrote:</p>
    <p>&emsp;{tweet.body}</p>
  </div>);
};
