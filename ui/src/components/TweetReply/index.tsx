import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  tweetReply: string;
};

type Props = {
  tweetId: string;
};

enum ComponentState {
  ShowReplyButton,
  ShowForm,
  FormSubmitted,
}

const createCommentMutation = gql`
  mutation CreateComment($tweetId: String!, $body: String!) {
    CreateComment(tweetId: $tweetId, body: $body) {
      commentId
    }
  }
`;

export const TweetReply = ({ tweetId }: Props) => {
  const client = useApolloClient();
  const [componentState, setComponentState] = useState<ComponentState>(
    ComponentState.ShowReplyButton,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [createComment, { data, loading, error }] = useMutation(
    createCommentMutation,
  );

  const onSubmit: SubmitHandler<Inputs> = async (form) => {
    await createComment({
      variables: {
        tweetId,
        body: form.tweetReply,
      },
    });
    client.refetchQueries({ include: ['GetTweets'] });
    setComponentState(ComponentState.FormSubmitted);
  };

  if (componentState === ComponentState.ShowReplyButton) {
    return (
      <>
        <button
          onClick={() => setComponentState(ComponentState.ShowForm)}
          className="btn btn-primary btn-xs mt-3"
        >
          Reply
        </button>
      </>
    );
  }

  if (componentState === ComponentState.ShowForm) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="reply..."
          {...register('tweetReply', {
            minLength: 3,
            maxLength: 140,
            required: true,
          })}
          className="w-full rounded-md p-1 focus:outline-none mt-3"
        />
        {errors.tweetReply && <div>Invalid Input</div>}
        <input
          type="submit"
          className="btn btn-primary btn-xs mt-3"
          value="Submit"
        ></input>
        <button
          onClick={() => setComponentState(ComponentState.ShowReplyButton)}
          className="btn btn-secondary btn-xs mt-3 ml-1"
        >
          Cancel
        </button>
        {loading ? <p className="mt-1">Submitting...</p> : null}
      </form>
    );
  }

  if (componentState === ComponentState.FormSubmitted) {
    return <TweetReply tweetId={tweetId} />;
  }

  return null;
};
