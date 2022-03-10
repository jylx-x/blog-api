import React from "react";
import { Routes, Route } from "react-router-dom";

import Posts from "./pages/Posts.js";
import Home from "./pages/Home.js";
import PostDetail from "./pages/PostDetail.js"

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:postid" element={<PostDetail />} />
    </Routes>
  );
}

export default RouteSwitch;
