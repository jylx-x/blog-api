import axios from "axios";
import React, { useEffect, useState } from "react";
import CMSNavbar from "../components/cms/CMSNavbar";
import CMSPost from '../components/cms/CMSPost.js'

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
      <div>
        <CMSNavbar user={user}/>
      </div>
    );
  }

  return (
    <div>
      <CMSNavbar />
      <CMSPost post={post} loading={loading} />
    </div>
  );
}

export default EditPost;
