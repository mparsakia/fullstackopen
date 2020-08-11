import React, { useState } from "react";

const LoginForm = ({ loginFunction }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const tryLogin = (event) => {
    event.preventDefault();

    loginFunction({
      username: username,
      password: password,
    });

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Enter your credentials:</h2>

      <form onSubmit={tryLogin}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
