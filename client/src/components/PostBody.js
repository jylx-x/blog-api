import React from "react";

function PostBody(props) {
  const { post } = props;

  return (
    <div className="bg-slate-50 p-5 w-full">
      <h1 className="text-4xl mb-5">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

export default PostBody;
