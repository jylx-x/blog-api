import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PostBanner from "../components/PostBanner";
import PostComments from "../components/PostComments";
import PostDetails from "../components/PostDetails";

function Post() {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false)

  const commentRef = useRef();

  const parseURL = () => {
    const url = window.location.href.split("/");
    return url[4];
  };

  const rerender = () => {
    render ? setRender(false) : setRender(true);
  } 

  useEffect(() => {
    const postID = parseURL();

    axios.get("http://localhost:9000/posts/" + postID).then((res) => {
      setPost(res.data);
      setLoading(false);
    });
  }, [render]);

  if (loading) {
    <div>
      <Navbar />
    </div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <PostBanner post={post} loading={loading} />
      <PostDetails post={post} loading={loading} rerender={rerender} commentRef={commentRef}/>
      <PostComments post={post} loading={loading} rerender={rerender} commentRef={commentRef} />
      <Footer />
    </div>
  );
}

export default Post;
