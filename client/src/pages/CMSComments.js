import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import CMSNavbar from "../components/cms/CMSNavbar";
import Footer from "../components/Footer";

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
      <div className="flex flex-col h-screen">
        <CMSNavbar user={user} setUser={setUser} />
        <main className="flex-1 bg-slate-50 flex justify-center items-center">
          <div>No Comments</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <CMSNavbar user={user} setUser={setUser} />
      <main className="bg-slate-50 flex-1 p-5">
        {post.comments.map((comment) => (
          <div key={comment._id} className="bg-gray-600 text-white">
            <div className="px-5 py-6">
              <div className="py-2">{comment.comment_body}</div>
              <div className="flex gap-4 text-sm">
                <div>{`Likes: ${comment.likes}`}</div>
                <div>{`Comment by: ${comment.author}`}</div>
                <div>{`Commented on: ${format(
                  new Date(comment.date),
                  "PPpp"
                )}`}</div>
              </div>
            </div>
            <button
              onClick={() => deletePost(post._id, comment._id)}
              className="bg-white w-full py-1 text-red-600"
            >
              Delete Comment
            </button>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default CMSComments;
