import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async e => {
    e.preventDefault();

    try {
      const response = await axios.post("/users/login", { username, password });
      const { token, id } = await response.data;
      console.log(token, id);
      localStorage.setItem("user-token", token);
      localStorage.setItem("id-user", id);

      window.location.pathname = "/";
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <h2 className="text-center py-3">Login User</h2>
            <form onSubmit={submitLogin}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <button type="submit" className="btn btn-primary float-right">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
