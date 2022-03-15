import React, { useState, useEffect } from "react";
import CMSNavbar from "../components/cms/CMSNavbar";
import SignIn from "../components/cms/SignIn";
import CMSAllPosts from "../components/cms/CMSAllPosts.js";

function CMS(props) {
  const { user, setUser } = props;
  const [render, setRender] = useState(false);

  const rerender = () => {
    render ? setRender(false) : setRender(true);
  };

  useEffect(() => {
    const username = localStorage.getItem("user");

    if (username) {
      setUser(username);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <CMSNavbar user={user} setUser={setUser}/>
        <SignIn user={user} setUser={setUser} />
      </div>
    );
  }

  return (
    <div>
      <CMSNavbar user={user} setUser={setUser}/>
      <CMSAllPosts rerender={rerender} />
    </div>
  );
}

export default CMS;
