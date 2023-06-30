import { PropsWithChildren } from "react";
import { TweetReply } from "../TweetReply";

type PropType = {
  index: number,
  tweet: {
    tweetId: string,
    author: {
      firstName: string,
      lastName: string,
    },
    body: string,
    createTime: number,
  }
}

export const TweetCard = (props: PropsWithChildren<PropType>) => {
  const { tweet, index } = props;
  const className = index % 2 === 0 ? 'bg-blue-100 p-3 mt-1 rounded-md' : 'bg-blue-200 p-3 mt-1 rounded-md';
  return (<div className={className}>
    <p><span className="italic">{`${tweet.author.firstName} ${tweet.author.lastName}`}</span> wrote:</p>
    <p>&emsp;{tweet.body}</p>
    {props.children}
    <TweetReply tweetId={tweet.tweetId} />
  </div>);
};
