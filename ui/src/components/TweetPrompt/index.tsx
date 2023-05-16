import { ChangeEvent, useState } from 'react';
import { useMutation, gql } from "@apollo/client";

const createTweetMutation = gql`
    mutation CreateTweetMutation($body: String!) {
        CreateTweet(body: $body) {
            tweetId
        }
    }
`;

export const TweetPrompt = () => {
  const [formField, setFormField] = useState('');
  const [createTweet, { data, loading, error }] = useMutation(createTweetMutation)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormField(event.target.value);
  }

  const submitTweet = async () => {
    await createTweet({ variables: { body: formField } });
    setFormField('');
  };

  return (
    <div className='p-4 border-solid border-sky-500  bg-sky-200 border-sky-300" border-2 rounded-md flex justify-center'>
      <input type="text" onChange={handleChange} id="createTweetFormField" placeholder="What's the buzz?" className="w-4/5 rounded-md p-3 focus:outline-none" value={formField}></input>
      <button onClick={submitTweet} className='btn btn-primary ml-3'>Submit</button>
    </div>
  )
}
