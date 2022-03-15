import axios from "axios";
import React, { useEffect, useState } from "react";
import CMSNavbar from "../components/cms/CMSNavbar";

function CMSComments(props) {
  const { user, setUser } = props;
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);

  const rerender = () => {
    render ? setRender(false) : setRender(true);
  };

  const parseURL = () => {
    const url = window.location.href.split("/");
    return url[4];
  };

  const deletePost = (postID, commentID) => {
    const url = `http://localhost:9000/posts/${postID}/comments/${commentID}`;

    axios.delete(url, { withCredentials: true }).then(() => {
      rerender();
    });
  };

  useEffect(() => {
    const postID = parseURL();
    const url = `http://localhost:9000/posts/${postID}`;

    axios.get(url).then((res) => {
      setPost(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !post.comments.length) {
    return (
      <div>
        <CMSNavbar user={user}/>
        <div>No Comments</div>
      </div>
    );
  }

  return (
    <div>
      <CMSNavbar user={user}/>
      {post.comments.map((comment) => (
        <div>
          {/* <div>{console.log(comment)}</div> */}
          <div>{comment.author}</div>
          <div>{comment.comment_body}</div>
          <div>{comment.likes}</div>
          <div>{comment.date}</div>
          <button onClick={() => deletePost(post._id, comment._id)}>
            Delete Comment
          </button>
        </div>
      ))}
    </div>
  );
}

export default CMSComments;
