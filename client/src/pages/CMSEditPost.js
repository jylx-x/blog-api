import axios from "axios";
import React, { useEffect, useState } from "react";
import CMSNavbar from "../components/cms/CMSNavbar";
import CMSPost from "../components/cms/CMSPost.js";
import Footer from "../components/Footer";

function EditPost(props) {
  const { user, setUser } = props;
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  const parseURL = () => {
    const url = window.location.href.split("/");
    return url[4];
  };

  useEffect(() => {
    const postID = parseURL();
    const url = `http://localhost:9000/posts/${postID}`;

    axios.get(url).then((res) => {
      setPost(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <CMSNavbar user={user} setUser={setUser}/>
        <main className="bg-slate-50 flex-1"/>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <CMSNavbar user={user} setUser={setUser} />
      <CMSPost post={post} loading={loading} />
      <Footer />
    </div>
  );
}

export default EditPost;
