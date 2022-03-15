import React from "react";
import { Routes, Route } from "react-router-dom";

import Posts from "./pages/Posts.js";
import Home from "./pages/Home.js";
import Post from "./pages/Post.js";
import CMS from "./pages/CMSHome.js";
import CMSEditPost from "./pages/CMSEditPost.js";
import CMSComments from "./pages/CMSComments.js";
import CMSNewPost from "./pages/CMSNewPost.js"

function RouteSwitch(props) {
  const { user, setUser } = props;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cms" element={<CMS user={user} setUser={setUser} />} />
      <Route path="/cms/:postid/comments" element={<CMSComments user={user} setUser={setUser}/>} />
      <Route path="/cms/:postid/edit" element={<CMSEditPost user={user} setUser={setUser} />} />
      <Route path="/cms/new-post" element={<CMSNewPost user={user} setUser={setUser} />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:postid" element={<Post />} />
    </Routes>
  );
}

export default RouteSwitch;
