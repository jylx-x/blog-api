import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

function PostComments(props) {
  const { post, loading, rerender, commentRef } = props;
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentBody, setCommentBody] = useState("");

  const postToAPI = (e) => {
    e.preventDefault();

    const url = `http://localhost:9000/posts/${post._id}/comments`;
    const data = {
      author: commentAuthor,
      comment: commentBody,
    };

    axios
      .post(url, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    rerender();

    setCommentAuthor("");
    setCommentBody("");
  };

  const likeCommentCookie = (commentID) => {
    document.cookie = `post_${post._id}_${commentID}_like=yes`;
  };

  const dislikeCommentCookie = (commentID) => {
    document.cookie = `post_${post._id}_${commentID}_like=no`;
  };

  const parseCookies = (commentID) => {
    const cookies = document.cookie.split(";");

    const thisPostCookie = cookies.find((cookie) =>
      cookie.includes(`${commentID}_like`)
    );
    return thisPostCookie;
  };

  const likeComment = (commentID, bool) => {
    const url = `http://localhost:9000/posts/${post._id}/comments/${commentID}/likes`;

    const cookie = parseCookies(commentID);

    if (bool) {
      if (cookie === undefined || cookie.endsWith("no")) {
        axios.post(url);
        likeCommentCookie(commentID);
        rerender();
      }
    } else {
      if (cookie === undefined || cookie.endsWith("yes")) {
        axios.put(url);
        dislikeCommentCookie(commentID);
        rerender();
      }
    }
  };

  if (loading || !post) return <div />;

  return (
    <div className="p-5">
      <form
        onSubmit={postToAPI}
        className="bg-gray-600 flex flex-col p-4 gap-4 text-white mb-10"
      >
        <h2 className="text-xl">Leave a comment!</h2>
        <div className="flex flex-col">
          <label htmlFor="author">Name:</label>
          <input
            type="text"
            name="author"
            id="author"
            className="rounded text-black px-3 py-2"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="body">Comment:</label>
          <textarea
            name="comment"
            id="author"
            className="rounded resize-none text-black p-3"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-slate-50 text-black px-6 py-0.5 rounded">
            Submit
          </button>
        </div>
      </form>
      <h1 className="text-4xl my-4" ref={commentRef}>
        Comments
      </h1>
      {post.comments.length === 0 ? (
        <div className="h-48 flex justify-center items-center">No Comments</div>
      ) : (
        <div className="flex flex-col gap-6">
          {post.comments.map((comment) => (
            <div key={comment._id}>
              <div className="bg-slate-50 px-5 py-6 flex flex-col gap-5">
                <p>{comment.comment_body}</p>
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => likeComment(comment._id, false)}>
                    <AiOutlineDislike />
                  </button>
                  <div>{comment.likes}</div>
                  <button onClick={() => likeComment(comment._id, true)}>
                    <AiOutlineLike />
                  </button>
                </div>
              </div>
              <div className="flex justify-between bg-gray-600 text-white px-5 py-1 text-sm">
                <div>{`Posted by: ${comment.author}`}</div>
                <div>{format(new Date(comment.date), "PPpp")}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostComments;
