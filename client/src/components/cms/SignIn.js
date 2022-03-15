import axios from "axios";
import React, { useState } from "react";

function SignIn(props) {
  const { user, setUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    const url = `http://localhost:9000/auth/login`;
    axios
      .post(url, {
        username: username,
        password: password,
      }, {
        withCredentials: true
      })
      .then((res) => {
        if (res.data.username) {
          localStorage.setItem('user', res.data.username)
          setUser(res.data)
        }
      });
  };

  return (
    <div>
      <form onSubmit={login}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default SignIn;
