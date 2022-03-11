import React from "react";
import PostInfo from "./PostInfo.js";
import PostBody from "./PostBody.js";

function PostDetails(props) {
  const { post, loading, rerender, commentRef } = props;

  if (loading) return <div />;

  return (
    <div className="flex-1 md:flex px-5 pt-5">
      <PostInfo post={post} rerender={rerender} commentRef={commentRef}/>
      <PostBody post={post} />
    </div>
  );
}

export default PostDetails;
