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
        const result = await request(c.GRAPHQL_ENDPOINT, createTweetQuery, { body: formField });
        console.log(result);
    };

    return (
        <div>
            <input placeholder="What's the buzz?" id='createTweetFormField' onChange={handleChange} />
            <button onClick={submitTweet}>Submit</button>
        </div>
    )
}
