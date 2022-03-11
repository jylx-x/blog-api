import React from "react";

function PostBanner(props) {
  const { post, loading } = props;

  if(loading) return <div/>

  return (
    <div className="flex justify-center items-center w-full select-none relative h-[36rem] shadow-md bg-[grey]">
      <img className="h-5/6 rounded md:shadow-md object-scale-down" src={post.bannerImg} alt="" />
    </div>
  );
}

export default PostBanner;
