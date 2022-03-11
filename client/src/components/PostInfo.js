import axios from "axios";
import React from "react";
import { format } from "date-fns";
import { GoMarkGithub } from "react-icons/go";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

function PostInfo(props) {
  const { post, rerender, commentRef } = props;

  const likeCookie = () => {
    document.cookie = `post_${post._id}_like=yes`;
  };

  const dislikeCookie = () => {
    document.cookie = `post_${post._id}_like=no`
  }

  const parseCookies = () => {
    const cookies = document.cookie.split(";")
    const thisPostCookie = cookies.find((cookie) => cookie.includes(`${post._id}_like`))

    return thisPostCookie;
  }

  const likePost = () => {
    const url = `http://localhost:9000/posts/${post._id}/likes`;

    const cookie = parseCookies()

    if (cookie === undefined || cookie.endsWith("no")) {
      axios.post(url);
      likeCookie();
      rerender();
    } else {
      axios.put(url);
      dislikeCookie();
      rerender();
    }

    console.log(document.cookie)
  };

  const commentScroll =  () => {
    commentRef.current.scrollIntoView();
  }

  return (
    <div className="md:min-w-[16rem] bg-gray-600 text-white p-5 flex flex-col gap-4 items-center">
      <GoMarkGithub size={60} />
      <div className="flex flex-col md:self-start md:items-start items-center">
        <div>{"By: " + post.author}</div>
        <div>{"Published: " + format(new Date(post.published_on), "PPP")}</div>
      </div>
      <div className="md:self-start flex flex-col md:items-start items-center">
        <div>Github Link:</div>
        <a href={post.github_link} className="underline">
          Link
        </a>
      </div>
      <div className="flex md:flex-col md:self-start gap-4 md:gap-0">
        <div className="flex items-center gap-2">
          <button onClick={likePost}>
            <AiOutlineLike />
          </button>
          <div>{"Likes: " + post.likes}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={commentScroll}>
            <AiOutlineComment />
          </button>
          <div>{"Comments: " + post.number_of_comments}</div>
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
