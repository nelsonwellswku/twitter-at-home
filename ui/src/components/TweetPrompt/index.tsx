import { request, gql } from 'graphql-request';
import { ChangeEvent, useState } from 'react';
import c from '../../constants'

const createTweetQuery = gql`
    mutation Mutation($body: String!) {
        CreateTweet(body: $body) {
            tweetId
        }
    }
`;

export const TweetPrompt = () => {
  const [formField, setFormField] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormField(event.target.value);
  }

  const submitTweet = async () => {
    await request(c.GRAPHQL_ENDPOINT, createTweetQuery, { body: formField });
    setFormField('');
  };

  return (
    <div className='p-4 border-solid border-sky-500 border-2 rounded-md w-2/5'>
      <input placeholder="What's the buzz?" id='createTweetFormField' onChange={handleChange} className="p-1 rounded-md w-96" />
      <button onClick={submitTweet} className="p-1 bg-slate-50 ml-1 rounded-md pl-2 pr-2 hover:bg-slate-100">Submit</button>
    </div>
  )
}
