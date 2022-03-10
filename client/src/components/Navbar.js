import React from "react";
import { GoMarkGithub } from "react-icons/go";

function Navbar() {
  return (
    <nav className="p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <GoMarkGithub size={30} />
        <div className="mx-2">My Github Blog</div>
      </div>
      <div className="flex gap-3">
        <a href="/posts">All Posts</a>
        <a href="https://github.com/jylx-x">Github Repo</a>
      </div>
    </nav>
  );
}

export default Navbar;
