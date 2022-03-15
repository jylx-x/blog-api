import React from "react";
import { Link } from "react-router-dom";
import { GoMarkGithub } from "react-icons/go";
import axios from "axios";

function Navbar(props) {
  const { user, setUser } = props;

  const logout = () => {
    const url= 'http://localhost:9000/auth/logout'

    localStorage.removeItem("user");

    axios.post(url, {}, {withCredentials: true}).then(() => {setUser(null)})

  };

  return (
    <nav className="p-4 shadow-sm flex justify-between items-center">
      <Link to="/cms">
        <div className="flex items-center">
          <GoMarkGithub size={30} />
          <div className="mx-2">My Github Blog (CMS)</div>
        </div>
      </Link>
      {user ? (
        <div className="flex gap-3">
          <Link to="">New Post</Link>
          <button onClick={() => {logout()}}>Logout</button>
        </div>
      ) : (
        <button>Login</button>
      )}
    </nav>
  );
}

export default Navbar;
