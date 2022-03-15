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
      .post(
        url,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.username) {
          localStorage.setItem("user", res.data.username);
          setUser(res.data);
        }
      });
  };

  return (
    <main className="bg-slate-50 flex justify-center items-center flex-1">
      <form
        onSubmit={login}
        className="flex flex-col p-20 bg-gray-600 rounded gap-5 text-white"
      >
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            className="bg-slate-50 rounded px-2 py-0.5 text-black"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className="bg-slate-50 rounded px-2 py-0.5 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="self-center text-black">
          <button className="bg-slate-50 px-6 py-1 rounded">Login</button>
        </div>
      </form>
    </main>
  );
}

export default SignIn;
