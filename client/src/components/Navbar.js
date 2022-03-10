import React from "react";
import { Link } from "react-router-dom";
import { GoMarkGithub } from "react-icons/go";

function Navbar() {
  return (
    <nav className="p-4 shadow-sm flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center">
          <GoMarkGithub size={30} />
          <div className="mx-2">My Github Blog</div>
        </div>
      </Link>
      <div className="flex gap-3">
        <Link to="/posts">All Posts</Link>
        <a href="https://github.com/jylx-x">My Github</a>
      </div>
    </nav>
  );
}

export default Navbar;
