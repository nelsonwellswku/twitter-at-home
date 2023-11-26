type PropsType = {
  comment: {
    body: string;
    author: {
      firstName: string;
      lastName: string;
    };
  };
};

export const CommentCard = (props: PropsType) => {
  return (
    <div className="bg-slate-100 mt-2 p-2 rounded-md">
      {props.comment.author.firstName} replied with{' '}
      <span className="italic">{props.comment.body}</span>
    </div>
  );
};
