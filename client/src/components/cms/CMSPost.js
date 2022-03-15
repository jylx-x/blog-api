import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Edit(props) {
  const { post, loading } = props;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [github, setGithub] = useState(post.github_link);
  const [banner, setBanner] = useState(post.banner)
  const [featured, setFeatured] = useState(post.featured);
  const [publish, setPublish] = useState(post.publish);
  const [submit, setSubmit] = useState(false);

  const update = (e) => {
    e.preventDefault();

    const url = `http://localhost:9000/posts/${post._id}`;

    const data = {
      title: title,
      body: body,
      github_link: github,
      banner: banner,
      featured: featured,
      publish: publish,
    };

    axios.put(url, data, { withCredentials: true }).then(() => {
      setSubmit(true);
    });
  };

  if (loading) return <div />;

  if (submit) return <Navigate to="/cms" />;

  return (
    <div>
      <form onSubmit={update}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="githubLink">Github Link: </label>
        <input
          type="text"
          id="githubLink"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <label htmlFor="banner">Banner Image Link: </label>
        <input type="text" id="banner" value={banner} onChange={(e) => setBanner(e.target.value)} />
        <label htmlFor="body">Post Body: </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label htmlFor="featured">Featured</label>
        <input
          type="checkbox"
          id="featured"
          checked={featured}
          onChange={() => setFeatured(!featured)}
        />
        <label htmlFor="publish">Publish</label>
        <input
          type="checkbox"
          id="publish"
          checked={publish}
          onChange={() => setPublish(!publish)}
        />
        <button>Submit Changes</button>
      </form>
    </div>
  );
}

export default Edit;
