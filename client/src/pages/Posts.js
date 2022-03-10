import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import Navbar from '../components/Navbar'
import AllPosts from '../components/AllPosts'
import Footer from "../components/Footer";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9000/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <AllPosts posts={posts} className="flex-1"/>
      <Footer />
    </div>
  )
}

export default Posts