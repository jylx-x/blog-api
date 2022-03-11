import React from "react";
import { Link } from "react-router-dom";
import { compareDesc, format } from "date-fns";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

function LatestPosts(props) {
  const { posts } = props;
  posts.sort((a, b) =>
    compareDesc(new Date(a.published_on), new Date(b.published_on))
  );

  const latest = posts.slice(0, 4);

  return (
    <div className="p-12 flex-1 bg-slate-50">
      <h1 className="text-4xl mb-6">Latest Posts</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))]">
        {latest.map((posts) => (
          <div
            className="p-4 bg-gray-600 rounded m-4 shadow-md text-white"
            key={posts._id}
          >
            <h2 className="text-3xl font-bold truncate">{posts.title}</h2>
            <p className="line-clamp-4 h-24 mt-4">{posts.body}</p>
            <div className="my-3">
              <Link
                to={`/posts/${posts._id}`}
                className="underline underline-offset-1 text-sm"
              >
                Read More
              </Link>
            </div>
            <div className="flex flex-col 2xl:flex-row justify-between text-sm">
              <div className="flex gap-2">
                <div className="flex gap-1 items-center">
                  <span>{posts.likes}</span>
                  <div>
                    <AiOutlineLike />
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <span>{posts.number_of_comments}</span>
                  <div>
                    <AiOutlineComment />
                  </div>
                </div>
              </div>
              <div>
                Published on: {format(new Date(posts.published_on), "PPpp")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestPosts;
