import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function CMSCreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [github, setGithub] = useState("");
  const [banner, setBanner] = useState("");
  const [featured, setFeatured] = useState(false);
  const [publish, setPublish] = useState(false);
  const [submit, setSubmit] = useState(false);

  const create = (e) => {
    e.preventDefault();

    const url = "http://localhost:9000/posts"

    const data = {
      title: title,
      author: "Me",
      body: body,
      featured: featured,
      publish: publish,
      github_link: github,
      banner: banner,
    };

    console.log(data)

    axios.post(url, data, {withCredentials: true}).then(() => {
      setSubmit(true)
    })
  };

  if (submit) return <Navigate to="/cms" />;

  return (
    <main className="flex-1 bg-slate-50 flex justify-center items-center">
      <form
        onSubmit={create}
        className="flex flex-col bg-gray-600 h-5/6 w-3/4 text-white p-5 gap-4 rounded"
      >
        <div className="flex flex-col">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            className="text-black py-0.5 px-1"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="githubLink">Github Link: </label>
          <input
            type="text"
            id="githubLink"
            value={github}
            className="text-black py-0.5 px-1"
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="banner">Banner Image Link: </label>
          <input
            type="text"
            id="banner"
            value={banner}
            className="text-black  py-0.5 px-1"
            onChange={(e) => setBanner(e.target.value)}
          />
        </div>
        <div className="flex flex-col h-1/2">
          <label htmlFor="body">Post Body: </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="h-full text-black py-0.5 px-1 resize-none"
          ></textarea>
        </div>
        <div className="flex gap-3 justify-end">
          <div>
            <label htmlFor="featured">Featured</label>
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={() => setFeatured(!featured)}
            />
          </div>
          <div>
            <label htmlFor="publish">Publish</label>
            <input
              type="checkbox"
              id="publish"
              checked={publish}
              onChange={() => setPublish(!publish)}
            />
          </div>
        </div>
        <div className="self-end">
          <button className="bg-slate-50 text-black rounded py-1 px-4">
            Submit Changes
          </button>
        </div>
      </form>
    </main>
  );
}

export default CMSCreatePost;
