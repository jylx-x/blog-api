import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import LatestPosts from "../components/LatestPosts";
import FeaturedPosts from "../components/FeaturedPosts";
import Footer from "../components/Footer.js";

function Home() {
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
      <main className="flex-1 flex flex-col">
        <FeaturedPosts posts={posts} loading={loading}/>
        <LatestPosts posts={posts} />
      </main>
      <Footer/>
    </div>
  );
}

export default Home;
