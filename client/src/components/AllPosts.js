import React from "react";
import { format } from "date-fns";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

function AllPosts(props) {
  const { posts } = props;

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
            <div className="my-3">
              <a
                href={`/posts/${post._id}`}
                className="underline underline-offset-1 text-sm"
              >
                Read More
              </a>
            </div>
            <div className="flex flex-col justify-between text-sm">
              <div className="flex gap-2">
                <div className="flex gap-1 items-center">
                  <span>{post.likes}</span>
                  <div>
                    <AiOutlineLike />
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <span>{post.number_of_comments}</span>
                  <div>
                    <AiOutlineComment />
                  </div>
                </div>
              </div>
              <div>
                Published on: {format(new Date(post.published_on), "PPpp")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
