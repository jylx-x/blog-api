import React from "react";
import { Routes, Route } from "react-router-dom";

import AllPosts from "./components/AllPosts.js";
import Home from "./pages/Home.js";
import Post from "./pages/Post.js"

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/posts/:postid" element={<Post />} />
    </Routes>
  );
}

export default RouteSwitch;
