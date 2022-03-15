import React, { useState, useEffect } from "react";
import CMSNavbar from "../components/cms/CMSNavbar";
import SignIn from "../components/cms/SignIn";
import CMSAllPosts from "../components/cms/CMSAllPosts.js";
import Footer from "../components/Footer";

function CMS(props) {
  const { user, setUser } = props;

  useEffect(() => {
    const username = localStorage.getItem("user");

    if (username) {
      setUser(username);
    }
  }, []);

  if (!user) {
    return (
      <div className="h-screen flex flex-col">
        <CMSNavbar user={user} setUser={setUser} />
        <SignIn user={user} setUser={setUser} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <CMSNavbar user={user} setUser={setUser} />
      <CMSAllPosts />
      <Footer />
    </div>
  );
}

export default CMS;
