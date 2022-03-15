import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllPosts(props) {
  const {rerender} = props;

  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  const deletePost = (postID) => {
    const url = `http://localhost:9000/posts/${postID}`

    axios.delete(url, {withCredentials: true}).then(() => {
      rerender();
    })
  }

  useEffect(() => {
    const url = `http://localhost:9000/posts`;

    axios.get(url).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div />;

  return (
    <div className="bg-slate-50 h-full">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 bg-gray-600 rounded m-4 shadow-md text-white"
          >
            <h2 className="text-3xl font-bold truncate">{post.title}</h2>
            <p className="line-clamp-4 h-24 mt-4">{post.body}</p>
            <div className="flex flex-col justify-between text-sm">
              <div className="flex gap-2"></div>
            </div>
            <div className="flex justify-end md:justify-center gap-4 underline">
              <Link to={`/cms/${post._id}/comments`}>Comments</Link>
              <Link to={`/cms/${post._id}/edit`}>Edit Post</Link>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
